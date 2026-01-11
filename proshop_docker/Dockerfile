# Use the official Node.js image.
# We use node:22-alpine to match your Render environment and keep the image small.
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the root package.json and package-lock.json (if available)
COPY package*.json ./

# Copy the frontend package.json to the frontend directory
# We need to create the directory first
RUN mkdir frontend
COPY frontend/package*.json ./frontend/

# Install dependencies for both root and frontend
# This installs backend deps (root) and frontend deps
# usage of 'npm install' in root will also set up what's needed for the backend
# We run npm install in frontend explicitly to be sure
RUN npm install
RUN npm install --prefix frontend

# Copy the rest of the application code
COPY . .

# Build the frontend application
# We set the OpenSSL legacy provider flag here just in case, though it's also in your package.json
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build --prefix frontend

# Set NODE_ENV to production so the server serves the frontend
ENV NODE_ENV=production

# Expose port 5000 (the port your backend runs on)
EXPOSE 5000

# Define the command to run the app
# This runs "node backend/server.js"
CMD ["npm", "start"]
