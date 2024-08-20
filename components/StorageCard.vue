<template>
	<div class="w-full max-w-2xl p-4 bg-white border rounded-lg">
		<div class="flex justify-between">
			<div class="w-full">
				<div class="text-lg font-bold leading-3">
					{{ file.filename }}
				</div>
				<div class="pt-1 text-sm text-gray-400">{{ file.id }}</div>
			</div>

			<div class="w-full max-w-[100px] text-sm font-semibold text-right">
				{{ file.bytes ? formatBytes(file.bytes) : "" }}
			</div>
		</div>

		<div class="mt-2 text-xs text-gray-500 uppercase">
			{{ file.status }}
		</div>

		<div class="text-sm font-semibold">
			{{ file.created_at ? formatDate(file.created_at) : "" }}
		</div>

		<!-- <div>{{ file }}</div> -->
	</div>
</template>

<script setup>
	defineProps({
		file: {
			type: Object,
			required: true,
		},
	});

	const { formatDate } = useDateFormatter();

	// const formatDate = (timestamp) => {
	// 	const date = new Date(timestamp * 1000);
	// 	const options = {
	// 		year: "numeric",
	// 		month: "short",
	// 		day: "2-digit",
	// 		hour: "2-digit",
	// 		minute: "2-digit",
	// 		// second: "2-digit",
	// 		hour12: true,
	// 	};
	// 	//   @ts-ignore
	// 	return new Intl.DateTimeFormat("en-GB", options).format(date);
	// };
</script>
