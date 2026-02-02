<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1IZb42rqcmMzRyd9-_mXqBWsg8myEwsJV

## Run Locally

**Prerequisites:**  Node.js (22.x)


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

If Vercel shows `npm error Exit handler never called`, it is typically a Node.js/npm runtime mismatch. This repo pins Node **22.x** via:

- `engines.node: "22.x"` in `package.json`
- `.nvmrc` with `22`
- `vercel.json` with `NODE_VERSION: "22.x"` and `installCommand: "npm ci"`

Note: Vercel only allows major versions (20.x / 22.x / 24.x). Avoid specifying minor/patch versions.
