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
				<nav>
					<!-- Add navigation items here if needed -->
				</nav>
			</div>
		</header>
    
		<div class="flex-grow">
			<slot />
		</div>
	</div>
</template>

<style>
	html {
		scroll-behavior: smooth;
	}
</style>
