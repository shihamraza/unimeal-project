# ---- Stage 1: Build ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the backend source code
COPY . .

# ---- Stage 2: Production ----
FROM node:18-alpine

WORKDIR /app

# Copy only what we need from the builder
COPY --from=builder /app /app

# Expose the port the Express server listens on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
