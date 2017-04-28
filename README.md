
# Getting started with imdb-node app
imdb-node app is a project designed to retrieve and display search results from the imdb api
This project is currently configured to return a single search result from 3 criteria: name, year, and IMDB ID

It uses a NodeJS back-end with express routing, and an AngularJS front-end to enable users to search IMDB.

Leverages imdb-api for requests:
https://www.npmjs.com/package/imdb-api

General Development process:
* Created back-end with express routing to retrieve a single Movie from IMDB using the imdb-api with a single criterion, 'name'
* Create front-end with AngularJS to request results from Node server and render them with Bootstrap
* Extended search functionality for Year and IMDB ID
* Basic testing and front-end cleanup/styling

## 1. Clone the app

Once you clone the git repository, use npm and bower to install dependencies.
  ```
  git clone https://github.com/simonreid/imdb-node.git
  ```

Install server dependencies
  ```
  npm install
  ```

Install front-end dependencies
  ```
  bower install
  ```

  Peruse the files in the directory structure to familiarize yourself with the contents.

## 2. Run the app locally

Install the dependencies listed in the [package.json](https://docs.npmjs.com/files/package.json) file to run the app locally.  
  ```
  npm start
  ```

Alternatively you can use:
  ```
  node server.js
  ```

If running locally, use these settings:
  ```
  ./config/config.global.js, config.offline = true;
  ./public/js/app.js, options.server_url = "http://localhost:3000";
  ```

Offline mode sends a generic search result response object, found in the config folder
If deploying to a production server, you will need to change the server_url in app.js for proper functionality

View your app at: http://localhost:3000

## 2. Basic server testing

Perform testing, as defined in ./test/test.js, with mocha:
  ```
  npm test
  ```
