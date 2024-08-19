<template>
	<div class="w-full max-w-2xl p-3 mx-auto mt-12">
		<div>{{ file }}</div>
	</div>
</template>

<script setup>
	import { useRoute } from "vue-router";
	// import { formatDate } from "~/composables/useUtils";
	import { useDateFormatter } from "~/composables/useUtils";

	definePageMeta({
		layout: "default",
	});

	const { formatDate } = useDateFormatter();
	const route = useRoute();
	const id = route.params.id;

    const {
		data: file,
		pending,
		error,
	} = await useAsyncData("file", () => $fetch(`/api/files/${id}`));
</script>
