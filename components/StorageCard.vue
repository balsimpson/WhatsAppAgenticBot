<template>
	<div class="w-full max-w-2xl p-4 bg-white border rounded-lg">
		<div class="flex justify-between">
			<div class="w-full">
				<NuxtLink :to="`/assistants/${file.id}`" class="text-lg font-bold">{{
					file.filename
				}}</NuxtLink>
				<div class="text-sm text-gray-400">{{ file.id }}</div>
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
	import { useDateFormatter } from "~/composables/useUtils";
	defineProps({
		file: {
			type: Object,
			required: true,
		},
	});

	const { formatDate } = useDateFormatter();
</script>
