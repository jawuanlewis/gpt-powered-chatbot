# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install all dependencies
COPY package.json package-lock.json ./
COPY client/package.json client/package-lock.json ./client/
RUN npm install && npm install --prefix client

# Copy source code
COPY . .

RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production
WORKDIR /app

# Copy only the built output and production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/app.js"] 