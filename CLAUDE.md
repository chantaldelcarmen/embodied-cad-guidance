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
  expert/index.html       # Phone UI: captures motion, emits motion-data + highlight
  viewer/index.html       # Display UI: receives motion-data + highlight, drives A-Frame camera
```

The server is a thin relay — it receives `motion-data` and `highlight` socket events from one client and broadcasts them to all others. No persistence, no rooms, no auth.

Both clients share the same A-Frame scene layout (box at `0 1 -3`, cylinder at `2 0.75 -3`, sphere at `-2 1.25 -3`) with identical IDs so highlight events match across both views.

## Motion Pipeline (expert → viewer)

**Heading (alpha / Y rotation) — complementary filter:**
- `DeviceOrientationEvent.alpha` (magnetometer) is NOT used directly for heading. The magnetometer requires tilt compensation that becomes numerically unstable at upward tilt angles (~11° beta), causing ping-pong and drift. This is a hardware/OS limitation, not fixable with software filtering alone.
- Instead, heading is computed via a **complementary filter**:
  1. Gyroscope (`DeviceMotionEvent.rotationRate.gamma`) is integrated each frame for fast, stable tracking
  2. A small magnetometer correction (2%/frame, `MAG_CORRECTION = 0.02`) is blended in to cancel long-term gyroscope drift
  3. Magnetometer correction is **frozen entirely** when `beta > 8°` (`MAG_FREEZE_THRESHOLD`) to prevent tilt-instability leaking in
- Both `DeviceOrientationEvent` and `DeviceMotionEvent` permissions must be requested separately on iOS

**Tilt (beta / X rotation):**
- `DeviceOrientationEvent.beta` is used directly — accelerometer/gravity-based, stable at all angles
- Calibrated on first reading (`initialBeta`), clamped to ±80° before transmission

**Camera rig:**
- Rig is at `position="0 1.6 0"`, camera at `position="0 0 0"` inside it
- This is critical: camera must be at the rig's origin so rotation happens in place. If camera is offset from rig origin, tilting causes it to orbit, pushing the view forward in a curve.

**Viewer smoothing:** `smoothingFactor = 0.8` — kept high because expert already smooths; double-smoothing causes lag and requires large phone movements to drive the viewer.

**Highlight:** Expert taps a `.clickable` A-Frame object or presses a fallback button → emits `{ object: id }` → both expert and viewer turn that object yellow, reset others. Objects stay highlighted until another is tapped (no timeout).

## Workflow

- Feature branches → PR → merge to main
- Tag stable versions (current: `v1.0`)
