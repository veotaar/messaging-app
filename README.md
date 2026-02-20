# Messaging App Frontend

A real-time messaging application frontend built with React (TS) and Vite. Users can register, add friends, and exchange messages in real time over WebSockets.

[Backend Repo (Express.js, TS)](https://github.com/veotaar/messaging-app-api) | [Live Demo](https://messenger.ulus.uk/)



## Features

- **Authentication:** JWT-based auth with automatic session expiry detection and protected route guards
- **Real-time messaging:** Bi-directional communication via Socket.io
- **Conversations:** Paginated chat history with cursor-based infinite scroll (load older messages on demand)
- **Friends system:** Find users by email, send/accept/reject friend requests, and start a conversation directly from the friends list
- **Dark/light mode:** Persistent theme toggle

## Tech Stack

- **Build Tool:** Vite
- **UI Framework:** React
- **Routing:** TanStack Router (file-based)
- **Server State:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Real-time:** Socket.io
- **Styling:** Tailwind CSS
- **Component Library:** shadcn/ui
- **Linting / Formatting:** Biome

## Deployment

The app is containerized with Docker and served as static files via Nginx. The production build is deployed on a Hetzner VPS.
