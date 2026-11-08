# Volunteam App

Volunteam is a mobile app that helps people find volunteering events near them.

Users log in and see upcoming events as markers on a map. The goal is for volunteers to browse events, see their details and sign up, and for organizers to create new events.

This version includes logging in, viewing events on the map and logging out.

## Setting up a development environment

1. Install [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).
2. Install the [Expo Go](https://expo.dev/go) app on your phone, or set up an Android or iOS emulator.
3. Clone this repository and install the project's packages:

```
yarn install
```

4. Set up the fake API and the image upload API using the steps below.

### Setting up the fake API (json-server)

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

### Setting up the image upload API

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

## Running the app

1. Start the fake API:

```
npx json-server --watch db.json --port 3333 --host your_ip_address_here -m ./node_modules/json-server-auth
```

2. In a second terminal, start the app:

```
IMGBB_API_KEY="insert_your_api_key_here" npx expo start
```

3. Scan the QR code with Expo Go (Android) or the Camera app (iOS) to open the app on your phone. You can also press `a` to open it in an Android emulator, or `i` for an iOS simulator.
