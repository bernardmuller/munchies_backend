/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignUpImport } from './routes/sign-up'
import { Route as SignInImport } from './routes/sign-in'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as AuthedSettingsImport } from './routes/_authed/settings'
import { Route as AuthedSettingsIndexImport } from './routes/_authed/settings/index'
import { Route as AuthedListsIndexImport } from './routes/_authed/lists/index'
import { Route as AuthedItemsIndexImport } from './routes/_authed/items/index'
import { Route as AuthedSettingsProfileImport } from './routes/_authed/settings/profile'
import { Route as AuthedSettingsHouseholdImport } from './routes/_authed/settings/household'
import { Route as AuthedListsListIdImport } from './routes/_authed/lists/$listId'

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const SignInRoute = SignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthedSettingsRoute = AuthedSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedSettingsIndexRoute = AuthedSettingsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthedSettingsRoute,
} as any)

const AuthedListsIndexRoute = AuthedListsIndexImport.update({
  id: '/lists/',
  path: '/lists/',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedItemsIndexRoute = AuthedItemsIndexImport.update({
  id: '/items/',
  path: '/items/',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedSettingsProfileRoute = AuthedSettingsProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthedSettingsRoute,
} as any)

const AuthedSettingsHouseholdRoute = AuthedSettingsHouseholdImport.update({
  id: '/household',
  path: '/household',
  getParentRoute: () => AuthedSettingsRoute,
} as any)

const AuthedListsListIdRoute = AuthedListsListIdImport.update({
  id: '/lists/$listId',
  path: '/lists/$listId',
  getParentRoute: () => AuthedRoute,
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
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/sign-in': {
      id: '/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
    '/sign-up': {
      id: '/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpImport
      parentRoute: typeof rootRoute
    }
    '/_authed/settings': {
      id: '/_authed/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthedSettingsImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/lists/$listId': {
      id: '/_authed/lists/$listId'
      path: '/lists/$listId'
      fullPath: '/lists/$listId'
      preLoaderRoute: typeof AuthedListsListIdImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/settings/household': {
      id: '/_authed/settings/household'
      path: '/household'
      fullPath: '/settings/household'
      preLoaderRoute: typeof AuthedSettingsHouseholdImport
      parentRoute: typeof AuthedSettingsImport
    }
    '/_authed/settings/profile': {
      id: '/_authed/settings/profile'
      path: '/profile'
      fullPath: '/settings/profile'
      preLoaderRoute: typeof AuthedSettingsProfileImport
      parentRoute: typeof AuthedSettingsImport
    }
    '/_authed/items/': {
      id: '/_authed/items/'
      path: '/items'
      fullPath: '/items'
      preLoaderRoute: typeof AuthedItemsIndexImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/lists/': {
      id: '/_authed/lists/'
      path: '/lists'
      fullPath: '/lists'
      preLoaderRoute: typeof AuthedListsIndexImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/settings/': {
      id: '/_authed/settings/'
      path: '/'
      fullPath: '/settings/'
      preLoaderRoute: typeof AuthedSettingsIndexImport
      parentRoute: typeof AuthedSettingsImport
    }
  }
}

// Create and export the route tree

interface AuthedSettingsRouteChildren {
  AuthedSettingsHouseholdRoute: typeof AuthedSettingsHouseholdRoute
  AuthedSettingsProfileRoute: typeof AuthedSettingsProfileRoute
  AuthedSettingsIndexRoute: typeof AuthedSettingsIndexRoute
}

const AuthedSettingsRouteChildren: AuthedSettingsRouteChildren = {
  AuthedSettingsHouseholdRoute: AuthedSettingsHouseholdRoute,
  AuthedSettingsProfileRoute: AuthedSettingsProfileRoute,
  AuthedSettingsIndexRoute: AuthedSettingsIndexRoute,
}

const AuthedSettingsRouteWithChildren = AuthedSettingsRoute._addFileChildren(
  AuthedSettingsRouteChildren,
)

interface AuthedRouteChildren {
  AuthedSettingsRoute: typeof AuthedSettingsRouteWithChildren
  AuthedListsListIdRoute: typeof AuthedListsListIdRoute
  AuthedItemsIndexRoute: typeof AuthedItemsIndexRoute
  AuthedListsIndexRoute: typeof AuthedListsIndexRoute
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedSettingsRoute: AuthedSettingsRouteWithChildren,
  AuthedListsListIdRoute: AuthedListsListIdRoute,
  AuthedItemsIndexRoute: AuthedItemsIndexRoute,
  AuthedListsIndexRoute: AuthedListsIndexRoute,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
  '/settings': typeof AuthedSettingsRouteWithChildren
  '/lists/$listId': typeof AuthedListsListIdRoute
  '/settings/household': typeof AuthedSettingsHouseholdRoute
  '/settings/profile': typeof AuthedSettingsProfileRoute
  '/items': typeof AuthedItemsIndexRoute
  '/lists': typeof AuthedListsIndexRoute
  '/settings/': typeof AuthedSettingsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
  '/lists/$listId': typeof AuthedListsListIdRoute
  '/settings/household': typeof AuthedSettingsHouseholdRoute
  '/settings/profile': typeof AuthedSettingsProfileRoute
  '/items': typeof AuthedItemsIndexRoute
  '/lists': typeof AuthedListsIndexRoute
  '/settings': typeof AuthedSettingsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/sign-in': typeof SignInRoute
  '/sign-up': typeof SignUpRoute
  '/_authed/settings': typeof AuthedSettingsRouteWithChildren
  '/_authed/lists/$listId': typeof AuthedListsListIdRoute
  '/_authed/settings/household': typeof AuthedSettingsHouseholdRoute
  '/_authed/settings/profile': typeof AuthedSettingsProfileRoute
  '/_authed/items/': typeof AuthedItemsIndexRoute
  '/_authed/lists/': typeof AuthedListsIndexRoute
  '/_authed/settings/': typeof AuthedSettingsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/sign-in'
    | '/sign-up'
    | '/settings'
    | '/lists/$listId'
    | '/settings/household'
    | '/settings/profile'
    | '/items'
    | '/lists'
    | '/settings/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/sign-in'
    | '/sign-up'
    | '/lists/$listId'
    | '/settings/household'
    | '/settings/profile'
    | '/items'
    | '/lists'
    | '/settings'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/sign-in'
    | '/sign-up'
    | '/_authed/settings'
    | '/_authed/lists/$listId'
    | '/_authed/settings/household'
    | '/_authed/settings/profile'
    | '/_authed/items/'
    | '/_authed/lists/'
    | '/_authed/settings/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
  SignInRoute: typeof SignInRoute
  SignUpRoute: typeof SignUpRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
  SignInRoute: SignInRoute,
  SignUpRoute: SignUpRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authed",
        "/sign-in",
        "/sign-up"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/settings",
        "/_authed/lists/$listId",
        "/_authed/items/",
        "/_authed/lists/"
      ]
    },
    "/sign-in": {
      "filePath": "sign-in.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.tsx"
    },
    "/_authed/settings": {
      "filePath": "_authed/settings.tsx",
      "parent": "/_authed",
      "children": [
        "/_authed/settings/household",
        "/_authed/settings/profile",
        "/_authed/settings/"
      ]
    },
    "/_authed/lists/$listId": {
      "filePath": "_authed/lists/$listId.tsx",
      "parent": "/_authed"
    },
    "/_authed/settings/household": {
      "filePath": "_authed/settings/household.tsx",
      "parent": "/_authed/settings"
    },
    "/_authed/settings/profile": {
      "filePath": "_authed/settings/profile.tsx",
      "parent": "/_authed/settings"
    },
    "/_authed/items/": {
      "filePath": "_authed/items/index.tsx",
      "parent": "/_authed"
    },
    "/_authed/lists/": {
      "filePath": "_authed/lists/index.tsx",
      "parent": "/_authed"
    },
    "/_authed/settings/": {
      "filePath": "_authed/settings/index.tsx",
      "parent": "/_authed/settings"
    }
  }
}
ROUTE_MANIFEST_END */
