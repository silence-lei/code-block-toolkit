import { keymap, type EditorView } from '@codemirror/view';
import { EditorSelection, type Extension } from '@codemirror/state';
import type CodeBlockToolkitPlugin from '../main';
import { findCodeBlockAt } from '../code-blocks';

/**
 * Smart select: code content → whole code block → (falls through to Obsidian's
 * default select-all when the whole block is already selected).
 */
export function createSmartSelectExtension(plugin: CodeBlockToolkitPlugin): Extension {
	return keymap.of([{
		key: plugin.settings.smartSelectHotkey || 'Mod-a',
		run: (view: EditorView): boolean => {
			if (!plugin.settings.enableSmartSelect) return false;

			const state = view.state;
			const selection = state.selection.main;
			const block = findCodeBlockAt(state, selection.from);
			if (!block || block.contentFrom >= block.contentTo) return false;

			const contentSelected = selection.from === block.contentFrom && selection.to === block.contentTo;
			const blockSelected = selection.from === block.from && selection.to === block.to;

			if (!contentSelected && !blockSelected) {
				view.dispatch({
					selection: EditorSelection.create([
						EditorSelection.range(block.contentFrom, block.contentTo),
					]),
				});
				return true;
			}
			if (contentSelected && !blockSelected) {
				view.dispatch({
					selection: EditorSelection.create([
						EditorSelection.range(block.from, block.to),
					]),
				});
				return true;
			}
			return false;
		},
	}]);
}
