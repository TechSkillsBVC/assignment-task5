# Volunteam App

------------------------------------------------------------------------       PROJECT OVERVIEW     ---------------------------------------------

    The Volunteam app helps users find volunteer opportunities in their local community. The app uses a map interface to display volunteer events, 
    and users can view details about events and sign up to volunteer. The app also supports image uploads for event-related content.

## Setting up the Fake API (json-server with authentication)-------------------------------------------------------------------------------------------------------

Backend Setup: Using json-server-auth

This app uses the json-server-auth module to simulate backend authentication. The json-server-auth module is a Node.js package that provides authentication features for a json-server instance. It comes with a default setup, so once you have installed json-server and set up the required files, the authentication system will be automatically configured for you.

        ### Update the file src/services/api.ts:
        Before running your json-server, get your computer's IP address and update the base URL in the api.ts file to:

            http://your_ip_address_here:3333

        ### Running the Backend: To run the json-server backend (which also includes the authentication module json-server-auth), open a terminal, navigate to your project directory, and run the following command:

            npx json-server --watch db.json --port 3333 --host your_ip_address_here -m ./node_modules/json-server-auth

        NOTE1.: This command will start the backend server on your machine and use json-server-auth for user authentication.

        NOTE2: Accessing the Backend Online (Optional): If you prefer to access your backend server online, you can use my-json-server. Set your base URL to:

            https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>

        Make sure that your db.json file is located at the root of your repository for this option.

## ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Setting up the Image Upload API
Image Hosting: Using ImgBB
Update the file src/services/imageApi.ts: You can use any image hosting service, but in this case, we will use ImgBB. Sign up for a free account at ImgBB, get your API key, and add it to the .env file in your root folder.

Set your API Key: To run the app in your local environment, set the IMGBB_API_KEY when starting the app using:

IMGBB_API_KEY="insert_your_api_key_here" npx expo start

## -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Installation Instructions
1. Clone the Repository
Clone the repository to your local machine

2. Install Dependencies
Navigate to the project folder and install the dependencies:

    npm install
    or
    yarn install

3. Running the Backend
In one terminal, navigate to your project folder and run the json-server backend:

    npx json-server --watch db.json --port 3333 --host your_ip_address_here -m ./node_modules/json-server-auth

4. Running the Frontend
In a second terminal, navigate to the project folder and start the frontend (React Native) app using Expo:

$env:IMGBB_API_KEY="Replace_here_with_Your_API"; npx expo start

## ---------------------------------------------------------------------------------------------------------------

                        ## Main Code Flow Summary:
                        The app starts at App.tsx.
                        App.tsx renders the AppStack.tsx, which manages navigation.
                        The app initially loads the Login.tsx screen, where users can authenticate.
                        Upon successful login, the app navigates to the EventsMap.tsx, where the user can view and interact with events on the map.

## ----------------------------------------------------------------------------------------------------------------

                        ## Dependencies
                        This project uses the following key dependencies:

                        React Native: Framework for building mobile apps.
                        Expo: A platform to build React Native apps quickly.
                        json-server: A simple REST API for testing.
                        json-server-auth: A module for simulating authentication in the json-server.
                        ImgBB: Image hosting service.
                        react-navigation: Navigation library for React Native.



