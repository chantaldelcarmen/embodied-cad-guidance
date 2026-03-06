# Deployment Guide

## Deploy to Render.com

### Step 1: Prepare Repository
Your code is already prepared for deployment.

### Step 2: Push to GitHub
```bash
git add .
git commit -m "feat: prepare for Render deployment"
git push origin main
```

### Step 3: Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up/login (use GitHub account)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub account
5. Select `chantaldelcarmen/embodied-cad-guidance` repository
6. Configure:
   - **Name:** embodied-cad-guidance
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
7. Click **"Create Web Service"**

### Step 4: Get Your URL
After 2-3 minutes, Render will give you a URL like:
```
https://embodied-cad-guidance.onrender.com
```

### Step 5: Test on School WiFi
- Expert (phone): `https://your-app.onrender.com/expert/`
- Viewer (laptop): `https://your-app.onrender.com/viewer/`

### Important Notes
- Free tier goes to sleep after 15 min of inactivity
- First request after sleep takes ~30 seconds to wake up
- For demo, visit the URL 5 minutes before presenting
- HTTPS works automatically (required for iPhone motion)

### Backup Plan
If school WiFi blocks it:
- Use mobile hotspot from a second phone
- Both devices connect to that hotspot
- Access the deployed URL via cellular data
