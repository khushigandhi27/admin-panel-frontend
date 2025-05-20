# === Stage 1: Build React Frontend ===
FROM node:18-alpine AS frontend

WORKDIR /app

# Copy React package files
COPY admin-panel-frontend/package*.json ./admin-panel-frontend/

# Install React deps & build
WORKDIR /app/admin-panel-frontend
RUN npm install
COPY admin-panel-frontend/ ./
RUN npm run build

# === Stage 2: Build and Run Backend (Express Server) ===
FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY package*.json ./
RUN npm install

# Copy backend source
COPY . ./

# Copy built React frontend into backend
COPY --from=frontend /app/admin-panel-frontend/build ./admin-panel-frontend/build

# Expose backend port
EXPOSE 8080

# Run your Express app
CMD ["node", "index.js"]
