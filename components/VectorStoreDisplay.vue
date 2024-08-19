<template>
	<div class="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
		<div class="px-6 py-4">
			<h2 class="text-2xl font-bold">{{ data.name }}</h2>
			<p class="">ID: {{ data.id }}</p>
		</div>

		<div class="p-6 space-y-6">
            <div class="flex justify-between">
                
                <div class="flex items-center space-x-4">
                    <!-- <Icon name="mdi:database" class="text-blue-500" /> -->
                    <div>
                        <p class="text-sm text-gray-500">Files</p>
                        <p class="font-semibold">{{ data.file_counts.total }}</p>
                    </div>
                </div>
                
                <div class="flex items-center space-x-4 text-right">
                    <!-- <Icon name="mdi:database" class="text-blue-500" /> -->
                    <div>
                        <p class="text-sm text-gray-500">Storage Used</p>
                        <p class="font-semibold">{{ formatBytes(data.usage_bytes) }}</p>
                    </div>
                </div>
            </div>

			<div class="flex justify-between">
				<div class="flex items-center space-x-4 text-sm">
					<!-- <Icon name="mdi:clock-outline" class="text-green-500" /> -->
					<div>
						<p class="text-sm text-gray-500">Created At</p>
						<p class="font-semibold">{{ formatDate(data.created_at) }}</p>
					</div>
				</div>

				<div v-if="data.last_active_at" class="flex items-center space-x-4 text-sm text-right">
					<!-- <Icon name="mdi:chart-bar" class="text-purple-500" /> -->
					<div>
						<p class="text-gray-500 ">Last Active</p>
						<p class="font-semibold">{{ formatDate(data.last_active_at) }}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="px-6 py-4 bg-gray-50">
			<p class="text-sm text-gray-600">
				Status: <span class="font-semibold capitalize">{{ data.status }}</span>
			</p>
		</div>
	</div>
</template>

<script setup>
	// import { formatDate } from "~/composables/useUtils";
	import { useDateFormatter } from "~/composables/useUtils";
	const props = defineProps({
		data: {
			type: Object,
			required: true,
		},
	});
	const { formatDate } = useDateFormatter();
	// const formatDate = (date) => {
	// 	const options = {
	// 		year: "numeric",
	// 		month: "short",
	// 		day: "numeric",
	// 		hour: "2-digit",
	// 		minute: "2-digit",
	// 		hour12: true,
	// 	};
	// 	// @ts-ignore
	// 	return new Date(date * 1000).toLocaleString("en-gb", options);
	// };
</script>
