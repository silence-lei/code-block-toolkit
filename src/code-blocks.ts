import type { EditorState, Line } from '@codemirror/state';
import type { CodeBlockInfo, FenceInfo, FenceTrigger } from './types';

/** Matches an opening/closing fence line: indentation, fence characters, info string. */
const FENCE_LINE = /^(\s*)(`{3,}|~{3,})(.*)$/;

export function parseFenceLine(line: Line): FenceInfo | null {
	const match = line.text.match(FENCE_LINE);
	if (!match) return null;
	return {
		indent: match[1].length,
		fence: match[2],
		info: match[3].trim(),
	};
}

/** Only top-level (unindented) fences are treated as code blocks. */
export function isOpeningFence(line: Line): boolean {
	const info = parseFenceLine(line);
	return info ? info.indent === 0 : false;
}

export function isClosingFence(line: Line, openingFence: string, indent: number): boolean {
	const info = parseFenceLine(line);
	if (!info) return false;
	return info.indent <= indent
		&& info.fence[0] === openingFence[0]
		&& info.fence.length >= openingFence.length;
}

/**
 * Scan the whole document for fenced code blocks, pairing each opening fence
 * with the next matching top-level closing fence of the same character.
 */
export function findAllCodeBlocks(state: EditorState): CodeBlockInfo[] {
	const blocks: CodeBlockInfo[] = [];
	const doc = state.doc;
	const totalLines = doc.lines;
	let lineNo = 1;

	while (lineNo <= totalLines) {
		const startLine = doc.line(lineNo);
		const opening = parseFenceLine(startLine);

		if (opening && opening.indent === 0) {
			const fence = opening.fence;
			const contentFrom = startLine.to + 1;
			let cursor = lineNo + 1;
			let foundEnd = false;
			let depth = 0;

			while (cursor <= totalLines) {
				const line = doc.line(cursor);
				const info = parseFenceLine(line);
				if (info && info.indent === 0) {
					if (info.fence[0] === fence[0] && info.fence.length >= fence.length) {
						if (depth === 0) {
							foundEnd = true;
							break;
						}
						depth--;
					} else {
						depth++;
					}
				}
				cursor++;
			}

			if (foundEnd) {
				const endLine = doc.line(cursor);
				const contentToLimit = endLine.from - 1;
				blocks.push({
					from: startLine.from,
					to: endLine.to,
					startFenceLine: lineNo,
					endFenceLine: cursor,
					contentFrom,
					contentTo: contentFrom <= contentToLimit ? contentToLimit : contentFrom,
					language: opening.info,
					indent: opening.indent,
				});
				lineNo = cursor + 1;
				continue;
			}
		}
		lineNo++;
	}
	return blocks;
}

export function findCodeBlockAt(state: EditorState, pos: number): CodeBlockInfo | null {
	for (const block of findAllCodeBlocks(state)) {
		if (pos >= block.from && pos <= block.to) return block;
	}
	return null;
}

export function findCodeBlockByLine(state: EditorState, lineNumber: number): CodeBlockInfo | null {
	for (const block of findAllCodeBlocks(state)) {
		if (lineNumber >= block.startFenceLine && lineNumber <= block.endFenceLine) return block;
	}
	return null;
}

export function extractCodeContent(state: EditorState, block: CodeBlockInfo): string {
	if (block.contentFrom >= block.contentTo) return '';
	return state.doc.sliceString(block.contentFrom, block.contentTo);
}

export function isInCodeBlockContent(state: EditorState, pos: number): boolean {
	const block = findCodeBlockAt(state, pos);
	return block ? pos >= block.contentFrom && pos <= block.contentTo : false;
}

export function isInCodeBlock(state: EditorState, pos: number): boolean {
	return findCodeBlockAt(state, pos) !== null;
}

export function getLineNumber(state: EditorState, pos: number): number {
	return state.doc.lineAt(pos).number;
}

export function isEndFenceLine(state: EditorState, lineNumber: number): boolean {
	return findAllCodeBlocks(state).some((block) => block.endFenceLine === lineNumber);
}

export function getContentLineCount(state: EditorState, block: CodeBlockInfo): number {
	if (block.contentFrom >= block.contentTo) return 0;
	return state.doc.lineAt(block.contentTo).number
		- state.doc.lineAt(block.contentFrom).number + 1;
}

/**
 * Determine whether the cursor sits on an opening fence line after the fence
 * characters, which is where language autocomplete should be offered.
 */
export function isAtFenceTrigger(state: EditorState, pos: number): FenceTrigger {
	const inactive: FenceTrigger = { isTrigger: false, query: '', from: pos, to: pos };
	const line = state.doc.lineAt(pos);
	const fence = parseFenceLine(line);
	if (!fence || fence.indent > 0) return inactive;
	if (isEndFenceLine(state, line.number)) return inactive;

	const from = line.from + fence.fence.length + fence.indent;
	if (pos < from) return inactive;

	return {
		isTrigger: true,
		query: state.doc.sliceString(from, pos).trim(),
		from,
		to: pos,
	};
}
