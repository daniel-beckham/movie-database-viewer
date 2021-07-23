FROM node:16-alpine as base

# Set the build-time variables
ARG SUBDIRECTORY

# Set the environment variables
ENV PUBLIC_URL $SUBDIRECTORY

# Change the working directory
WORKDIR /app/frontend

# Copy the package.json file
COPY ./frontend/package.json /app/frontend

# Install the dependencies
RUN npm install --silent

# Copy the remaining files
COPY ./frontend /app/frontend

# Create the production build
RUN npm run build

FROM alpine:latest

# Copy all of the build files
COPY --from=base /app/frontend/build /app/frontend/build
