<template>
	<div class="w-full max-w-2xl">
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

		<div
			class="w-full max-w-2xl p-4 mx-auto space-y-2 overflow-y-auto font-mono text-sm text-green-500 bg-black rounded-lg shadow-md max-h-72"
		>
			<div v-for="(log, index) in logs" :key="index">
				<div v-if="log.timestamp" class="text-xs font-light text-gray-500">
					{{ getRelativeTime(log.timestamp) }}
				</div>

				<div
					:class="
						log.user ? 'bg-black text-green-400' : 'bg-black text-blue-400'
					"
					class="flex flex-col sm:flex-row"
				>
					<div
						:class="[
							log.user
								? 'text-green-600'
								: log.type === 'requires_action'
								? 'text-yellow-600'
								: 'text-blue-600',
						]"
					>
						{{
							log.user
								? `${log.user}:`
								: log.type === "requires_action"
								? "Action:"
								: "Assistant:"
						}}
					</div>

					<div
						@click.prevent="toggleTruncate(index)"
						class="max-w-full overflow-hidden cursor-pointer sm:pl-3"
						:class="[
							isTruncatedList[index] ? 'truncate' : '',
							log.type === 'requires_action' ? 'text-yellow-500' : '',
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
	const isTruncatedList = ref(props.logs.map(() => true));
	const toggleTruncate = (index) => {
		isTruncatedList.value[index] = !isTruncatedList.value[index];
	};
</script>
