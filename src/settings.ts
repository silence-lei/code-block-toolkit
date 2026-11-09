import { App, Modal, Notice, PluginSettingTab, Setting } from 'obsidian';
import type CodeBlockToolkitPlugin from './main';
import { currentLocale, t } from './i18n';
import type { CodeBlockToolkitSettings, CustomLanguage } from './types';

export const DEFAULT_SETTINGS: CodeBlockToolkitSettings = {
	showAllLanguagesByDefault: true,
	enableSmartSelect: true,
	showCopyButton: true,
	showLineNumbers: false,
	enableCodeFolding: true,
	smartSelectHotkey: 'Mod-a',
	clickToEditLanguage: false,
	customLanguages: [],
};

/** Obsidian-style confirmation instead of the blocking window.confirm(). */
class ResetConfirmationModal extends Modal {
	constructor(app: App, private readonly onConfirm: () => Promise<void>) {
		super(app);
	}

	onOpen(): void {
		const { contentEl } = this;
		const zh = currentLocale() === 'zh';
		contentEl.createEl('p', { text: t('customLangResetConfirm') });
		new Setting(contentEl)
			.addButton((button) => button
				.setButtonText(zh ? '取消' : 'Cancel')
				.onClick(() => this.close()))
			.addButton((button) => button
				.setButtonText(zh ? '确定' : t('customLangReset'))
				.setWarning()
				.onClick(async () => {
					this.close();
					await this.onConfirm();
				}));
	}

	onClose(): void {
		this.contentEl.empty();
	}
}

interface ImportedLanguage {
	identifier?: unknown;
	abbreviation?: unknown;
}

