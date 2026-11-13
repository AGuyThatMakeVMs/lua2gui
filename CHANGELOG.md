# Changelog

All notable Lua2Gui updates are documented here, newest first.

## [Unreleased]

- Future updates will be recorded here before or alongside implementation.

## [2026-11-13]

### Added
- Added the UI Library Hub with six original Roblox Luau starter components.
- Added live search and category filters for panels, controls, and feedback patterns.
- Added one-click insertion of component source into the main editor.

### Improved
- Added a responsive component-card layout with empty-search feedback and accessible labels.
- Kept the component catalog in its own `assets/js/library.js` module instead of expanding the converter core.
- Updated project documentation to describe the new library module and workflow.

### Preserved
- Kept the existing parser, static preview, object inspector, RBXMX/ZIP export, and Discord community link.
- Kept the site account-free. No login or signup flow was added.

### Notes
- The new entries are starter templates, not complete third-party UI frameworks such as Rayfield or Fluent.
- The preview remains static and does not execute Luau or Roblox runtime behavior.
- Gemini integration is not enabled yet because no API key or protected Cloudflare backend has been configured.

## [2026-11-11]

### Added
- Added a Discord Community section with a direct invite for support and feature suggestions.
- Added project documentation in `README.md` and `docs/ARCHITECTURE.md`.
- Added a GitHub Actions workflow to validate JavaScript syntax and required static assets.

### Improved
- Refreshed the interface into a more organized Studio-style workspace.
- Split the app's styles and browser logic into `assets/css/app.css` and `assets/js/app.js`.
- Improved responsive layout for phones and desktops, preview workspace spacing, and inspector panels.
- Added Ctrl/Cmd + Enter as a shortcut to refresh the preview.
- Improved preview resizing behavior when the browser layout changes.

### Preserved
- Kept the existing Lua/Luau conversion flow and RBXMX/ZIP export.
- Kept the object hierarchy, properties inspector, SEO content, and Discord invite.
- Kept pasted Luau as text. The preview does not execute scripts or Roblox runtime behavior.

### Notes
- The preview remains a static rendering of supported GUI declarations. Dynamic callbacks, services, and runtime behavior are not simulated.
- Cloudflare Pages deployment must complete before the live site reflects the latest GitHub changes.
