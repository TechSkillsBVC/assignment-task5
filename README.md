# Volunteam App

## Project Scope and Goal

Volunteam is an application designed to help connect people with local volunteer events. The app displays a map of available volunteer opportunities and allows users to log in, view event details, and create new events. It also integrates with external APIs for managing user authentication, image uploads, and data storage.

# Setting up the Development Environment

## Setting up the fake API (json-server)

To simulate the backend and have a local mock API, you'll need to set up json-server on your machine. Follow these steps to configure it:

Update the file `src/services/api.ts`.

Before running your 'json-server', get your computer's IP address and update your baseURL to `http://your_ip_address_here:3333` and then run:

```
npx json-server --watch db.json --port 3333 --host your_ip_address_here -m ./node_modules/json-server-auth

This command will start the server and watch for any changes to your db.json file. Make sure the db.json is located at the root of the repo.
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

This will securely store your API key for the build process when you're ready to create a production app.
```
