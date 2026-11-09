# Code Block Toolkit

A code-block editing toolkit for [Obsidian](https://obsidian.md), inspired by the smooth code-block workflow of Typora. It adds language autocomplete, a copy button, line numbers, folding and smart selection to fenced code blocks — all inside the editor, with no modals.

## Features

- **Language autocomplete** — type after an opening fence (```` ```py ````) and pick from 411 built-in language identifiers, with fuzzy matching and highlighted matches. Add your own identifiers, override their badge abbreviations, batch-import them, or export/import the whole list as JSON.
- **Copy button** — one-click copy of the code content (without the fences).
- **Line numbers** — optional gutter numbers on every content line.
- **Folding** — collapse a block to a single header showing the language and line count; optionally click the language label to expand and jump straight to editing it.
- **Smart select** — press the hotkey repeatedly inside a code block to select the code content, then the whole block, then fall through to the normal select-all. Also available as the command **"Select code in code block"**.
- **Settings in English and Simplified Chinese**, following your Obsidian language.

Everything can be toggled individually in **Settings → Code Block Toolkit**.

## Installation

### From the community plugin directory

Once published: open **Settings → Community plugins → Browse**, search for **Code Block Toolkit**, install and enable it.

### Manually

1. Download `main.js`, `manifest.json` and `styles.css` from the [latest release](https://github.com/silence-lei/code-block-toolkit/releases/latest).
2. Create `<vault>/.obsidian/plugins/code-block-toolkit/` and put the three files there.
3. Reload Obsidian, then enable the plugin in **Settings → Community plugins**.

### With BRAT

Add `silence-lei/code-block-toolkit` as a beta plugin in [BRAT](https://github.com/TfTHacker/obsidian42-brat).

## Usage

| Action | How |
| --- | --- |
| Pick a language | Type at least one character after ```` ``` ```` or `~~~` on an opening fence line, then choose from the suggestion list |
| Copy code | Click the copy icon at the end of the opening fence line |
| Fold / unfold | Click the arrow at the start of the opening fence line |
| Select code | Press `Mod-a` (`Cmd-a` / `Ctrl-a`) repeatedly, or run the command palette action |

Note: autocomplete is only offered on the **opening** fence line, never on a closing fence or inside an indented (nested) fence.

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| Show all languages by default | on | With an empty query, list all built-in languages instead of only 25 common ones |
| Enable smart select in code blocks | on | Cycle code content → whole block → whole document |
| Show copy button | on | Copy icon on the opening fence line |
| Show line numbers | off | Gutter numbers for content lines |
| Enable code block folding | on | Arrow icon and folded header |
| Click language label to edit | off | When folded, clicking the language expands and places the caret after the language |
| Smart select hotkey | `Mod-a` | CodeMirror-style key binding |
| Custom languages | — | Add / batch import / JSON import / export / reset |

## Development

Requires Node.js 18+.

```bash
npm install        # install dev dependencies
npm run dev        # esbuild watch mode, writes main.js
npm run build      # type-check + minified production build
```

Source layout:

```
src/
  main.ts                 plugin entry point, settings persistence, commands
  settings.ts             settings tab, custom language management
  suggest.ts              EditorSuggest implementation
  languages.ts            suggestion list, abbreviations, fuzzy scoring
  language-metadata.ts    411 built-in languages (badge colour + abbreviation)
  common-languages.ts     short list used when "show all" is off
  code-blocks.ts          fenced-code-block parser for CodeMirror 6
  i18n.ts / strings.ts    English / Chinese UI text
  editor/
    decorations.ts        fold state, header widgets, line numbers, spacer
    keymap.ts             smart-select key binding
    cursor-guard.ts       keeps the caret out of folded lines
```

To test locally, copy `main.js`, `manifest.json` and `styles.css` into `<vault>/.obsidian/plugins/code-block-toolkit/` and reload Obsidian.

## Releasing

1. Update `version` in `manifest.json` and `minAppVersion` if needed, then run `npm version patch` (this also updates `versions.json`).
2. Push the tag. The release workflow builds the plugin and attaches `main.js`, `manifest.json` and `styles.css` to the GitHub Release.
3. For the initial community listing, open a pull request against [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases) adding the plugin to `community-plugins.json`.

## 中文说明

这是一个 Obsidian 代码块增强插件：输入围栏后自动补全语言（内置 411 种，支持模糊匹配与自定义语言）、一键复制代码、显示行号、折叠代码块（折叠后显示语言与行数）、以及代码块内智能全选。所有功能均可在设置中单独开关，设置界面会跟随 Obsidian 的中英文语言。手动安装方式见上文的「Manually」小节。

## License

[MIT](LICENSE) © silence_lei
