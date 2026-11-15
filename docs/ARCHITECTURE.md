# Architecture

Lua 2 Gui is intentionally a static client-side converter.

## Runtime flow

1. The editor accepts pasted source or a local `.lua` / `.luau` file.
2. The parser recognizes supported `Instance.new()` declarations and property assignments.
3. The preview renderer draws supported GUI instances into a browser canvas.
4. The hierarchy and inspector expose parsed objects and their recognized properties.
5. The converter adds a small branded TextLabel watermark to each generated ScreenGui.
6. The serializer creates RBXMX XML, with optional ZIP packaging.

## Safety boundary

Pasted Luau is treated as text. It is never evaluated with `eval`, `Function`, a Roblox runtime, or an external execution service. Runtime callbacks and dynamic behavior cannot be faithfully simulated by the static preview. Review exported source before running it in Roblox Studio.

## Interface navigation

The desktop app shell uses a persistent left navigation rail. On narrow screens, the rail becomes a slide-in drawer controlled by the hamburger button. Navigation uses Flaticon Uicons web fonts and displays an attribution link.

## Export branding

The original Lua/Luau source is preserved as text. The converter adds a "Made with Lua 2 Gui" TextLabel to generated ScreenGui model trees before RBXMX serialization; the source-only download is not modified.

## Asset layout

Keep page structure in `index.html`, visual rules in `assets/css/app.css`, and browser behavior in `assets/js/app.js`. Put documentation in `docs/` and static images/icons in their matching `assets/` folders.
