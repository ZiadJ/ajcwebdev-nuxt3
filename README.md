# Example Project from [A First Look at Nuxt 3](https://dev.to/ajcwebdev/a-first-look-at-nuxt-3-1769)

Nuxt's goal is to make web development intuitive and performant with a great developer experience in mind. The original version was created by [Sébastien Chopin in October 2016](https://github.com/nuxt/nuxt.js/commit/0072ed31da6ce39d21046e05898f956cff190390) to emulate the features of Next.js but with Vue instead of React. Version 3 has been [over a year in the making](https://nuxtjs.org/announcements/nuxt3-beta/) and is composed of the following [core packages](https://github.com/nuxt/framework/tree/main/packages):

- Core Engine: [nuxt3](https://github.com/nuxt/framework/tree/main/packages/nuxt3)
- Bundlers: [@nuxt/vite-builder](https://github.com/nuxt/framework/tree/main/packages/vite) and [@nuxt/webpack-builder](https://github.com/nuxt/framework/tree/main/packages/webpack)
- Command line interface: [nuxi](https://github.com/nuxt/framework/tree/main/packages/nuxi)
- Server engine: [@nuxt/nitro](https://github.com/nuxt/framework/tree/main/packages/nitro)
- Development kit: [@nuxt/kit](https://github.com/nuxt/framework/tree/main/packages/kit)
- Nuxt 2 Bridge: [@nuxt/bridge](https://github.com/nuxt/framework/tree/main/packages/bridge)

Together these packages provide a selection of libraries for managing many common concerns for developers building on the web today such as:

|Tool|Nuxt Opinion|
|----|------------|
|JavaScript framework to bring reactivity and web components|[Vue.js](https://v3.vuejs.org)|
|Bundler to support hot module replacement in development and bundling for production|[Webpack 5](https://webpack.js.org/) and [Vite](https://vitejs.dev/) both supported|
|Transpiler for writing the latest JavaScript syntax while supporting legacy browsers|[esbuild](https://esbuild.github.io)|
|Server that can serve your application in development and support [server-side rendering](https://v3.vuejs.org/guide/ssr/introduction.html#what-is-server-side-rendering-ssr) or API routes|[h3](https://github.com/unjs/h3)|
|Routing library to handle client-side navigation|[vue-router](https://next.router.vuejs.org)|

In addition to curating and integrating these tools, Nuxt also provides directory structure conventions for managing pages and components.

### `package.json`

Nuxi is the new CLI for Nuxt 3 and has two main commands:
1. `nuxi dev` - Start development server
2. `nuxi build` - Make production assets

We also created a `start` script that uses Node to run the bundled output generated for the server by `nuxi build`.

```json
{
  "scripts": {
    "dev": "nuxi dev",
    "build": "nuxi build",
    "start": "node .output/server/index.mjs"
  },
  "devDependencies": {
    "nuxt3": "latest"
  }
}
```

### Start development server

The `yarn dev` command starts your Nuxt app in development mode and includes hot module replacement. You can include the `--open` flag to automatically open the browser after starting up.

```bash
yarn dev
```

The CLI will display links to the running application and performance metrics.

```
Nuxt CLI v3.0.0-27237303.6acfdcd

  > Local:    http://localhost:3000/
  > Network:  http://192.168.1.242:3000/

ℹ Vite warmed up in 592ms
✔ Generated nuxt.d.ts
✔ Vite server built in 903ms
✔ Nitro built in 112 ms
```

Open [localhost:3000](http://localhost:3000) to see your application.

![01-ajcwebdev-nuxt3-localhost-3000](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9oc49oolv9d31ljml352.png)

### Build for production

The `yarn build` command builds your Nuxt application for production. It creates a `.output` directory with your application, server, and dependencies ready to be deployed.

```bash
yarn build
```

Nitro produces a standalone server dist that is independent of `node_modules`. The output is combined with both runtime code to run your Nuxt server in any environment and serve you static files. A native storage layer is also implemented for supporting multi source, drivers and local assets.

## Pages directory

The `pages/` directory is optional, meaning that if you only use `app.vue`, `vue-router` won't be included, reducing your application bundle size. However, if you do include it, Nuxt will automatically integrate [Vue Router](https://next.router.vuejs.org/) and map `pages/` directory into the routes of your application.

### `index.vue`

```vue
<!-- pages/index.vue -->

<template>
  <div>
    <h2>ajcwebdev-nuxt3</h2>
  </div>
</template>
```

### `about.vue`

```vue
<!-- pages/about.vue -->

<template>
  <div>
    <h2>This page tells you stuff about things!</h2>
  </div>
</template>
```

Open [localhost:3000/about](http://localhost:3000/about).

![02-about-page-localhost-3000](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lyngyw7ae27x213gfu4f.png)

## Server Engine

Nuxt 3 is powered by a new server engine called Nitro. Nitro is used in development and production. It includes cross-platform support for Node.js, Browsers, and service-workers and serverless support out-of-the-box. Other features include API routes, automatic code-splitting, async-loaded chunks, and hybrid static/serverless modes. Server API endpoints and Middleware that internally uses [h3](https://github.com/unjs/h3) are added by Nitro.

* Handlers can directly return objects/arrays for an automatically-handled JSON response
* Handlers can return promises, which will be awaited (`res.end()` and `next()` are also supported)
* Helper functions for body parsing, cookie handling, redirects, and headers

Nitro allows 'direct' calling of routes via the globally-available `$fetch` helper. This will make an API call to the server if run on the browser, but will simply call the relevant function if run on the server, **saving an additional API call**. The `$fetch` API uses [ohmyfetch](https://github.com/unjs/ohmyfetch) to:

* Automatically parse JSON responses (with access to raw response if needed)
* Automatically handle request body and params with correct `Content-Type` headers added

### Server directory for API routes

The `server/` directory contains API endpoints and server middleware for your project. It is used to create any backend logic for your Nuxt application. Nuxt will automatically read in any files in the `~/server/api` directory to create API endpoints. Each file should export a default function that handles API requests.

```js
// server/api/hello.js

export default (req, res) => '<h2>Hello from Nuxt 3</h2>'
```

Open [localhost:3000/api/hello](http://localhost:3000/api/hello).

![03-hello-api-route-localhost-3000](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9g8nobz0clkvvmhw8e5o.png)

## Deploy to Netlify

What's the point of a framework if you can't deploy it on a Jamstack platform?

```toml
[build]
  command = "yarn build"
  publish = "dist"
  functions = ".output/server"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/index"
  status = 200
```

Connect your repo to your Netlify account.

![04-connect-repo-to-netlify](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z592uzltp4s5l3oyhzqv.png)

The build command and publish directory will be included automatically from the `netlify.toml` file.

![05-netlify-site-settings](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/859hdgl9xdp8sxxmiosx.png)

Lastly, give yourself a custom domain.

![06-add-custom-domain](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g8o7fjemh6o7f8n8hbhd.png)

Open [ajcwebdev-nuxt3.netlify.app/](https://ajcwebdev-nuxt3.netlify.app/).

![07-ajcwebdev-nuxt3-netlify-deploy](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mrlsbltxfvo6rayxcbtl.png)
