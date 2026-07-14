# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies using the lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci

# Build the production bundle
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine AS serve

# SPA-aware nginx config (listens on 8080)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
