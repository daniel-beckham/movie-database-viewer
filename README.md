# Movie Database Viewer
### [Live Demo](https://danielbeckham.com/movie-database-viewer)

This is a web app that displays searchable information about movies, TV shows, and people.

The back end is powered by [Express](https://expressjs.com/) and uses the [The Movie Database](https://www.themoviedb.org/) API to retrieve all of the data. The front end is built with [React](https://reactjs.org/) using [Create React App](https://create-react-app.dev/). Both the back end and the front end are written in [https://www.typescriptlang.org/](TypeScript).

The app has been configured primarily for use with Docker Compose, but it can also be set up manually. Instructions are provided below.

## Docker Compose Instructions
* Provide the required information in the `.env` file.
* Build and start the app:
  ```
  docker-compose up
  ```

## Manual Setup Instructions
### Front End
* Navigate to the front end directory (`cd frontend`). 
* Install the dependencies:
  ```
  npm install
  ```
* Create the production build so that the static files can be served by the back end:
  ```
  npm run build
  ```

### Back End
* Navigate to the back end directory (`cd backend`).
* Install the dependencies:
  ```
  npm install
  ```
* Compile the TypeScript files:
  ```
  npm run build
  ```
* Start the Express server:
  ```
  npm run start
  ```
