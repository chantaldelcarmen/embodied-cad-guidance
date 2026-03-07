# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A real-time embodied guidance tool: an expert uses their phone as a motion controller to guide a viewer through a 3D A-Frame scene. The expert's device orientation is streamed via Socket.io to the viewer, who sees the same camera perspective in their browser. The expert can also tap 3D objects to highlight them on the viewer's screen.

## Running the App

```bash
npm start        # starts server on http://localhost:3000
```

- Expert (phone): `http://localhost:3000/expert/`
- Viewer (laptop/display): `http://localhost:3000/viewer/`

HTTPS is required for iPhone motion permission — use the deployed URL on mobile (see DEPLOY.md for Render.com setup).

## Architecture

```
server/server.js          # Express + Socket.io server, no build step
client/
  expert/index.html       # Phone UI: captures DeviceOrientation, emits motion-data + highlight
  viewer/index.html       # Display UI: receives motion-data + highlight, drives A-Frame camera
```

The server is a thin relay — it receives `motion-data` and `highlight` socket events from one client and broadcasts them to all others. No persistence, no rooms, no auth.

Both clients share the same A-Frame scene layout (box at `0 1 -3`, cylinder at `2 0.75 -3`, sphere at `-2 1.25 -3`) with identical IDs so highlight events match across both views.

## Key Implementation Details

**Motion pipeline (expert → viewer):**
1. Expert calibrates on first `deviceorientation` event (stores `initialAlpha`/`initialBeta` as neutral)
2. Values are offset by calibration, normalized to ±180°, alpha frozen if `|beta| > 40°` (gimbal lock threshold), beta clamped to ±80° before transmission
3. Viewer applies the same exponential smoothing (`smoothingFactor = 0.3`) and maps `alpha → y` rotation, `beta → x` rotation on the camera rig

**Highlight:**  Expert taps a `.clickable` A-Frame object or presses a fallback button → emits `{ object: id }` → viewer turns that object yellow, resets others.
