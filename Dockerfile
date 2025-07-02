# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json tsconfig.base.json ./

COPY server/package.json server/package-lock.json ./server/
WORKDIR /app/server
RUN npm ci

COPY server/. ./
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app/server

COPY --from=builder /app/server/package.json ./
COPY --from=builder /app/server/package-lock.json ./
COPY --from=builder /app/server/dist ./dist
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/app.js"] 
