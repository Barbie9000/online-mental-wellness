// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  css: ['~/assets/css/global.css'],
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
    mpesa: {
      PASSKEY: process.env.PASSKEY,
      SHORTCODE: process.env.SHORTCODE,
      CONSUMERKEY: process.env.CONSUMERKEY,
      CONSUMERSECRET: process.env.CONSUMERSECRET,
      AUTH_URL: process.env.AUTH_URL,
      STK_URL: process.env.STK_URL,
      CALLBACKURL: process.env.CALLBACKURL,
    }
  },
  modules: ['nuxt-auth-utils']
})
