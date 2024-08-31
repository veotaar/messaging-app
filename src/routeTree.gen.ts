/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as HomeImport } from './routes/home'
import { Route as IndexImport } from './routes/index'
import { Route as HomeIndexImport } from './routes/home.index'
import { Route as HomeFriendsImport } from './routes/home.friends'
import { Route as HomeFindFriendsImport } from './routes/home.find-friends'
import { Route as HomeConversationsImport } from './routes/home.conversations'
import { Route as HomeConversationsChatIdImport } from './routes/home.conversations.$chatId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const HomeRoute = HomeImport.update({
  path: '/home',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const HomeIndexRoute = HomeIndexImport.update({
  path: '/',
  getParentRoute: () => HomeRoute,
} as any)

const HomeFriendsRoute = HomeFriendsImport.update({
  path: '/friends',
  getParentRoute: () => HomeRoute,
} as any)

const HomeFindFriendsRoute = HomeFindFriendsImport.update({
  path: '/find-friends',
  getParentRoute: () => HomeRoute,
} as any)

const HomeConversationsRoute = HomeConversationsImport.update({
  path: '/conversations',
  getParentRoute: () => HomeRoute,
} as any)

const HomeConversationsChatIdRoute = HomeConversationsChatIdImport.update({
  path: '/$chatId',
  getParentRoute: () => HomeConversationsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/home/conversations': {
      id: '/home/conversations'
      path: '/conversations'
      fullPath: '/home/conversations'
      preLoaderRoute: typeof HomeConversationsImport
      parentRoute: typeof HomeImport
    }
    '/home/find-friends': {
      id: '/home/find-friends'
      path: '/find-friends'
      fullPath: '/home/find-friends'
      preLoaderRoute: typeof HomeFindFriendsImport
      parentRoute: typeof HomeImport
    }
    '/home/friends': {
      id: '/home/friends'
      path: '/friends'
      fullPath: '/home/friends'
      preLoaderRoute: typeof HomeFriendsImport
      parentRoute: typeof HomeImport
    }
    '/home/': {
      id: '/home/'
      path: '/'
      fullPath: '/home/'
      preLoaderRoute: typeof HomeIndexImport
      parentRoute: typeof HomeImport
    }
    '/home/conversations/$chatId': {
      id: '/home/conversations/$chatId'
      path: '/$chatId'
      fullPath: '/home/conversations/$chatId'
      preLoaderRoute: typeof HomeConversationsChatIdImport
      parentRoute: typeof HomeConversationsImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  HomeRoute: HomeRoute.addChildren({
    HomeConversationsRoute: HomeConversationsRoute.addChildren({
      HomeConversationsChatIdRoute,
    }),
    HomeFindFriendsRoute,
    HomeFriendsRoute,
    HomeIndexRoute,
  }),
  LoginRoute,
  RegisterRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/home",
        "/login",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/home": {
      "filePath": "home.tsx",
      "children": [
        "/home/conversations",
        "/home/find-friends",
        "/home/friends",
        "/home/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/home/conversations": {
      "filePath": "home.conversations.tsx",
      "parent": "/home",
      "children": [
        "/home/conversations/$chatId"
      ]
    },
    "/home/find-friends": {
      "filePath": "home.find-friends.tsx",
      "parent": "/home"
    },
    "/home/friends": {
      "filePath": "home.friends.tsx",
      "parent": "/home"
    },
    "/home/": {
      "filePath": "home.index.tsx",
      "parent": "/home"
    },
    "/home/conversations/$chatId": {
      "filePath": "home.conversations.$chatId.tsx",
      "parent": "/home/conversations"
    }
  }
}
ROUTE_MANIFEST_END */
