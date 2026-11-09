import {
	Decoration,
	EditorView,
	WidgetType,
	type DecorationSet,
} from '@codemirror/view';
import {
	StateEffect,
	StateField,
	type EditorState,
	type Extension,
	type Range,
} from '@codemirror/state';
import type CodeBlockToolkitPlugin from '../main';
import {
	extractCodeContent,
	findAllCodeBlocks,
	findCodeBlockByLine,
	getContentLineCount,
} from '../code-blocks';
import { foldSummary } from '../i18n';
import type { FoldEffect } from '../types';

/** Toggle the folded state of the code block whose opening fence starts at `from`. */
export const foldEffect = StateEffect.define<FoldEffect>();

/** Set of document offsets of folded opening fences, remapped across edits. */
export const foldState = StateField.define<Set<number>>({
	create: () => new Set<number>(),
	update(value, transaction) {
		let next = new Set(value);
		if (transaction.docChanged) {
			const mapped = new Set<number>();
			for (const position of value) mapped.add(transaction.changes.mapPos(position));
			const validStarts = new Set(findAllCodeBlocks(transaction.state).map((block) => block.from));
			next = new Set([...mapped].filter((position) => validStarts.has(position)));
		}
		for (const effect of transaction.effects) {
			if (!effect.is(foldEffect)) continue;
			if (effect.value.folded) next.add(effect.value.from);
			else next.delete(effect.value.from);
		}
		return next;
	},
});

class LineNumberWidget extends WidgetType {
	constructor(private readonly lineNum: number) {
		super();
	}

	toDOM(): HTMLElement {
		const element = createEl('span');
		element.className = 'cbt-line-number';
		element.textContent = String(this.lineNum);
		element.contentEditable = 'false';
		return element;
	}

	eq(other: WidgetType): boolean {
		return other instanceof LineNumberWidget && this.lineNum === other.lineNum;
	}
}

/** Forces a visible gap after an expanded code block. */
class BlockSpacerWidget extends WidgetType {
	toDOM(): HTMLElement {
		const element = createEl('div');
		element.className = 'cbt-block-spacer';
		return element;
	}

	eq(other: WidgetType): boolean {
		return other instanceof BlockSpacerWidget;
	}

	get estimatedHeight(): number {
		return 12;
	}
}

/**
 * Header rendered before the opening fence: fold arrow, language label and
 * line count (when folded), and the copy button.
 */
class HeaderWidget extends WidgetType {
	constructor(
		private readonly lineNumber: number,
		private readonly isFolded: boolean,
		private readonly language: string,
		private readonly clickToEdit: boolean,
		private readonly enableFolding: boolean,
		private readonly showCopyButton: boolean,
	) {
		super();
	}

