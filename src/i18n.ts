import { moment } from 'obsidian';
import { STRINGS, type Locale, type StringKey } from './strings';

let locale: Locale = 'en';

/**
 * Resolve the UI language through public APIs only: `moment.locale()` reflects
 * the language selected in Obsidian's settings, with the browser locale as a
 * fallback. No internal globals such as `window.app` or private localStorage
 * keys are used.
 */
function detectLocale(): Locale {
	try {
		const appLocale = moment.locale().toLowerCase();
		if (appLocale.startsWith('zh')) return 'zh';
		if (appLocale.startsWith('en')) return 'en';
	} catch {
		// Fall through to the browser locale if moment is unavailable.
	}
	const browserLocale = (navigator.language ?? '').toLowerCase();
	return browserLocale.startsWith('zh') ? 'zh' : 'en';
}

export function initLocale(): void {
	locale = detectLocale();
}

export function currentLocale(): Locale {
	return locale;
}

export function t(key: StringKey): string {
	const table: Record<string, string> = { ...STRINGS[locale] };
	const fallback: Record<string, string> = { ...STRINGS.en };
	return table[key] ?? fallback[key] ?? key;
}

export function foldSummary(lineCount: number): string {
	const template = locale === 'zh' ? STRINGS.zh.foldSummaryZh : STRINGS.en.foldSummary;
	return template.replace('{n}', String(lineCount));
}
