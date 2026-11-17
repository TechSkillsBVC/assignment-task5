# Volunteam App

## Project scope and goal

Volunteam is a mobile app that helps volunteers find and join local
volunteering events, and helps organizers list new ones. The app shows
nearby events on a map, lets a volunteer see an event's details and sign up
for it, and lets a user log in with an account stored in a small fake
backend used for development.

This version of the project covers the login flow and the map screen that
lists events. It is built with Expo and React Native, and is written in
TypeScript.

## Setting up a development environment

These steps get the project running on your own machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (an LTS version) and [Yarn](https://classic.yarnpkg.com/).
- The [Expo Go](https://expo.dev/client) app installed on your phone, to run the app without a simulator.
- Both your computer and your phone connected to the same Wi-Fi network.

### Install the project

```
git clone <this repository's URL>
cd assignment-task5
yarn install
```

### Set up the fake API (json-server)

The app talks to a small fake backend, served from `db.json` by
`json-server`, for logging in and reading data.

Update the file `src/services/api.ts`.

Before running your `json-server`, get your computer's IP address and
update your `baseURL` to `http://your_ip_address_here:3333`, then run:

```
npx json-server --watch db.json --port 3333 --host your_ip_address_here -m ./node_modules/json-server-auth
```

To access your server online without running `json-server` locally, you can
set your `baseURL` to:

```
https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>
```

To use `my-json-server`, make sure your `db.json` is located at the repo
root.

### Set up the image upload API

Update the file `src/services/imageApi.ts`.

You can use any hosting service of your preference. In this case, we will
use the ImgBB API: https://api.imgbb.com/.
Sign up for free at https://imgbb.com/signup, get your API key, and add it
to the `.env` file in your root folder.

To run the app in your local environment, you will need to set the
`IMGBB_API_KEY` when starting the app, as shown in the next section.

When creating your app build or publishing, import your secret values to
EAS by running:

```
eas secret:push
```

## Running the application

With the fake API running (see above), start the Expo development server:

```
IMGBB_API_KEY="insert_your_api_key_here" npx expo start
```

Then, on your phone:

- **Android:** open Expo Go and scan the QR code shown in the terminal.
- **iOS:** open the Camera app, point it at the QR code, and tap the banner
  that appears to open the project in Expo Go.

You can also press `a` in the terminal to open an Android emulator, or `i`
to open an iOS simulator, when one is installed on your computer.