	toDOM(view: EditorView): HTMLElement {
		const wrap = createEl('span');
		wrap.className = 'cbt-header-wrap'
			+ (this.clickToEdit && this.enableFolding ? ' is-editable' : '');

		if (this.enableFolding) {
			const indicator = createEl('span');
			indicator.className = 'cbt-fold-indicator' + (this.isFolded ? ' is-folded' : '');
			indicator.contentEditable = 'false';
			const arrow = createEl('span');
			arrow.className = 'cbt-fold-arrow';
			indicator.appendChild(arrow);
			wrap.appendChild(indicator);

			indicator.addEventListener('click', (event) => {
				event.stopPropagation();
				event.preventDefault();
				const line = view.state.doc.line(this.lineNumber);
				view.dispatch({
					effects: foldEffect.of({ from: line.from, folded: !this.isFolded }),
				});
			});
		}

		if (this.isFolded && this.enableFolding) {
			const label = createEl('span');
			label.className = 'cbt-lang-label';
			label.textContent = this.language || 'text';
			label.contentEditable = 'false';
			label.title = 'Click to edit language';
			wrap.appendChild(label);

			label.addEventListener('click', (event) => {
				event.stopPropagation();
				event.preventDefault();
				if (!this.clickToEdit) return;

				const line = view.state.doc.line(this.lineNumber);
				view.dispatch({ effects: foldEffect.of({ from: line.from, folded: false }) });

				const currentLine = view.state.doc.line(this.lineNumber);
				const fence = currentLine.text.match(/^(\s*)(`{3,}|~{3,})/);
				if (!fence) return;
				const infoStart = currentLine.from + fence[0].length;
				const cursor = this.language ? infoStart + this.language.length : infoStart;
				view.dispatch({ selection: { anchor: cursor, head: cursor } });
			});

			const block = findCodeBlockByLine(view.state, this.lineNumber);
			if (block) {
				const summary = createEl('span');
				summary.className = 'cbt-fold-summary';
				summary.textContent = foldSummary(getContentLineCount(view.state, block));
				summary.contentEditable = 'false';
				wrap.appendChild(summary);
			}
		}

		if (this.showCopyButton) {
			const button = createEl('span');
			button.className = 'cbt-copy-btn';
			button.setAttribute('aria-label', 'Copy');
			button.contentEditable = 'false';
			const copyIcon = createEl('span');
			copyIcon.className = 'cbt-copy-icon';
			button.appendChild(copyIcon);
			const checkIcon = createEl('span');
			checkIcon.className = 'cbt-check-icon';
			button.appendChild(checkIcon);
			wrap.appendChild(button);

			button.addEventListener('click', (event) => {
				event.stopPropagation();
				event.preventDefault();
				void this.handleCopy(view, button);
			});
		}

		return wrap;
	}

	private async handleCopy(view: EditorView, button: HTMLElement): Promise<void> {
		const block = findCodeBlockByLine(view.state, this.lineNumber);
		if (!block) return;
		const code = extractCodeContent(view.state, block);
		try {
			await navigator.clipboard.writeText(code);
			button.addClass('is-success');
			setTimeout(() => button.removeClass('is-success'), 2000);
		} catch {
			// Clipboard permission denied — leave the button unchanged.
		}
	}

	eq(other: WidgetType): boolean {
		return other instanceof HeaderWidget
			&& this.lineNumber === other.lineNumber
			&& this.isFolded === other.isFolded
			&& this.language === other.language
			&& this.clickToEdit === other.clickToEdit
			&& this.enableFolding === other.enableFolding
			&& this.showCopyButton === other.showCopyButton;
	}
}

function buildDecorations(state: EditorState, plugin: CodeBlockToolkitPlugin): DecorationSet {
	const settings = plugin.settings;
	const foldingEnabled = settings.enableCodeFolding;
	const decorations: Range<Decoration>[] = [];
	const folded = (foldingEnabled ? state.field(foldState, false) : undefined) ?? new Set<number>();

	for (const block of findAllCodeBlocks(state)) {
		const isFolded = folded.has(block.from);
		const openingLine = state.doc.line(block.startFenceLine);

		if (foldingEnabled || settings.showCopyButton) {
			const header = Decoration.widget({
				widget: new HeaderWidget(
					block.startFenceLine,
					isFolded,
					block.language,
					settings.clickToEditLanguage,
					foldingEnabled,
					settings.showCopyButton,
				),
				side: -1,
			});
			decorations.push(header.range(openingLine.from));
		}

		if (!isFolded) {
			const spacer = Decoration.widget({ widget: new BlockSpacerWidget(), side: 1, block: true });
			decorations.push(spacer.range(state.doc.line(block.endFenceLine).to));
		}

		let lineCounter = 1;
		for (let lineNo = block.startFenceLine + 1; lineNo < block.endFenceLine; lineNo++) {
			const line = state.doc.line(lineNo);
			if (isFolded) {
				decorations.push(
					Decoration.line({ attributes: { class: 'cbt-folded-content' } }).range(line.from),
				);
			} else if (settings.showLineNumbers) {
				decorations.push(
					Decoration.widget({ widget: new LineNumberWidget(lineCounter), side: -1 }).range(line.from),
				);
			}
			lineCounter++;
		}

		if (isFolded) {
			decorations.push(
				Decoration.line({ attributes: { class: 'cbt-code-block-folded' } }).range(openingLine.from),
			);
			const closingLine = state.doc.line(block.endFenceLine);
			decorations.push(
				Decoration.line({ attributes: { class: 'cbt-folded-content' } }).range(closingLine.from),
			);
		}
	}

	return Decoration.set(decorations, true);
}

export function createDecorationsExtension(plugin: CodeBlockToolkitPlugin): Extension[] {
	const decorationField = StateField.define<DecorationSet>({
		create: (state) => buildDecorations(state, plugin),
		update: (_value, transaction) => buildDecorations(transaction.state, plugin),
		provide: (field) => EditorView.decorations.from(field),
	});
	return [foldState, decorationField];
}
