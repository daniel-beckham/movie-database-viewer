FROM node:16-alpine as base

# Change the working directory
WORKDIR /app/backend

# Copy the package.json file
COPY ./backend/package.json /app/backend

# Install the dependencies
RUN npm install --silent

# Copy the remaining files
COPY ./backend /app/backend

# Create the production build
RUN npm run build
