# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY ./package*.json .

# Install the dependencies
RUN npm install

WORKDIR /app/src

# Copy the rest of the code
ADD . .

# Expose the port that the app listens on
EXPOSE 3000

# Define the command to run the app
CMD npm run dev
