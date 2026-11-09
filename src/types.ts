import type { Editor } from 'obsidian';
import type { EditorView } from '@codemirror/view';

/** A language identifier added by the user in the settings tab. */
export interface CustomLanguage {
	identifier: string;
	abbreviation?: string;
}

export interface CodeBlockToolkitSettings {
	showAllLanguagesByDefault: boolean;
	enableSmartSelect: boolean;
	showCopyButton: boolean;
	showLineNumbers: boolean;
	enableCodeFolding: boolean;
	smartSelectHotkey: string;
	clickToEditLanguage: boolean;
	customLanguages: CustomLanguage[];
}

/** A fenced code block resolved against a CodeMirror EditorState. */
export interface CodeBlockInfo {
	/** Offset of the opening fence line start. */
	from: number;
	/** Offset of the closing fence line end. */
	to: number;
	startFenceLine: number;
	endFenceLine: number;
	/** Inclusive start of the code content (first line after the opening fence). */
	contentFrom: number;
	/** Exclusive end of the code content (start of the closing fence line, minus the newline). */
	contentTo: number;
	language: string;
	indent: number;
}

export interface FenceInfo {
	indent: number;
	fence: string;
	info: string;
}

export interface FenceTrigger {
	isTrigger: boolean;
	query: string;
	from: number;
	to: number;
}

export interface LanguageSuggestion {
	identifier: string;
	name: string;
	abbreviation: string;
	colorClass: string;
	isCustom: boolean;
}

export interface SuggestionMatch {
	item: LanguageSuggestion;
	score: number;
	highlights: number[];
}

export interface FoldEffect {
	from: number;
	folded: boolean;
}

/**
 * Obsidian attaches the CodeMirror 6 view to `Editor` in live-preview/source
 * mode. It is not part of the public typings, so it is declared here instead of
 * being reached for through `any` or through internal DOM properties.
 */
export interface EditorWithCm extends Editor {
	cm?: EditorView;
}
