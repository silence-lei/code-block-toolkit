import { MarkdownView, Plugin } from 'obsidian';
import { EditorSelection } from '@codemirror/state';
import { CodeBlockToolkitSettingTab, DEFAULT_SETTINGS } from './settings';
import { LanguageSuggest } from './suggest';
import { createDecorationsExtension } from './editor/decorations';
import { createSmartSelectExtension } from './editor/keymap';
import { createCursorGuardExtension } from './editor/cursor-guard';
import { findCodeBlockAt } from './code-blocks';
import { initLocale, t } from './i18n';
import type { CodeBlockToolkitSettings, EditorWithCm } from './types';

/** Keys written by early versions of the plugin, kept for a smooth upgrade. */
const LEGACY_SETTING_KEYS: Record<string, keyof CodeBlockToolkitSettings> = {
	defaultShowAll: 'showAllLanguagesByDefault',
	smartSelectInCodeBlock: 'enableSmartSelect',
	enableCodeFold: 'enableCodeFolding',
	selectAllShortcut: 'smartSelectHotkey',
};

function migrateLegacySettings(stored: Record<string, unknown> | null): Partial<CodeBlockToolkitSettings> {
	if (!stored) return {};
	const migrated: Record<string, unknown> = { ...stored };
	for (const [legacy, current] of Object.entries(LEGACY_SETTING_KEYS)) {
		if (!(current in migrated) && legacy in migrated) migrated[current] = migrated[legacy];
	}
	for (const legacy of [...Object.keys(LEGACY_SETTING_KEYS), 'customLanguageIcons']) {
		delete migrated[legacy];
	}
	return migrated as unknown as Partial<CodeBlockToolkitSettings>;
}

export default class CodeBlockToolkitPlugin extends Plugin {
	settings!: CodeBlockToolkitSettings;
	languageSuggest!: LanguageSuggest;

	async onload(): Promise<void> {
		await this.loadSettings();
		initLocale();

		this.languageSuggest = new LanguageSuggest(this);
		this.registerEditorSuggest(this.languageSuggest);
		this.registerEditorExtension([
			...createDecorationsExtension(this),
			createSmartSelectExtension(this),
			createCursorGuardExtension(this),
		]);

		this.addCommand({
			id: 'select-code-in-block',
			name: t('cmdSelectCode'),
			editorCallback: (editor) => {
				const view = (editor as EditorWithCm).cm;
				if (!view) return;
				const offset = editor.posToOffset(editor.getCursor());
				const block = findCodeBlockAt(view.state, offset);
				if (!block || block.contentFrom >= block.contentTo) return;
				view.dispatch({
					selection: EditorSelection.create([
						EditorSelection.range(block.contentFrom, block.contentTo),
					]),
				});
			},
		});

		this.addSettingTab(new CodeBlockToolkitSettingTab(this.app, this));
	}

	async loadSettings(): Promise<void> {
		const stored = (await this.loadData()) as Record<string, unknown> | null;
		this.settings = Object.assign({}, DEFAULT_SETTINGS, migrateLegacySettings(stored));
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	updateLanguageSuggestions(): void {
		this.languageSuggest.updateSuggestions();
	}

	/**
	 * Settings changes do not produce a transaction, so nudge every open
	 * Markdown editor to recompute its decorations. Uses workspace leaves
	 * instead of reaching into CodeMirror's internal DOM nodes.
	 */
	refreshExtensions(): void {
		this.app.workspace.iterateAllLeaves((leaf) => {
			if (!(leaf.view instanceof MarkdownView)) return;
			const view = (leaf.view.editor as EditorWithCm).cm;
			view?.dispatch({});
		});
	}
}
