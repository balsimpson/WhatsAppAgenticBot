import {
	deleteFile,
	uploadFile,
	getAssistant,
	addFileToVectorStore,
} from "~~/composables/useAssistant";

const MEMORY_FILE_NAME = "memory.txt";

export default defineEventHandler(async (event) => {
	try {
		const { txt, assistant_id } = getQuery(event);

		// get memory file_id from useStorage
		const kvstorage = useStorage("data");
		const file_id = await kvstorage.getItem("file_id");

		// get contents of memory file from useStorage
		// @ts-ignore
		const fileContent = (await kvstorage.getItem("memory")) || "";
		// add new text to content
		const newContent = fileContent + "\n" + txt;

		// create a txt file
		const createdFile = await $fetch("/api/files/create", {
			method: "POST",
			body: {
				filename: MEMORY_FILE_NAME,
				content: newContent,
			},
		});

		// Convert the text into a Blob
		// @ts-ignore
		const blob = new Blob([createdFile], { type: "text/plain" });
		const newFile = new File([blob], MEMORY_FILE_NAME, { type: "text/plain" });

		// get vectore store id
		// @ts-ignore
		const assistant = await getAssistant(assistant_id);
		// extract vector store id if present
		const vector_store_id =
			// @ts-ignore
			assistant.tool_resources?.file_search?.vector_store_ids[0];

		// if file_id delete old file from storage and vector store
		if (file_id && vector_store_id) {
			// @ts-ignore
			await deleteFile(file_id, assistant_id);
		}

		// upload new file to storage
		const result = await uploadFile(newFile);

		// add file to vector store
		// @ts-ignore
		await addFileToVectorStore(result.id, vector_store_id);

		// update file_id in useStorage
        // @ts-ignore
		await kvstorage.setItem("file_id", result.id);

        return true;
	} catch (error) {
        console.log("Memory Error:", error);
		return JSON.stringify(error);
    }
});
