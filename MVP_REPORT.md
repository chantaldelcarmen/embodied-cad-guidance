# Embodied CAD Guidance - MVP Status Report

**Date:** March 6, 2026  
**Status:** ✅ Working Prototype

## What We Built

A minimal viable prototype proving real-time motion data transmission from phone to browser.

**Pipeline:** Phone motion → Node.js server → Browser viewer

## Implementation

- **Server:** Node.js with Express and Socket.io
- **Expert Page:** Captures iPhone DeviceOrientation (alpha, beta, gamma)
- **Viewer Page:** Displays motion data in real-time
- **Total Code:** ~100 lines

## What Works

✅ iPhone motion permission handling  
✅ Real-time deviceorientation event capture  
✅ Socket.io data streaming  
✅ Live motion data display on viewer  
✅ HTTPS tunnel for iPhone testing (localtunnel)

## How to Run

1. **Start server:**
   ```bash
   node server/server.js
   ```

2. **Start tunnel:**
   ```bash
   npx localtunnel --port 3000
   ```

3. **Access pages:**
   - Expert (iPhone): `https://[tunnel-url]/expert/`
   - Viewer (laptop): `http://localhost:3000/viewer/`

## Next Steps

- [ ] Add Three.js 3D visualization
- [ ] Map orientation to CAD model rotation
- [ ] Implement gesture recognition
- [ ] Add UI/UX polish

## Tech Stack

- Node.js (v20.11.1)
- Express 5.2.1
- Socket.io 4.8.3
- DeviceOrientation API
- Localtunnel for HTTPS

---

**Conclusion:** Core motion pipeline proven. Ready for 3D visualization integration.
