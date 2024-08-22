<template>
	<div class="w-full max-w-2xl">
		<div class="flex items-center justify-between">
			<div class="flex items-center pb-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						fill-rule="evenodd"
						d="M11.33 5a1 1 0 0 0-1 1v13h3.33V6a1 1 0 0 0-1-1h-1.33Zm4.33 14H18a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-2.34v10Zm0-12V6a3 3 0 0 0-3-3h-1.33a3 3 0 0 0-3 3v5H6a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3h-2.34Zm-7.33 6H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.33v-6Z"
						clip-rule="evenodd"
					></path>
				</svg>
				<span class="pl-2 font-semibold">Logs </span>
			</div>

			<button
				class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
				@click.prevent="pollingHandler"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					:class="[isPolling ? 'text-green-500 animate-spin' : 'text-gray-500']"
					class="w-3 h-3 mr-2"
					
				>
					<path
						fill-rule="evenodd"
						d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
						clip-rule="evenodd"
					/>
				</svg>

				{{ isPolling ? "Stop" : "Start" }} Live Data
			</button>
		</div>

		<!-- <pre>{{ logs }}</pre> -->
		<div
			class="w-full max-w-2xl p-4 mx-auto space-y-2 overflow-y-auto font-mono text-sm text-green-500 bg-black rounded-lg shadow-md max-h-72"
		>
			<div v-for="(log, index) in logs" :key="index">
				<div v-if="log.timestamp" class="text-xs font-light text-gray-500">
					{{ getRelativeTime(log.timestamp) }}
				</div>

				<div
					:class="[
						log.user ? 'bg-black text-green-400' : 'bg-black text-blue-400',
						log.type === 'error' ? 'text-red-400' : '',
					]"
					class="flex flex-col sm:flex-row"
				>
					<div
						:class="[
							log.user
								? 'text-green-600'
								: log.type === 'requires_action'
								? 'text-yellow-600'
								: log.type === 'error'
								? 'text-red-600'
								: 'text-blue-600',
						]"
					>
						{{
							log.user
								? `${log.user}:`
								: log.type === "requires_action"
								? "Action:"
								: log.type === "error"
								? "Error:"
								: "Assistant:"
						}}
					</div>

					<div
						@click.prevent="toggleTruncate(index)"
						class="max-w-full overflow-hidden cursor-pointer sm:pl-3"
						:class="[
							isTruncatedList[index] ? 'truncate' : '',
							log.type === 'requires_action' ? 'text-yellow-500' : '',
							log.type === 'error' ? 'text-red-500' : '',
						]"
					>
						{{ log.content }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps(["logs"]);
	const emits = defineEmits(["togglePolling"]);
	const isPolling = ref(false);
	const isTruncatedList = ref(props.logs.map(() => true));
	const toggleTruncate = (index) => {
		isTruncatedList.value[index] = !isTruncatedList.value[index];
	};

	const pollingHandler = () => {
		isPolling.value = !isPolling.value
		emits("togglePolling", isPolling.value);
	};
</script>
