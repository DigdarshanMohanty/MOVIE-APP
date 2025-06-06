# Movie App

A React-based web application that allows users to search for movies using the OMDb API. This project is designed for developers learning React, API integration, and frontend development workflows.


## OMDB API BASE URL 

[API_BASE_URL](https://omdbapi.com)

## Environment Variables

To run this project, you will need to add the following environment variable to your .env file

`VITE_OMDB_API_KEY`

## API Reference

### Get all movies
``` http
GET /?s={searchTerm}&apikey={apiKey}
```

### Get a single movie by ID
``` http
GET /?i={id}&apikey={apiKey}
```

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```




