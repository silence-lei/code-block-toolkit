# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [1.0.1] - 2026-11-09

### Fixed

- Use `window.setTimeout` for popout-window compatibility.
- Remove an unnecessary type assertion in the settings migration.
- Avoid returning a Promise from a void event-listener callback.
- Bumped the release version so the community validator performs a fresh scan.

## [1.0.0] - 2026-11-09

### Added

- Language autocomplete on opening fence lines (411 built-in identifiers, fuzzy match, highlighted results).
- Custom language identifiers with badge abbreviations, batch import and JSON import/export.
- Copy button for code content.
- Optional line numbers.
- Code block folding with language label, line-count summary and optional click-to-edit.
- Smart select hotkey (`Mod-a` by default) and the "Select code in code block" command.
- English / Simplified Chinese settings UI.
- Full TypeScript source, build pipeline and release workflow reconstructed from the released plugin bundle.

### Fixed

- Settings headings now use `new Setting(...).setName(...).setHeading()` for a consistent Obsidian UI.
- All widget DOM nodes now use Obsidian's `createEl` helpers instead of raw DOM constructors.
- Release workflow publishes build-provenance attestations for `main.js`, `manifest.json` and `styles.css`.
- Removed the generic settings heading and an unreachable author link from the manifest.
