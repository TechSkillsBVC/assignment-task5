# VolunTeam

VolunTeam is a simple mobile app that connects **community organizers** with **volunteers**.
The app lets users **view events on a map**, see basic details, and (in future tasks) **create/join** events.

## 🧭 Project Scope & Goal

* **Scope**

  * Show a map with event locations (markers).
  * Display a list/count of available events.
  * Authenticate a user (basic login flow).
  * Use a fake API (json-server) for local development and an image host (ImgBB) for uploads.

* **Goal**

  * Provide an easy, mobile-first way to discover and manage volunteer events.

---

## 🧰 Development Setup

### Prerequisites

* **Node.js 18+** and **npm**
* **Git**
* **Expo** (via `npx expo`, no global install required)
* Optional: Android Studio / Xcode for emulators

### 1) Clone and install

```bash
git clone <your-fork-url>
cd volunteam
npm install
```

### 2) Configure environment variables

If you plan to use image uploads with ImgBB:

* Create a `.env` at the project root (or supply vars via shell when running):

  ```
  IMGBB_API_KEY=YOUR_IMGBB_API_KEY
  ```

> The app reads environment values via Expo config (see `utils/getEnvironentVariable`).

### 3) Point the app to your API

Open `src/services/api.ts` and set `baseURL`:

* **Local json-server** (recommended during development):
  `http://<YOUR_LOCAL_IP>:3333`
* **Or** use **my-json-server** (hosted, read-only):
  `https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>`

> Tip: Use your LAN IP (e.g., `192.168.x.x`). Phone/emulator and your machine must be on the same network.

---

## ▶️ How to Run the App

### Option A: Run with local fake API (json-server)

1. Start the API in a new terminal at the **project root** (where `db.json` lives):

   ```bash
   npx json-server --watch db.json --port 3333 --host <YOUR_LOCAL_IP> -m ./node_modules/json-server-auth
   ```
2. Start the Expo app:

   ```bash
   # if using an env var for ImgBB:
   IMGBB_API_KEY="YOUR_IMGBB_API_KEY" npx expo start

   # or simply
   npx expo start
   ```
3. In the Expo terminal:

   * Press **a** for Android emulator
   * Press **i** for iOS simulator (macOS)
   * Or scan the QR with the **Expo Go** app on your device

### Option B: Use my-json-server (no local server)

1. Put `db.json` in your GitHub repo **root**.
2. Set `baseURL` to:

   ```
   https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>
   ```
3. Start the Expo app:

   ```bash
   npx expo start
   ```

---

## 🖼️ Setting up the Image Upload API (ImgBB)

The app can upload images using **ImgBB** (you can also use any service you prefer).

1. Sign up for a free API key: [https://imgbb.com/signup](https://imgbb.com/signup)
2. `src/services/imageApi.ts` uses `IMGBB_API_KEY` from your environment.
3. Provide your key when running locally:

   ```bash
   IMGBB_API_KEY="insert_your_api_key_here" npx expo start
   ```
4. For EAS builds or publish, push secrets:

   ```bash
   eas secret:push
   ```

---

## 🗂️ Project Structure (high level)

```
src/
  components/        # Reusable UI components (e.g., BigButton, Spacer)
  context/           # App-wide contexts (AuthenticationContext)
  pages/             # Screens (Login, EventsMap)
  routes/            # Navigation stack (AppStack)
  services/          # API clients (api, caching, imageApi)
  types/             # Shared TypeScript types (User, etc.)
  utils/             # Helpers (formatting, tokens, etc.)
assets/              # Images/fonts (if any)
db.json              # Fake API data (json-server)
```

---

## 🧪 Useful Scripts

```bash
npx expo start      # start dev server
npm run android     # run on Android (if defined)
npm run ios         # run on iOS (if defined)
npm run web         # run in web (if enabled)
npm run lint        # lint code (if configured)
npm test            # run tests (if present)
```

---

## 🛠️ Troubleshooting

* **App can’t reach API**: confirm `baseURL` uses your LAN IP (not `localhost`), both devices are on the same network, and port `3333` is open.
* **Invalid email**: the simple validator currently only accepts 3-letter TLDs (e.g., `.com`). You can improve the regex in `utils/index.ts` if needed.
* **Fonts not rendering**: the app waits for Nunito fonts to load in `App.tsx`. If nothing shows, check Metro logs.

---

## ✍️ Documentation Notes (for graders)

* Functions include **inputs/outputs** comments.
* Components include **props** and short **capabilities** notes.
* Classes (where used) include **responsibilities**.
* README includes **scope/goal**, **dev setup**, and **how to run**.

---
## 📄 License

MIT © 2025 Tam Nguyen  
> Note: This repository is used for coursework. Please follow your course’s academic integrity rules when reusing code.