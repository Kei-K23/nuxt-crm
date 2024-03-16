// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: "%s - Nuxt",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1"
    },
    pageTransition: { name: "page", mode: "out-in" },
  }

})
