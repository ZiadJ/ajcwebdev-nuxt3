import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  serverMiddleware: {
    '/api': '~/api'
  }
})
