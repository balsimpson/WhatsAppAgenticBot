<template>
	<div
		class="flex flex-col min-h-screen bg-gray-50 bg-gradient-to-t from-white to-bg-stone-800"
	>
		<header class="bg-white shadow-sm">
			<div
				class="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
			>
				<div class="flex items-center">
					<NuxtLink
						to="/"
						class="text-xl font-bold text-gray-900 transition duration-150 ease-in-out hover:text-gray-700"
					>
						WhatsApp Agent
					</NuxtLink>
				</div>
				<nav class="flex items-center gap-x-2">
					<div v-if="config.public.OPENAI_KEY" class="flex items-center">
						<div class="flex items-center group">
							<span
								class="px-2 py-1 ml-2 text-sm text-gray-500 "
							>
								OpenAI API set
							</span>
							<div
								class="w-6 h-6 bg-green-700 rounded cursor-pointer hover:bg-green-800"
							></div>
						</div>
					</div>

					<div v-else class="flex items-center">
						<div class="flex items-center group">
							<span
								class="px-2 py-1 ml-2 text-sm text-red-500 "
							>
								OpenAI API not set
							</span>
							<div
								class="w-6 h-6 bg-red-700 rounded cursor-pointer hover:bg-red-800"
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
