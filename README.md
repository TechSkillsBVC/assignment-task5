# Volunteam App

## Project Scope and Goal

**Volunteam** is a cross-platform mobile application built with React Native, Expo, and TypeScript that connects volunteers with local community events. The app allows users to securely sign in, browse upcoming volunteer opportunities on an interactive map, view event locations and details, and coordinate participation.

### Key Capabilities

- **User Authentication:** Email and password login backed by JWT tokens (`json-server-auth`) with persistent local sessions stored in AsyncStorage.
- **Interactive Events Map:** Displays local volunteer events as custom map markers using `react-native-maps` and Google Maps, automatically fitting all active event coordinates into view.
- **Offline Caching:** Uses a network-first caching strategy so previously fetched user profile and session data remain accessible offline.
- **Backend & Media Integration:** Connects to a REST API (`json-server`) for user and event records and integrates with the ImgBB API for hosting uploaded event images.

---

## Development Environment Setup

### 1. Prerequisites

Ensure the following tools are installed before setting up the project:

- **Node.js** (v16 or newer recommended)
- **Yarn** or **npm**
- **Expo Go** installed on your iOS or Android device (or an Android Emulator / iOS Simulator)

### 2. Install Project Dependencies

Clone your forked repository, open a terminal in the project root folder, and install the dependencies:

```bash
yarn install
# or
npm install
```

## Setting up the fake API (json-server)

Update the file `src/services/api.ts`.

Before running your 'json-server', get your computer's IP address and update your baseURL to `http://your_ip_address_here:3333` and then run:

```
npx json-server --watch db.json --port 3333 --host your_ip_address_here -m ./node_modules/json-server-auth

```

To access your server online without running json-server locally, you can set your baseURL to:

```
https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>

```

To use `my-json-server`, make sure your `db.json` is located at the repo root.

## Setting up the image upload API

Update the file `src/services/imageApi.ts`.

You can use any hosting service of your preference. In this case, we will use ImgBB API: https://api.imgbb.com/.
Sign up for free at https://imgbb.com/signup, get your API key and add it to the .env file in your root folder.

To run the app in your local environment, you will need to set the IMGBB_API_KEY when starting the app using:

```
IMGBB_API_KEY="insert_your_api_key_here" npx expo start
```

When creating your app build or publishing, import your secret values to EAS running:

```
eas secret:push
```
