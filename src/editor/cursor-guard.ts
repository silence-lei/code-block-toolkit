import { EditorView } from '@codemirror/view';
import { EditorSelection, type Extension } from '@codemirror/state';
import type CodeBlockToolkitPlugin from '../main';
import { findAllCodeBlocks } from '../code-blocks';
import { foldState } from './decorations';

/** Keep the caret out of the hidden lines of a folded code block. */
export function createCursorGuardExtension(plugin: CodeBlockToolkitPlugin): Extension {
	return EditorView.updateListener.of((update) => {
		if (!plugin.settings.enableCodeFolding || !update.selectionSet) return;

		const folded = update.state.field(foldState, false) ?? new Set<number>();
		if (folded.size === 0) return;

		const selection = update.state.selection.main;
		let redirectTo: number | null = null;

		for (const block of findAllCodeBlocks(update.state)) {
			if (!folded.has(block.from)) continue;
			const fromInside = selection.from >= block.contentFrom && selection.from <= block.contentTo;
			const toInside = selection.to >= block.contentFrom && selection.to <= block.contentTo;
			if (fromInside || toInside) {
				redirectTo = update.state.doc.line(block.startFenceLine).to;
				break;
			}
		}

		if (redirectTo !== null) {
			update.view.dispatch({ selection: EditorSelection.cursor(redirectTo) });
		}
	});
}
