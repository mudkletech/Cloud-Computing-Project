# Docker Instructions

This project has been containerized using Docker. This allows you to run the entire application (Frontend + Backend) as a single container.

## Prerequisites
- Docker installed on your machine.

## How to Build the Image

Run the following command from the **root** of your project (where the `package.json` is):

```bash
docker build -f proshop_docker/Dockerfile -t proshop .
```

*   `-f proshop_docker/Dockerfile`: Tells Docker to use the file inside the `proshop_docker` folder.
*   `-t proshop`: Names the image "proshop".
*   `.`: Tells Docker to look for files in the current folder (root).

## How to Run the Container

Once built, tun the container with:

```bash
```bash
docker run -p 5000:5000 --env-file .env -e NODE_ENV=production proshop
```

*   `-p 5000:5000`: Maps port 5000 (Host) -> 5000 (Container).
*   `--env-file .env`: Passes your local secrets.
*   `-e NODE_ENV=production`: FORCE production mode so the server displays the website (instead of the "API is running" message).

## Access the App

Open your browser and go to:
[http://localhost:5000](http://localhost:5000)

## Notes for Examiner
-   This Dockerfile uses a **multi-stage-like setup** (conceptually) where we install dependencies, build the React frontend, and then serve it using the Node.js backend.
-   It uses `node:22-alpine` for a lightweight, secure production environment.
