# Use a Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all files
COPY . .

# Build the React app
RUN npm run build

# Serve the app using a simple server
RUN npm install -g serve
CMD ["serve", "-s", "build"]
