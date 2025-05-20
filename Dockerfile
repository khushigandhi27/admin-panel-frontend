# ==== Stage 1: Build React Frontend ====
FROM node:18-alpine AS frontend

WORKDIR /app

# Copy frontend package.json files
COPY admin-panel-frontend/package*.json ./admin-panel-frontend/

WORKDIR /app/admin-panel-frontend

# Install frontend dependencies
RUN npm install

# Copy all frontend files and build
COPY admin-panel-frontend/ ./
RUN npm run build


# ==== Stage 2: Backend Setup ====
FROM node:18-alpine AS backend

WORKDIR /app

# Copy backend package.json files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all backend files
COPY . ./

# Copy built frontend files into backend folder
COPY --from=frontend /app/admin-panel-frontend/build ./admin-panel-frontend/build

# Expose backend port
EXPOSE 8080

# Start backend server
CMD ["node", "index.js"]
