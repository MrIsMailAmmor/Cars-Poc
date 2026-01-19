// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  nitro: {
    preset: "node-server",
    publicAssets: [
      {
        baseURL: "/uploads",
        dir: "./public/uploads",
        maxAge: 60 * 60 * 24 * 7, // Optional: Cache images for 7 days
      },
    ],
  },
});
