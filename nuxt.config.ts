// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon', "@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1"
    }
  },
  devtools: { enabled: true },
  runtimeConfig: {
    databaseURL: process.env.DATABASE_URL,
    databaseAuthToken: process.env.DATABASE_AUTH_TOKEN
  },

})