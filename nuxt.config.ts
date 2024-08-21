// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	nitro: {
		preset: "vercel-edge",
		storage: {
			data: { driver: "vercelKV" },
		},
		routeRules: {
			"/api/sse": {
				headers: {
					"cache-control": "no-cache",
				}
			}
		}

	},
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss"],
	app: {
		head: {
			title: "WhatsApp Agent | Your Personal AI Assistant",
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{
					name: "description",
					content:
						"Deploy your own AI-powered WhatsApp chatbot. Automate tasks, retrieve files, and enhance productivity with customizable function calling.",
				},
				{
					property: "og:title",
					content: "WhatsApp Agent | Customizable AI Chatbot",
				},
				{
					property: "og:description",
					content:
						"Experience the power of AI in your WhatsApp. Deploy a personal assistant capable of task automation, file retrieval, and custom integrations.",
				},
				{
					property: "og:image",
					content: "https://example.com/whatsapp-agent-preview.png",
				},
				{
					property: "og:url",
					content: "https://whatsapp-agent.com/",
				},
				{
					name: "twitter:card",
					content: "summary_large_image",
				},
				{
					name: "twitter:title",
					content: "WhatsApp Agent | AI-Powered Personal Assistant",
				},
				{
					name: "twitter:description",
					content:
						"Transform your WhatsApp into a powerful tool. Deploy an AI chatbot for task automation, file management, and custom integrations.",
				},
				{
					name: "twitter:image",
					content: "https://example.com/whatsapp-agent-preview.png",
				},
				{
					name: "keywords",
					content:
						"WhatsApp, AI, chatbot, automation, personal assistant, file retrieval, function calling",
				},
			],
			script: [],
			link: [],
			style: [],
		},
	},
	runtimeConfig: {
		public: {
			OPENAI_KEY: process.env.OPENAI_KEY,
			KV_URL: process.env.KV_URL,
		},
	},
});
