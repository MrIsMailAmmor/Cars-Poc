// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  nitro: {
    preset: "node-server",
    routeRules: {
      "/uploads/**": {
        headers: { "cache-control": "public, max-age=3600" },
      },
    },
  },
});
