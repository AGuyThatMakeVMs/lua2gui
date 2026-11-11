# Architecture

Lua 2 Gui is intentionally a static client-side converter.

## Runtime flow

1. The editor accepts pasted source or a local `.lua` / `.luau` file.
2. The parser recognizes supported `Instance.new()` declarations and property assignments.
3. The preview renderer draws supported GUI instances into a browser canvas.
4. The hierarchy and inspector expose parsed objects and their recognized properties.
5. The serializer creates RBXMX XML, with optional ZIP packaging.

## Safety boundary

Pasted Luau is treated as text. It is never evaluated with `eval`, `Function`, a Roblox runtime, or an external execution service. Runtime callbacks and dynamic behavior cannot be faithfully simulated by the static preview. Review exported source before running it in Roblox Studio.

## Asset layout

Keep page structure in `index.html`, visual rules in `assets/css/app.css`, and browser behavior in `assets/js/app.js`. Put documentation in `docs/` and static images/icons in their matching `assets/` folders.
