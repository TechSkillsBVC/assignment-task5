# Volunteam

A mobile app that connects people who want to volunteer with the organizations
that need them.

## What the app is for

Local organizations post events that need volunteers — a food drive, a
community skating day, an after-school coding class. Volunteers open the app,
see what is happening near them on a map, read the details of an event and sign
themselves up. Organizers get their team filled without chasing people by phone.

The goal is to make that whole exchange take a couple of taps: find something
nearby, see whether it still needs people, and join.

Events are plotted on a map rather than listed, because what matters most when
you are deciding whether to volunteer is how far away it is.

## What is in this repository

This branch covers the foundation of the app:

- **Login** — email and password sign in against the API, with the session
  cached so returning users skip straight past it.
- **Events map** — a map of Calgary with a marker for each event, a footer
  showing how many were found, and a logout button.

The create event and event details flows are not wired up yet. The two buttons
that lead to them are in place but do nothing.

## Built with

| | |
|---|---|
| Framework | React Native via Expo (SDK 47) |
| Language | TypeScript |
| Navigation | React Navigation (stack) |
| Maps | react-native-maps with the Google provider |
| HTTP | axios |
| Local storage | Async Storage |
| Fake backend | json-server + json-server-auth |

---

# Setting up a development environment

## What you need first

- **Node.js 16 or newer** — check with `node --version`.
- **Git**.
- **Expo Go** on your phone, from the App Store or Play Store. Your phone and
  your computer have to be on the same Wi-Fi network.
- A code editor. VS Code with the ESLint and Prettier extensions is what the
  team uses.

You do not need Xcode or Android Studio to run the app, only Expo Go.

## Get the project

```bash
git clone <your-fork-url>
cd assignment-task5
npm install
```

## Set up the fake API

The backend is not built yet, so the app talks to json-server, which serves
`db.json` from the repository root as a REST API.

**1. Find your computer's IP address on the local network.**

```bash
# Windows
ipconfig

# macOS / Linux
ifconfig | grep "inet "
```

Look for the address starting `192.168.` or `10.` — not `127.0.0.1`, because
your phone cannot reach that.

**2. Point the app at it.** Open `src/services/api.ts` and set the base URL:

```ts
baseURL: 'http://192.168.1.65:3333',
```

**3. Start the server**, with your own address in place of the example:

```bash
npx json-server --watch db.json --port 3333 --host 192.168.1.65 -m ./node_modules/json-server-auth
```

Leave it running. You should see `/events` and `/users` listed.

Every account seeded in `db.json` uses the password `123456`.

> `--watch` writes changes straight back into `db.json`, so anything you create
> while testing ends up in the file. Check it before you commit.

### Running without a local server

If you would rather not run json-server, push your repository to GitHub and set:

```ts
baseURL: 'https://my-json-server.typicode.com/<your-github-username>/<your-repo>',
```

`db.json` has to be at the repository root for this to work. It is read only,
so anything the app writes will not stick.

## Set up the image upload API

Event pictures are not stored on the backend, they are uploaded to an image
host and only the URL is saved. The project uses
[ImgBB](https://api.imgbb.com/).

1. Sign up at https://imgbb.com/signup and copy your API key.
2. Create a `.env` file in the project root:

```
IMGBB_API_KEY=your_key_here
```

`.env` is gitignored — do not commit your key.

To start the app with the key available:

```bash
IMGBB_API_KEY="your_key_here" npx expo start
```

When you publish or build, push the secret to EAS:

```bash
eas secret:push
```

---

# Running the application

With json-server already running in one terminal, open a second one and start
the app:

```bash
npx expo start
```

A QR code appears. Scan it with the Camera app on iOS or with Expo Go on
Android, and the app opens on your phone.

Log in with any account from `db.json`, for example:

```
Email:    ulla.ulriksen@example.com
Password: 123456
```

## Other ways to run it

```bash
npx expo start --android   # Android emulator
npx expo start --ios       # iOS simulator, macOS only
npx expo start --web       # browser (the map will not render)
```

## If something will not connect

| Problem | Usually means |
|---|---|
| QR code shows `exp://127.0.0.1` | Expo picked the wrong network adapter. Run `npx expo start --lan`. |
| "Network Error" on login | `baseURL` does not match the address json-server is bound to, or the server is not running. |
| App loads but no events | json-server is reachable but returned nothing — check the terminal running it. |
| Phone cannot find the app | Phone and computer are on different networks, or a VPN is on. |

---

# Project structure

```
src/
├── @types/        Type declarations for non-code imports (images)
├── components/    Reusable UI pieces — BigButton, Spacer
├── constants/     Shared values — map position, zoom, padding
├── context/       App-wide state — the signed in user
├── images/        Logo and map markers
├── pages/         Screens — Login, EventsMap
├── routes/        Navigation stack and the authentication provider
├── services/      Outside world — api, imageApi, caching
├── types/         Shared models — User
└── utils/         Helpers — formatting, validation, dates, tokens
```

`db.json` at the root is the fake database. `app.config.ts` holds the Expo
configuration, including the permission messages and the `extra` block that
passes secrets through to the running app.
