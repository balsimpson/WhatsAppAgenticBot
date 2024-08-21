<template>
	<div
		class="flex flex-col min-h-screen bg-gray-50 bg-gradient-to-t from-white to-bg-stone-800"
	>
		<header class="bg-white shadow-sm">
			<div
				class="flex flex-col items-center justify-between px-4 py-4 mx-auto md:flex-row max-w-7xl sm:px-6 lg:px-8"
			>
				<div class="flex items-center">
					<NuxtLink
						to="/"
						class="text-2xl font-extrabold tracking-tight text-gray-700 transition duration-200 ease-in-out hover:text-gray-600"
					>
						WhatsApp<span class="text-purple-700">Agent</span>
					</NuxtLink>
				</div>
				<nav
					class="flex items-center p-2 mt-2 bg-gray-100 rounded-lg shadow-md md:mt-0 gap-x-4"
				>
					<!-- OpenAI API Status -->
					<div class="flex items-center">
						<div class="flex items-center group">
							<span
								:class="`py-1 ml-2 text-xs font-medium ${
									config.public.OPENAI_KEY ? 'text-gray-700' : 'text-red-600'
								}`"
							>
								{{
									config.public.OPENAI_KEY
										? "OpenAI API Connected"
										: "OpenAI API Not Connected"
								}}
							</span>
							<div
								:class="`w-6 h-6 ml-2 rounded-full ${
									config.public.OPENAI_KEY
										? 'bg-green-500 group-hover:bg-green-600'
										: 'bg-red-500 group-hover:bg-red-600'
								}`"
							></div>
						</div>
					</div>

					<!-- KV Store Status -->
					<div class="flex items-center">
						<div class="flex items-center group">
							<span
								:class="` py-1 ml-2 text-xs font-medium ${
									config.public.KV_URL ? 'text-gray-700' : 'text-red-600'
								}`"
							>
								{{
									config.public.KV_URL
										? "KV Store Connected"
										: "KV Store Not Connected"
								}}
							</span>
							<div
								:class="`w-6 h-6 ml-2 rounded-full ${
									config.public.KV_URL
										? 'bg-green-500 group-hover:bg-green-600'
										: 'bg-red-500 group-hover:bg-red-600'
								}`"
							></div>
						</div>
					</div>
				</nav>
			</div>
		</header>

		<div class="flex-grow">
			<slot />
		</div>
	</div>
</template>

<script setup>
	const config = useRuntimeConfig();
</script>

<style>
	html {
		scroll-behavior: smooth;
	}
</style>
