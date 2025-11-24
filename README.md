# Volunteam

This project was created using **Expo**, **json-server**, and the **ImgBB API**.  
It is part of a BVC TechSkills assignment focusing on mobile development, API usage, and writing clear code documentation.

---

## Project Scope & Goals

- Implement a simple login and authentication flow.
- Display volunteer events on a map using `react-native-maps`.
- Integrate with a fake backend powered by `json-server`.
- Practice writing clear comments for:
  - functions (inputs/outputs),
  - components (responsibilities/props),
  - services (purpose/behavior).

---

# Tech Stack

- React Native / Expo
- TypeScript
- React Navigation
- json-server + json-server-auth
- ImgBB (optional image upload service)

---

# Running the Expo App

## 1. Add your ImgBB API key

Create `.env.local`:

```
IMGBB_API_KEY="INSERT YOUR KEY HERE"
```

`App.tsx` will automatically load this key.

## 2. Start Expo

```
npx expo start
```

Use Expo Go or an emulator to open the app.

---

# Running json-server (Fake API)

The app relies on a local REST backend.

## 1. Update baseURL in `src/services/api.ts`

Replace:

```ts
baseURL: "http://INSERT_YOUR_IP_ADDRESS:3333";
```

Find your IP:

```
ipconfig
```

Use the IPv4 address starting with `192.168.*.*`.

## 2. Start json-server

```
npx json-server --host INSERT_YOUR_IP_ADDRESS --port 3333 ./db.json --routes routes.json
```

---

# Code Documentation Requirements

The assignment requires:

- Adding function comments (inputs, outputs, purpose)
- Adding component comments (responsibilities, props used)
- Adding service/module comments (data flow, behavior)
- Ensuring consistency across the project

---

# Project Structure

```
src/
 ├── pages/        # Screens (Login, EventsMap, etc.)
 ├── components/   # Shared UI Components
 ├── services/     # API + caching logic
 ├── context/      # Authentication provider
 └── utils/        # Validation helpers
```