export class CodeBlockToolkitSettingTab extends PluginSettingTab {
	constructor(app: App, private readonly plugin: CodeBlockToolkitPlugin) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl).setName('General').setHeading();

		new Setting(containerEl)
			.setName(t('settingShowAllLanguages'))
			.setDesc(t('settingShowAllLanguagesDesc'))
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.showAllLanguagesByDefault)
				.onChange(async (value) => {
					this.plugin.settings.showAllLanguagesByDefault = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(t('settingEnableSmartSelect'))
			.setDesc(t('settingEnableSmartSelectDesc'))
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.enableSmartSelect)
				.onChange(async (value) => {
					this.plugin.settings.enableSmartSelect = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(t('settingShowCopyButton'))
			.setDesc(t('settingShowCopyButtonDesc'))
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.showCopyButton)
				.onChange(async (value) => {
					this.plugin.settings.showCopyButton = value;
					await this.plugin.saveSettings();
					this.plugin.refreshExtensions();
				}));

		new Setting(containerEl)
			.setName(t('settingShowLineNumbers'))
			.setDesc(t('settingShowLineNumbersDesc'))
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.showLineNumbers)
				.onChange(async (value) => {
					this.plugin.settings.showLineNumbers = value;
					await this.plugin.saveSettings();
					this.plugin.refreshExtensions();
				}));

		new Setting(containerEl)
			.setName(t('settingEnableFolding'))
			.setDesc(t('settingEnableFoldingDesc'))
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.enableCodeFolding)
				.onChange(async (value) => {
					this.plugin.settings.enableCodeFolding = value;
					await this.plugin.saveSettings();
					this.plugin.refreshExtensions();
				}));

		new Setting(containerEl)
			.setName(t('settingClickToEditLang'))
			.setDesc(t('settingClickToEditLangDesc'))
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings.clickToEditLanguage)
				.onChange(async (value) => {
					this.plugin.settings.clickToEditLanguage = value;
					await this.plugin.saveSettings();
					this.plugin.refreshExtensions();
				}));

		new Setting(containerEl)
			.setName(t('settingSmartSelectHotkey'))
			.setDesc(t('settingSmartSelectHotkeyDesc'))
			.addText((text) => text
				.setValue(this.plugin.settings.smartSelectHotkey)
				.onChange(async (value) => {
					this.plugin.settings.smartSelectHotkey = value || 'Mod-a';
					await this.plugin.saveSettings();
				}));

		this.renderCustomLanguages(containerEl);
	}

	private renderCustomLanguages(containerEl: HTMLElement): void {
		new Setting(containerEl).setName(t('customLangTitle')).setHeading();
		containerEl.createEl('p', { text: t('customLangDesc') });

		const addSection = containerEl.createDiv();
		let identifier = '';
		let abbreviation = '';

		new Setting(addSection)
			.setName(t('customLangIdentifier'))
			.addText((text) => text
				.setPlaceholder(t('customLangIdentifierPlaceholder'))
				.onChange((value) => { identifier = value.trim().toLowerCase(); }));

		new Setting(addSection)
			.setName(t('customLangAbbr'))
			.addText((text) => text
				.setPlaceholder(t('customLangAbbrPlaceholder'))
				.onChange((value) => { abbreviation = value.trim().toUpperCase().slice(0, 3); }));

		new Setting(addSection)
			.addButton((button) => button
				.setButtonText(t('customLangAdd'))
				.setCta()
				.onClick(async () => {
					if (!identifier) return;
					const exists = this.plugin.settings.customLanguages.some(
						(item) => item.identifier.toLowerCase() === identifier,
					);
					if (exists) return;
					this.plugin.settings.customLanguages.push({
						identifier,
						abbreviation: abbreviation || undefined,
					});
					await this.plugin.saveSettings();
					this.plugin.updateLanguageSuggestions();
					this.display();
				}));

		new Setting(containerEl).setName(t('customLangList')).setHeading();
		const list = containerEl.createDiv();
		const languages = this.plugin.settings.customLanguages;

		if (languages.length === 0) {
			list.createEl('p', { text: t('customLangEmpty'), cls: 'setting-item-description' });
		} else {
			for (const language of languages) {
				const row = list.createDiv({ cls: 'cbt-custom-lang-item' });
				row.createDiv({ cls: 'cbt-custom-lang-badge' }).setText(
					language.abbreviation
						? language.abbreviation.slice(0, 3).toUpperCase()
						: language.identifier.slice(0, 2).toUpperCase(),
				);
				row.createDiv({ cls: 'cbt-custom-lang-name' }).setText(language.identifier);
				const remove = row.createDiv({ cls: 'cbt-custom-lang-delete' });
				remove.setText(t('delete'));
				remove.addEventListener('click', async () => {
					this.plugin.settings.customLanguages = this.plugin.settings.customLanguages
						.filter((item) => item.identifier !== language.identifier);
					await this.plugin.saveSettings();
					this.plugin.updateLanguageSuggestions();
					this.display();
				});
			}
		}

		new Setting(containerEl).setName(t('customLangBatchImport')).setHeading();
		containerEl.createEl('p', {
			text: t('customLangBatchImportDesc'),
			cls: 'setting-item-description',
		});

		let batch = '';
		new Setting(containerEl)
			.addTextArea((text) => text
				.setPlaceholder(t('customLangBatchImportPlaceholder'))
				.onChange((value) => { batch = value; }));

		new Setting(containerEl)
			.addButton((button) => button
				.setButtonText(t('customLangImport'))
				.onClick(async () => {
					const identifiers = batch.split(/[,\n]/)
						.map((value) => value.trim().toLowerCase())
						.filter((value) => value.length > 0);
					for (const value of identifiers) {
						const exists = this.plugin.settings.customLanguages.some(
							(item) => item.identifier.toLowerCase() === value,
						);
						if (!exists) this.plugin.settings.customLanguages.push({ identifier: value });
					}
					await this.plugin.saveSettings();
					this.plugin.updateLanguageSuggestions();
					this.display();
				}));

		const importExportGroup = containerEl.createDiv({ cls: 'cbt-import-export-group' });

		new Setting(importExportGroup)
			.addButton((button) => button
				.setButtonText(t('customLangExportConfig'))
				.onClick(() => {
					const json = JSON.stringify(this.plugin.settings.customLanguages, null, 2);
					const blob = new Blob([json], { type: 'application/json' });
					const url = URL.createObjectURL(blob);
					const anchor = createEl('a');
					anchor.href = url;
					anchor.download = 'code-block-toolkit-languages.json';
					anchor.click();
					URL.revokeObjectURL(url);
				}));

		new Setting(importExportGroup)
			.addButton((button) => button
				.setButtonText(t('customLangImportConfig'))
				.onClick(() => {
					const input = createEl('input');
					input.type = 'file';
					input.accept = '.json,application/json';
					input.onchange = async (event: Event) => {
						const target = event.target as HTMLInputElement;
						const file = target.files?.[0];
						if (!file) return;
						try {
							const parsed: unknown = JSON.parse(await file.text());
							if (Array.isArray(parsed)) {
								for (const raw of parsed as ImportedLanguage[]) {
									if (!raw || typeof raw !== 'object' || !('identifier' in raw)) continue;
									const value = String(raw.identifier ?? '').toLowerCase();
									if (!value) continue;
									const exists = this.plugin.settings.customLanguages.some(
										(item) => item.identifier.toLowerCase() === value,
									);
									if (exists) continue;
									const custom: CustomLanguage = { identifier: value };
									if (typeof raw.abbreviation === 'string') {
										custom.abbreviation = raw.abbreviation;
									}
									this.plugin.settings.customLanguages.push(custom);
								}
								await this.plugin.saveSettings();
								this.plugin.updateLanguageSuggestions();
								this.display();
								new Notice('Import successful');
							}
						} catch {
							new Notice('Import failed: invalid JSON');
						}
					};
					input.click();
				}));

		new Setting(containerEl)
			.setName(t('customLangReset'))
			.setDesc(t('customLangResetDesc'))
			.addButton((button) => button
				.setButtonText(t('customLangReset'))
				.setWarning()
				.onClick(() => {
					new ResetConfirmationModal(this.app, async () => {
						this.plugin.settings.customLanguages = [];
						await this.plugin.saveSettings();
						this.plugin.updateLanguageSuggestions();
						this.display();
					}).open();
				}));
	}
}
