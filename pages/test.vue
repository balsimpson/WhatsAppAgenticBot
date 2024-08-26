<template>
	<div class="flex flex-col items-center w-full max-w-4xl p-3 mx-auto">
		<!-- LOGS -->
        <!-- <div v-if="logsStatus != 'error' || logsStatus == 'success'">Logs Loading </div> -->
		<LogsDisplay v-if="logs && logs.length > 0" :logs="logs" />
		<div
			v-else-if="logs && logs.length === 0 && logsStatus != 'error'"
			class="flex items-center h-72"
		>
			No logs available.
		</div>
		<div
			v-if="logsStatus == 'error'"
			class="flex items-center max-w-md px-12 text-sm text-red-600 h-72"
		>
			{{ logsError }}
		</div>

		<!-- ASSISTANTS -->
		<div v-if="assistantsStatus != 'error'">Assistants Loading {{ assistantsStatus }}</div>
		<AssistantsDisplay v-if="assistants && assistants.length > 0" :assistants="assistants" />
		<div
			v-else-if="assistants && assistants.length === 0 && assistantsStatus != 'error'"
			class="flex items-center h-72"
		>
			No assistants available.
		</div>
		<div
			v-if="assistantsStatus == 'error'"
			class="flex items-center max-w-md px-12 text-sm text-red-600 h-72"
		>
			{{ assistantsError }}
		</div>

		<!-- FILES -->
        <div v-if="filesStatus != 'error'">Loading {{ filesStatus }}</div>
		<FilesDisplay v-if="files && files.length > 0" :files="files" />
		<div
			v-else-if="files && files.length === 0 && filesStatus != 'error'"
			class="flex items-center h-72"
		>
			No files available.
		</div>
		<div
			v-if="filesStatus == 'error'"
			class="flex items-center max-w-md px-12 text-sm text-red-600 h-72"
		>
			Files: {{ filesError }}
		</div>
	</div>
</template>

<script setup>

    const {
        status: logsStatus,
        data: logs,
        logsRefresh,
        error: logsError
    } = useLazyAsyncData("logs", () => $fetch("/api/logs"));

	const {
		status: assistantsStatus,
		data: assistants,
		assistantsRefresh,
        error: assistantsError
	} = useLazyAsyncData("assistants", () => $fetch("/api/assistants/list"));

	const {
		status: filesStatus,
		data: files,
		filesRefresh,
        error: filesError
	} = useLazyAsyncData("files", () => $fetch("/api/files/list"));
    
    
</script>
