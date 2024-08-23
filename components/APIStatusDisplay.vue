<template>
	<div class="flex items-center">
		<div class="flex items-center pr-3 group">
			<div
				:class="`w-3 h-3 ml-2 rounded-full ring-2 ring-gray-400 ring-offset-1  ${
					status
						? 'bg-green-500 group-hover:bg-green-600'
						: 'bg-red-500 group-hover:bg-red-600'
				}`"
			></div>

			<div class="text-[10px] leading-3 pl-2">
				<div
					:class="`font-medium ${status ? 'text-gray-700' : 'text-red-600'}`"
				>
					{{ title }}
				</div>
				<div
					:class="`font-medium ${status ? 'text-green-700' : 'text-red-600'}`"
				>
					{{ status ? "Connected" : "Not Connected" }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps(["title", "status"]);
</script>
