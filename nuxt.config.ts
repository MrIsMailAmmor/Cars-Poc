// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  nitro: {
    // This tells Nitro to include the generated Prisma folder in the final build
    moduleSideEffects: ["@prisma/client"],
    externals: {
      trace: true,
      include: [".prisma"], // This is where the actual binaries and code live
    },
  },
});
