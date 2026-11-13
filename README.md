# Lua 2 Gui

A free browser-based Roblox UI converter. Paste or open supported Lua/Luau UI code, inspect a static preview, and export an editable `.rbxmx` model.

## Project structure

- `index.html` — app markup, SEO metadata, help content, and community links.
- `assets/css/app.css` — responsive Studio-inspired interface and preview styling.
- `assets/js/app.js` — parser, static preview renderer, hierarchy inspector, and RBXMX/ZIP export.
- `assets/js/library.js` — searchable component catalog with ready-to-insert Roblox Luau starter templates.
- `assets/icons/` — app icons.
- `assets/images/` — visual assets.
- `docs/ARCHITECTURE.md` — architecture and safety notes.
- `CHANGELOG.md` — history of updates and fixes.

## Update history

See [CHANGELOG.md](CHANGELOG.md) for new features, improvements, fixes, and maintenance updates.

**Project maintenance rule:** Every future site update must add a dated entry to `CHANGELOG.md` and keep this README's project structure and feature descriptions accurate. Entries should summarize what changed, not claim features that were not implemented.

## UI Library Hub

The built-in component hub provides searchable, categorized starter patterns for panels, controls, and feedback UI. Selecting a template inserts its source into the editor; the existing converter then builds the supported static preview and export. Templates are original examples, not third-party runtime frameworks.

## Run locally

Open `index.html` in a modern browser or serve this folder with any static HTTP server. No build step or package installation is required.

## Important limitations

The preview is a static representation of supported Roblox GUI declarations. It does not execute Luau, Roblox services, callbacks, or game runtime behavior. Original source can be included in an export, so review scripts in Roblox Studio before running them.

## Community

Suggestions and support: https://discord.gg/hVEvfsyXZ5
