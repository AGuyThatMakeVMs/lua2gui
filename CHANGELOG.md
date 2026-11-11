# Changelog

All notable Lua2Gui updates are documented here, newest first.

## [Unreleased]

- Future updates will be recorded here before or alongside implementation.

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
