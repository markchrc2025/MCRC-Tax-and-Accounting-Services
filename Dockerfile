# ---- Build stage: compile the Vite frontend ----
FROM node:22-alpine AS build
WORKDIR /app

# Install frontend dependencies using the lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci

# Build the production bundle
COPY . .
RUN npm run build

# ---- Runtime stage: Node server that serves the build + handles the API ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install only the server's runtime dependencies (express, pg, nodemailer)
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --omit=dev

# Server code + the compiled frontend
COPY server ./server
COPY --from=build /app/dist ./dist

EXPOSE 8080
CMD ["node", "server/index.js"]
