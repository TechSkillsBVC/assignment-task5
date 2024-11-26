# Volunteam App

# Project Description
Volunteam is an application designed to connect volunteers with events that need their help.
The app allows users to log in, view events on a map, and participate in volunteering activities.
The goal is to create a seamless and interactive platform for community engagement and support.

# Scope and Goal

The primary scope of the Volunteam app is to facilitate 
the connection between volunteers and organizations in need of assistance. 
By providing a platform to easily find and join volunteer events, 
the app aims to enhance community involvement and make volunteering more accessible. 
The goal is to encourage more people to participate in community service 
by simplifying the process of finding and joining events.

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
