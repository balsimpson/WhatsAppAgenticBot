<template>
	<div class="flex flex-col items-center w-full max-w-4xl p-3 mx-auto">
		<!-- LOGS -->
		<LogsDisplay v-if="logs.length > 0" :logs="logs" />
		<div
			v-else-if="logs.length === 0 && !state.loading.logs"
			class="flex items-center h-72"
		>
			No logs available.
		</div>
		<div v-else class="flex items-center h-72">
			{{ state.loading.logs ? "Loading.." : state.error.logs }}.
		</div>

		<!-- ASSISTANTS -->
		<AssistantsDisplay v-if="assistants.length > 0" :assistants="assistants" />
		<!-- <div
			v-else-if="assistants.length === 0 && !state.loading.assistants"
			class="flex items-center h-72"
		>
			No assistants available.
		</div> -->
		<div v-else class="flex items-center max-w-md px-12 text-sm text-red-600 h-72">
			{{ state.loading.assistants ? "Loading.." : state.error.assistants }}
		</div>

		<!-- FILES -->
		<FilesDisplay v-if="files.length > 0" :files="files" />
		<!-- <div
			v-else-if="files.length === 0 && !state.loading.files"
			class="flex items-center h-72"
		>
			No files available.
		</div> -->
		<div v-else class="flex items-center max-w-md px-12 text-sm text-red-600 h-72">
			{{ state.loading.files ? "Loading.." : state.error.files }}.
		</div>
	</div>
</template>

<script setup>
	const assistants = useState("assistants", () => []);
	const files = useState("files", () => []);
	const logs = useState("logs", () => []);

	const state = reactive({
		loading: {
			assistants: true,
			files: true,
			logs: true,
		},
		error: {
			assistants: "",
			files: "",
			logs: "",
		},
	});

	onMounted(async () => {
		try {
			const assistantResponse = await $fetch("/api/assistants/list");
			assistants.value = assistantResponse;
		} catch (err) {
			console.error(JSON.stringify(err));
			state.error.assistants = err.message;
		} finally {
			state.loading.assistants = false;
		}

		try {
			const fileResponse = await $fetch("/api/files/list");
			files.value = fileResponse;
		} catch (err) {
			state.error.files = err.message;
		} finally {
			state.loading.files = false;
		}

		try {
			const logResponse = await $fetch("/api/logs");
			logs.value = logResponse;
		} catch (err) {
			state.error.logs = "Failed to fetch logs.";
		} finally {
			state.loading.logs = false;
		}
	});
</script>
