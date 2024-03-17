// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
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
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})
