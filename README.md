# Embodied CAD Guidance

A web-based system for remote spatial guidance of 3D models using embodied interaction.  
An expert uses a smartphone as a motion controller to guide a novice through a shared 3D scene in real time.

Instead of explaining spatial orientation verbally, the expert physically moves their phone and the viewer's camera follows the motion instantly. The system supports object highlighting, guided exploration, orbit control, and exploded view scrubbing.

This project was developed for CPSC 581 – HCI II (Winter 2026).

---

# Demo

Demo Video  
https://drive.google.com/file/d/1RVaCT-Z8UxQPuCb1jXjqwRL-EPy8hJGq/view?usp=drivesdk

Live Deployment

Viewer (Novice Interface)  
https://embodied-cad-guidance.onrender.com/viewer/

Expert (Mobile Controller)  
https://embodied-cad-guidance.onrender.com/expert/

---

# System Overview

The system connects two devices.

## Expert Device
Smartphone (iPhone or Android)

Uses phone motion sensors (IMU) to control the orientation of the shared 3D scene.

Provides controls for highlighting components, orbiting the model, zooming, and scrubbing the exploded view.

## Viewer Device
Tablet or laptop browser

Displays the shared 3D scene and follows the expert’s motion in real time.

Communication between devices is handled using Socket.io.

---

# Core Features

## Motion-Based Orientation
The expert physically rotates their phone and the viewer’s camera follows the same orientation in real time.

## Part Highlighting
The expert can highlight individual engine components.

Available components include:

- Pistons  
- Lids  
- Rings  
- Plates  
- Bolts  
- Housing  
- All parts

The highlight appears on both the expert and viewer screens.

## Follow / Explore Modes
The viewer interface supports two modes:

Follow Mode  
The viewer camera automatically follows the expert orientation.

Explore Mode  
The viewer can freely inspect the model.

A ghost arrow indicates the expert’s viewing direction while the viewer explores.

## Orbit Controls
When the expert locks the view, a directional D-pad appears on the expert interface.

- ▲ orbit up
- ▼ orbit down
- ◄ orbit left
- ► orbit right

The viewer camera follows these orbit movements in real time.

## Exploded View Scrubbing
The expert can control the exploded engine animation using phone tilt.

Tilt phone forward to explode the engine.  
Tilt phone backward to reassemble it.

This allows the expert to reveal internal components gradually.

## Zoom Synchronization
Pinch gestures on the expert device control the viewer camera zoom so both devices stay synchronized.

## Reset Button
Pressing the home button resets the camera position and model state on both devices.

## Help Modal
Both interfaces display a help modal explaining the controls when entering the session.

---

# How to Use the System

## 1. Open Both Interfaces

Viewer (tablet or laptop)

https://embodied-cad-guidance.onrender.com/viewer/

Expert (phone)

https://embodied-cad-guidance.onrender.com/expert/

Both devices must be connected to the internet.

---

## 2. Start the Session

Viewer

1. Tap **Enter**
2. Read the help modal
3. Tap **Got it**

Expert

1. Tap **Start**
2. Read the help modal
3. Tap **Got it**

The viewer will now display **Following expert**.

---

# Example Demo Flow

## Orient the Model
Move the expert phone to rotate the engine.

The viewer camera follows in real time.

---

## Zoom
Pinch on the expert device to zoom in or out.

Both devices remain synchronized.

---

## Highlight Parts
Tap a component button on the expert interface.

Example:

Pistons  
Housing

The selected part turns yellow on both screens.

---

## Lock the View
Swipe down on the expert device.

This locks the camera and enables orbit controls.

---

## Orbit the Engine

Use the D-pad:

- ▲ ▼ orbit up and down
- ◄ ► orbit around the engine

The viewer follows the orbit.

---

## Explode the Engine
Tilt the expert phone forward slowly.

The engine explodes apart to reveal internal components.

Tilt backward to reassemble.

---

## Reset
Tap the home button.

Both screens reset to the original view.

---

## Viewer Exploration
The viewer can:

- pinch to zoom  
- pan around the engine  
- inspect parts independently

A ghost arrow shows where the expert is currently looking.

---

# Technology Stack

- A-Frame
- Three.js
- Node.js
- Socket.io
- DeviceOrientation API
- Web Audio API

---

# Known Limitations

iOS Haptic Feedback  
Safari blocks the `navigator.vibrate()` API, so haptic feedback is unavailable on iOS devices.

Audio Initialization  
iOS requires a user interaction before audio playback can start.

3DoF Only  
Mobile browsers do not support WebXR SLAM on iOS, so the system uses rotational tracking only.

No Multi-Session Support  
All connected clients share the same event stream.

No Authentication  
Any device visiting the URL can connect to the session.

---

# 3D Model Credit

This project uses the **Radial Pneumatic Engine** 3D model from Sketchfab.

Model: *3D Printable Radial Pneumatic Engine*  
Creator: Slava Z  
Source: https://sketchfab.com/3d-models/3d-printable-radial-pneumatic-engine-3cbddbecd6c5462391e9936a3ccd7d32

The model is used for demonstration purposes in the shared 3D scene.

---

# AI Assistance Disclosure

Claude Code was used as a co-authoring tool during development of this project. It assisted with portions of the prototype implementation, including generating and refining code for the web interface, sensor processing logic, and Socket.io communication based on specifications provided by the development team. Claude Code was also used for debugging and troubleshooting implementation issues. All system design decisions, feature specifications, and final implementation were reviewed and validated by the project team.

---

# Repository

https://github.com/chantaldelcarmen/embodied-cad-guidance

---

# Authors

CPSC 581 HCI II  
Winter 2026  
Group B01-1

Chantal del Carmen  
Umer Rehman  
Phuong Le  
Lei Fang
