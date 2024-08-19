// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  nitro: {
		preset: "vercel-edge",
		storage: {
			data: { driver: "vercelKV" },
		},
	},
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
	public: {
		OPENAI_KEY: process.env.OPENAI_KEY,
	},
  },
})
