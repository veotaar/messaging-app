FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

ARG VITE_BASE_URL
ARG VITE_SOCKET_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}

RUN bun run build

FROM nginx:1.29-alpine AS runner
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
