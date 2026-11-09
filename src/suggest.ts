import {
	EditorSuggest,
	type Editor,
	type EditorPosition,
	type EditorSuggestContext,
	type EditorSuggestTriggerInfo,
	type TFile,
} from 'obsidian';
import type CodeBlockToolkitPlugin from './main';
import { COMMON_LANGUAGES } from './common-languages';
import { isAtFenceTrigger } from './code-blocks';
import { t } from './i18n';
import { buildLanguageList, getMatches } from './languages';
import type { EditorWithCm, LanguageSuggestion, SuggestionMatch } from './types';

/** Paint matched characters as DOM text nodes — never via innerHTML. */
function renderHighlighted(container: HTMLElement, text: string, highlights: number[]): void {
	const marked = new Set(highlights);
	let buffer = '';
	let bufferIsHighlighted = false;

	const flush = (): void => {
		if (!buffer) return;
		const span = container.createSpan();
		if (bufferIsHighlighted) span.addClass('cbt-suggest-highlight');
		span.setText(buffer);
		buffer = '';
	};

	for (let index = 0; index < text.length; index++) {
		const isHighlighted = marked.has(index);
		if (isHighlighted !== bufferIsHighlighted) {
			flush();
			bufferIsHighlighted = isHighlighted;
		}
		buffer += text[index];
	}
	flush();
}

export class LanguageSuggest extends EditorSuggest<SuggestionMatch> {
	private allSuggestions: LanguageSuggestion[] = [];

	constructor(private readonly plugin: CodeBlockToolkitPlugin) {
		super(plugin.app);
		this.updateSuggestions();
	}

	updateSuggestions(): void {
		this.allSuggestions = buildLanguageList(this.plugin.settings.customLanguages);
	}

	onTrigger(cursor: EditorPosition, editor: Editor, _file: TFile | null): EditorSuggestTriggerInfo | null {
		const view = (editor as EditorWithCm).cm;
		if (!view) return null;
		const offset = editor.posToOffset(cursor);
		const trigger = isAtFenceTrigger(view.state, offset);
		if (!trigger.isTrigger) return null;
		return {
			start: editor.offsetToPos(trigger.from),
			end: editor.offsetToPos(trigger.to),
			query: trigger.query,
		};
	}

	getSuggestions(context: EditorSuggestContext): SuggestionMatch[] {
		const query = context.query.trim().toLowerCase();
		if (query) return getMatches(query, this.allSuggestions);

		const source = this.plugin.settings.showAllLanguagesByDefault
			? this.allSuggestions
			: this.allSuggestions.filter((item) => COMMON_LANGUAGES.has(item.identifier.toLowerCase()));
		return source.map((item) => ({ item, score: 0, highlights: [] }));
	}

	renderSuggestion(match: SuggestionMatch, el: HTMLElement): void {
		const item = match.item;
		const row = el.createDiv({ cls: 'cbt-suggest-item' });
		row.createDiv({ cls: `cbt-suggest-badge ${item.colorClass}` }).setText(item.abbreviation);
		renderHighlighted(row.createDiv({ cls: 'cbt-suggest-name' }), item.name, match.highlights);
		if (item.isCustom) row.createDiv({ cls: 'cbt-suggest-custom' }).setText(t('custom'));
	}

	selectSuggestion(match: SuggestionMatch, _evt: MouseEvent | KeyboardEvent): void {
		const context = this.context;
		if (!context) return;
		const editor = context.editor;
		editor.replaceRange(match.item.identifier, context.start, context.end);
		const line = editor.getLine(context.start.line);
		editor.setCursor({ line: context.start.line, ch: line.length });
		this.close();
	}
}
