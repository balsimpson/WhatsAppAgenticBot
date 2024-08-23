<template>
    <div class="w-full max-w-2xl mt-12 mb-3">
			<div class="flex items-center mb-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M11 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM14.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
					></path>
					<path
						fill-rule="evenodd"
						d="M12 1a1 1 0 0 1 1 1v.5h4a3 3 0 0 1 3 3V9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V5.5a3 3 0 0 1 3-3h4V2a1 1 0 0 1 1-1ZM7 4.5h10a1 1 0 0 1 1 1V9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V5.5a1 1 0 0 1 1-1Z"
						clip-rule="evenodd"
					></path>
					<path
						d="M6 21c0-.974.551-1.95 1.632-2.722C8.71 17.508 10.252 17 12 17c1.749 0 3.29.508 4.369 1.278C17.449 19.05 18 20.026 18 21a1 1 0 1 0 2 0c0-1.788-1.016-3.311-2.469-4.35-1.455-1.038-3.414-1.65-5.53-1.65-2.118 0-4.077.611-5.532 1.65C5.016 17.69 4 19.214 4 21a1 1 0 1 0 2 0Z"
					></path>
				</svg>
				<span class="pl-2 font-semibold"
					>Assistants
					<span
						v-if="assistants && assistants.length"
						class="px-2 py-1 text-sm text-white bg-gray-500 border rounded"
						>{{ assistants.length }}</span
					>
				</span>
			</div>

			<div class="w-full max-w-2xl space-y-2 overflow-scroll h-96 snap-y">
				<LazyAssistantCard
					class="snap-start"
					v-for="assistant in assistants"
					:key="assistant"
					:id="assistant.id"
					:title="assistant.name"
					:date="assistant.created_at"
					:model="assistant.model"
					:tools="assistant.tools"
				/>
			</div>
		</div>
</template>

<script setup>
defineProps(["assistants"])
</script>