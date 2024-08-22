<template>
	<div class="flex flex-col items-center w-full max-w-4xl p-3 mx-auto">
		<!-- logs -->
		<!-- <div v-if="state.loading.logs">Loading logs...</div> -->
		<div v-if="state.error.logs">{{ state.error.logs }}</div>
		<div v-else class="w-full max-w-2xl mt-12 mb-3">
			<LogsDisplay :logs="state.data.logs" />
		</div>

		<!-- assistants -->
		<!-- <div v-if="state.loading.assistants">Loading assistants...</div> -->
		<div v-if="state.error.assistants">{{ state.error.assistants }}</div>
		<div v-else-if="state.data.assistants.length === 0">
			No assistants available. Click here to create one.
		</div>
		<div v-else class="w-full max-w-2xl mt-12 mb-3">
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
						class="px-2 py-1 text-sm text-white bg-gray-500 border rounded"
						>{{ state.data.assistants.length }}</span
					></span
				>
			</div>

			<div class="w-full max-w-2xl space-y-2 overflow-scroll h-96 snap-y">
				<LazyAssistantCard
					class="snap-start"
					v-for="assistant in state.data.assistants"
					:key="assistant"
					:id="assistant.id"
					:title="assistant.name"
					:date="assistant.created_at"
					:model="assistant.model"
					:tools="assistant.tools"
				/>
			</div>
		</div>

		<!-- <div v-if="state.loading.files">Loading files...</div> -->
		<div v-if="state.error.files">{{ state.error.files }}</div>
		<div v-else-if="state.data.files.length === 0">No files available.</div>
		<div v-else class="w-full max-w-2xl mt-12 mb-3">
			<div class="flex items-center mb-2">
				<svg
					width="1em"
					height="1em"
					viewBox="0 0 20 20"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M10.8658 18.3114C10.8691 18.3113 10.8724 18.3112 10.8758 18.311C12.3521 18.2356 13.7005 17.9703 14.7085 17.5585C15.2099 17.3536 15.6698 17.0953 16.018 16.7706C16.367 16.445 16.6666 15.9887 16.6666 15.4165V4.58317C16.6666 3.9551 16.3079 3.46939 15.9125 3.13553C15.5132 2.79841 14.9849 2.53236 14.405 2.32525C14.2591 2.27315 14.1071 2.22378 13.9496 2.17727C12.8466 1.85173 11.4703 1.6665 9.99992 1.6665C8.31943 1.6665 6.76192 1.90843 5.59485 2.32525C5.5586 2.33819 5.52256 2.35137 5.48674 2.36477C4.9494 2.56589 4.46167 2.81948 4.08737 3.13553C3.69198 3.46939 3.33325 3.9551 3.33325 4.58317V15.4165C3.33325 15.9887 3.63282 16.445 3.98186 16.7706C4.33001 17.0953 4.78992 17.3536 5.29133 17.5585C6.29937 17.9703 7.64778 18.2356 9.12407 18.311C9.13612 18.3116 9.14812 18.312 9.16007 18.3121L9.16484 18.3121C9.16647 18.3121 9.1681 18.3121 9.16973 18.3121H10.8301C10.8317 18.3121 10.8334 18.3121 10.835 18.3121L10.8658 18.3114ZM5.14387 4.74126C5.05378 4.66233 5.01838 4.6091 5.0052 4.58317C5.01926 4.55551 5.0586 4.49679 5.16262 4.40896C5.35374 4.24758 5.67969 4.06472 6.15541 3.89482C6.27343 3.85267 6.39794 3.81228 6.52847 3.77387C7.44222 3.50501 8.6514 3.33317 9.99992 3.33317C11.5411 3.33317 12.9003 3.55761 13.8444 3.89482C14.2607 4.04348 14.5623 4.20207 14.7592 4.3475C14.7873 4.36828 14.8133 4.38878 14.8372 4.40896C14.9412 4.49679 14.9806 4.55551 14.9946 4.58317C14.9806 4.61083 14.9412 4.66955 14.8372 4.75739C14.8133 4.77756 14.7873 4.79806 14.7592 4.81884C14.5623 4.96427 14.2607 5.12286 13.8444 5.27152C12.9003 5.60873 11.5411 5.83317 9.99992 5.83317C8.45875 5.83317 7.09959 5.60873 6.15541 5.27152C5.67969 5.10163 5.35374 4.91876 5.16262 4.75739L5.14387 4.74126ZM14.405 6.84109C14.611 6.76753 14.8104 6.68653 14.9999 6.59755V9.9887C14.9931 10.0059 14.9672 10.0549 14.8811 10.1352C14.7335 10.2729 14.4734 10.4375 14.0782 10.5989C13.2929 10.9197 12.1414 11.1608 10.7907 11.2298L10.7822 11.2303H9.21767L9.2091 11.2298C7.85848 11.1608 6.70689 10.9197 5.92166 10.5989C5.52643 10.4375 5.26639 10.2729 5.11874 10.1352C5.03268 10.0549 5.00669 10.0059 4.99992 9.9887V6.59755C5.18941 6.68653 5.38887 6.76753 5.59485 6.84109C6.76192 7.25791 8.31943 7.49984 9.99992 7.49984C11.6804 7.49984 13.2379 7.25791 14.405 6.84109ZM9.16007 12.9002V12.8954C9.14812 12.8953 9.13612 12.8949 9.12407 12.8943C7.64778 12.8189 6.29937 12.5536 5.29133 12.1418C5.1924 12.1014 5.09508 12.0589 4.99992 12.0142V15.4054C5.00669 15.4226 5.03268 15.4716 5.11874 15.5518C5.26639 15.6896 5.52643 15.8541 5.92166 16.0156C6.69737 16.3325 7.83061 16.5716 9.16007 16.6439V16.6422H10.8658C12.184 16.5682 13.3075 16.3304 14.0782 16.0156C14.4734 15.8541 14.7335 15.6896 14.8811 15.5518C14.9672 15.4716 14.9931 15.4226 14.9999 15.4054V12.0142C14.9048 12.0589 14.8074 12.1014 14.7085 12.1418C13.7005 12.5536 12.3521 12.8189 10.8758 12.8943L10.8658 12.8948V12.9002H9.16007Z"
						fill="currentColor"
					></path>
				</svg>
				<span class="pl-2 font-semibold"
					>Storage

					<span
						class="px-2 py-1 text-sm text-white bg-gray-500 border rounded"
						>{{ state.data.files.length }}</span
					>
				</span>
			</div>

			<div
				class="w-full max-w-2xl space-y-2 overflow-scroll h-96 snap-y snap-mandatory"
			>
				<LazyStorageCard
					v-for="file in state.data.files"
					:file="file"
					class="snap-start snap-always"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	// const assistants = useState("assistants", () => []);
	// const files = useState("files", () => []);
	// const logs = useState("allLogs", () => []);

	// onMounted(async () => {
	// 	try {
	// 		const [assistantResponse, fileResponse, logResponse] = await Promise.all([
	// 			$fetch("/api/assistants/list"),
	// 			$fetch("/api/files/list"),
	// 			$fetch("/api/logs"),
	// 		]);

	// 		assistants.value = assistantResponse;
	// 		files.value = fileResponse;
	// 		logs.value = logResponse;
	// 	} catch (error) {
	// 		console.error("Failed to fetch data:", error);
	// 	}
	// });

	const state = reactive({
		loading: {
			assistants: true,
			files: true,
			logs: true,
		},
		error: {
			assistants: null,
			files: null,
			logs: null,
		},
		data: {
			assistants: [],
			files: [],
			logs: [],
		},
	});

	onMounted(async () => {
		try {
			const assistantResponse = await $fetch("/api/assistants/list");
			state.data.assistants = assistantResponse;
		} catch (err) {
			state.error.assistants = "Failed to fetch assistants.";
		} finally {
			state.loading.assistants = false;
		}

		try {
			const fileResponse = await $fetch("/api/files/list");
			state.data.files = fileResponse;
		} catch (err) {
			state.error.files = "Failed to fetch files.";
		} finally {
			state.loading.files = false;
		}

		try {
			const logResponse = await $fetch("/api/logs");
			state.data.logs = logResponse;
		} catch (err) {
			state.error.logs = "Failed to fetch logs.";
		} finally {
			state.loading.logs = false;
		}
	});
</script>
