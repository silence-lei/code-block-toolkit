import { LANGUAGE_METADATA } from './language-metadata';
import type { CustomLanguage, LanguageSuggestion, SuggestionMatch } from './types';

/** Derive a short badge label from a language identifier. */
export function computeAbbreviation(identifier: string): string {
	const value = identifier.trim().toLowerCase();
	if (!value) return '?';

	if (value.includes('-')) {
		let initials = '';
		for (const part of value.split('-')) {
			const letter = part.match(/[a-z]/);
			if (letter) initials += letter[0];
			if (initials.length >= 3) break;
		}
		if (initials) return initials.toUpperCase().slice(0, 3);
	}

	const letters = value.match(/[a-z]/g);
	return letters && letters.length > 0
		? letters.slice(0, 2).join('').toUpperCase()
		: '?';
}

/**
 * Build the ordered suggestion list from the built-in table, then apply any
 * user-defined languages (overriding the abbreviation of a built-in one, or
 * appending a new custom entry). The result is always sorted alphabetically.
 */
export function buildLanguageList(customLanguages: CustomLanguage[]): LanguageSuggestion[] {
	const list: LanguageSuggestion[] = [];
	const known = new Set<string>();

	for (const [identifier, meta] of Object.entries(LANGUAGE_METADATA)) {
		known.add(identifier.toLowerCase());
		list.push({
			identifier,
			name: identifier,
			abbreviation: meta.abbr ?? computeAbbreviation(identifier),
			colorClass: `cbt-suggest-badge--${meta.color}`,
			isCustom: false,
		});
	}

	for (const custom of customLanguages) {
		const key = custom.identifier.toLowerCase();
		const index = list.findIndex((entry) => entry.identifier.toLowerCase() === key);
		const abbreviation = custom.abbreviation
			? custom.abbreviation.toUpperCase().slice(0, 3)
			: computeAbbreviation(custom.identifier);

		if (index >= 0) {
			list[index] = { ...list[index], abbreviation };
		} else if (!known.has(key)) {
			known.add(key);
			list.push({
				identifier: custom.identifier,
				name: custom.identifier,
				abbreviation,
				colorClass: 'cbt-suggest-badge--slate',
				isCustom: true,
			});
		}
	}

	return list.sort((a, b) => a.identifier.localeCompare(b.identifier));
}

/**
 * Subsequence fuzzy match. Rewards consecutive matches, word boundaries and
 * exact matches, and applies a small penalty for longer identifiers.
 */
export function scoreMatch(query: string, item: LanguageSuggestion): SuggestionMatch | null {
	const identifier = item.identifier.toLowerCase();
	const needle = query.toLowerCase().trim();
	if (!needle) return { item, score: 0, highlights: [] };

	const highlights: number[] = [];
	let identifierIndex = 0;
	let queryIndex = 0;
	let baseScore = 0;
	let consecutiveBonus = 0;
	let boundaryBonus = 0;

	while (queryIndex < needle.length && identifierIndex < identifier.length) {
		if (identifier[identifierIndex] === needle[queryIndex]) {
			highlights.push(identifierIndex);
			baseScore += 10;
			if (highlights.length > 1
				&& highlights[highlights.length - 1] === highlights[highlights.length - 2] + 1) {
				consecutiveBonus += 5;
			}
			if (identifierIndex === 0) {
				boundaryBonus += 15;
			} else if (/[^a-z0-9]/.test(identifier[identifierIndex - 1])) {
				boundaryBonus += 8;
			}
			queryIndex++;
		}
		identifierIndex++;
	}

	if (queryIndex < needle.length) return null;

	const lengthPenalty = identifier.length * 0.3;
	const exactBonus = identifier === needle ? 50 : 0;
	return {
		item,
		score: baseScore + consecutiveBonus + boundaryBonus + exactBonus - lengthPenalty,
		highlights,
	};
}

export function getMatches(query: string, items: LanguageSuggestion[]): SuggestionMatch[] {
	const matches: SuggestionMatch[] = [];
	for (const item of items) {
		const match = scoreMatch(query, item);
		if (match) matches.push(match);
	}
	return matches.sort((a, b) => b.score - a.score);
}
