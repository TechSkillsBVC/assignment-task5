# Volunteam App

A mobile application built with **React Native (Expo)** that allows authenticated users to view event locations on a map.  
This project is used for learning purposes, focusing on authentication, API usage, image uploading, caching, and maps integration.

---

##  Project Scope

The goal of this project is to demonstrate:

- Proper structure of a React Native (Expo) application.
- Documentation of components, functions, classes, and modules.
- Use of React Navigation, Context API, and authentication flow.
- Integration of a fake API (json-server + json-server-auth).
- Uploading images through a third-party API (ImgBB).
- Displaying map markers using react-native-maps.
- Managing local caching using AsyncStorage.
- Providing clear repository-level documentation.


---


##  Running the Application

### 1. Install dependencies

```sh
yarn install
# or
npm install
```

### 2. Start the Expo app

```sh
npx expo start
```

You can open the app using:

- Expo Go on your phone  
- iOS Simulator  
- Android Emulator  

---

##  Setting up the Fake API (json-server)

This project uses **json-server-auth** to simulate authentication and user management.

### Step 1 — Update API URL

Open:

```
src/services/api.ts
```

Update the base URL to your local IP:

```ts
baseURL: "http://your_ip_address:3333";
```

To find your IP:

- Windows: `ipconfig`  
- macOS/Linux: `ifconfig`

### Step 2 — Run the Fake API

```sh
npx json-server --watch db.json --port 3333 --host your_ip_address -m ./node_modules/json-server-auth
```

### Optional: Use a Hosted JSON Server

```
https://my-json-server.typicode.com/<your-github-username>/<your-repository>
```

Ensure `db.json` is located in your repository root.

---

##  Setting up the Image Upload API (ImgBB)

### Step 1 — Create an ImgBB Account

Sign up here:  
https://imgbb.com/signup  

Retrieve the API key from your ImgBB account.

### Step 2 — Add API Key to `.env`

Inside the project root:

```env
IMGBB_API_KEY=your_api_key_here
```

### Step 3 — Run Expo with Environment Variable

```sh
IMGBB_API_KEY="your_api_key_here" npx expo start
```

### Step 4 — For EAS Builds

Before building or publishing, push your secrets to EAS:

```sh
eas secret:push
```

---

##  Technologies Used

- React Native (Expo)
- TypeScript
- React Navigation
- React Native Maps
- Axios
- AsyncStorage
- json-server
- json-server-auth
- ImgBB API
- Expo Constants
- Context API

---

##  Authentication Flow Overview

1. The user enters email and password in the Login screen.  
2. The app sends a POST request to `/login` using Axios.  
3. If authentication succeeds:
   - The user object is saved to AsyncStorage.
   - The access token is saved to AsyncStorage.
   - The AuthenticationContext is updated.
4. The user is automatically navigated to the **EventsMap** screen.  
5. The Logout button clears cache and redirects back to Login.

---

##  Events Map Overview

- Displays static event markers on top of a Google map.
- Uses `fitToCoordinates` to automatically position the map around markers.
- Shows the user’s device location (if permissions allowed).
- Includes buttons for:
  - Event creation (future feature)
  - Logging out

---



