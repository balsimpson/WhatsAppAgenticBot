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
						class="flex items-center text-2xl font-extrabold tracking-tight text-gray-700 transition duration-200 ease-in-out hover:text-gray-600"
					>
						<img src="/favicon.ico" alt="" class="w-8 pr-2" />
						WhatsApp<span class="text-purple-700">Agent</span>
					</NuxtLink>
				</div>
				<nav
					class="flex items-center mt-2 md:mt-0"
				>
					<div class="flex items-center p-2 bg-gray-100 rounded-full shadow-md gap-x-4">
						<!-- OpenAI API Status -->
						<APIStatusDisplay
							title="OpenAI API"
							:status="config.public.OPENAI_KEY ? true : false"
						/>

						<!-- KV Store Status -->
						<APIStatusDisplay
							title="KV Store"
							:status="config.public.KV_URL ? true : false"
						/>
					</div>
					<NuxtLink to="/help" class="flex items-center pl-6 font-semibold text-gray-700 hover:text-gray-900">

						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M12 9a1 1 0 0 0-.879.522 1 1 0 0 1-1.754-.96A3 3 0 0 1 12 7c1.515 0 2.567 1.006 2.866 2.189.302 1.189-.156 2.574-1.524 3.258A.618.618 0 0 0 13 13a1 1 0 1 1-2 0c0-.992.56-1.898 1.447-2.342.455-.227.572-.618.48-.978C12.836 9.314 12.529 9 12 9Z" clip-rule="evenodd"></path><path d="M13.1 16a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"></path></svg>
						<span class="pl-1">Help</span>
					</NuxtLink>
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
