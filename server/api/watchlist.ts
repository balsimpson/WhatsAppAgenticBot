import {
	deleteFile,
	uploadFile,
	getAssistant,
	addFileToVectorStore,
} from "~~/composables/useAssistant";
import { addLogEntry } from "~/server/utils/assistantHelpers";

const FILE_NAME = "watchlist.txt";

/**
 * Updates the user's watchlist by appending new content, creating a new file,
 * and storing it both in storage and the vector store. Deletes the old file if necessary.
 *
 * @param {Object} event - The event object containing request details.
 * @param {string} event.query.txt - The text to be added to the watchlist.
 * @param {string} event.query.assistant_id - The ID of the assistant associated with the vector store.
 *
 * @returns {boolean|Error} - Returns true if the operation was successful, otherwise returns the error.
 *
 * @throws {Error} - Throws an error if there is any issue updating the watchlist,
 * deleting the old file, or adding the new file to the vector store.
 */
// export default defineEventHandler(async (event) => {
// 	try {
// 		const { txt, assistant_id } = getQuery(event);

// 		// get watchlist file_id from useStorage
// 		const kvstorage = useStorage("data");
// 		const file_id = await kvstorage.getItem("file_id");

// 		// get contents of watchlist file from useStorage
// 		// @ts-ignore
// 		const fileContent = (await kvstorage.getItem("watchlist")) || "";
// 		// add new text to content
// 		const newContent = fileContent + "\n" + txt;

// 		// create a txt file
// 		const createdFile = await $fetch("/api/files/create", {
// 			method: "POST",
// 			body: {
// 				filename: FILE_NAME,
// 				content: newContent,
// 			},
// 		});

// 		// Convert the text into a Blob
// 		// @ts-ignore
// 		const blob = new Blob([createdFile], { type: "text/plain" });
// 		const newFile = new File([blob], FILE_NAME, { type: "text/plain" });

// 		// get vectore store id
// 		// @ts-ignore
// 		const assistant = await getAssistant(assistant_id);
// 		// extract vector store id if present
// 		const vector_store_id =
// 			// @ts-ignore
// 			assistant.tool_resources?.file_search?.vector_store_ids[0];

// 		// if file_id delete old file from storage and vector store
// 		if (file_id && vector_store_id) {
// 			// @ts-ignore
// 			await deleteFile(file_id, vector_store_id);
// 		}

// 		// upload new file to storage
// 		const result = await uploadFile(newFile);

// 		// add file to vector store
// 		// @ts-ignore
// 		await addFileToVectorStore(result.id, vector_store_id);

// 		// update file_id in useStorage
//         // @ts-ignore
// 		await kvstorage.setItem("file_id", result.id);

// 		await addLogEntry({
// 			type: "requires_action",
// 			content: "Watchlist updated: : " + txt,
// 		});

//         return true;
// 	} catch (error) {
//         console.log("Watchlist Error:", error);
// 		return error;
//     }
// });
export default defineEventHandler(async (event) => {
	try {
		const { txt, assistant_id } = getQuery(event);
		const kvstorage = useStorage("data");

		// Step 1: Retrieve existing file content and file ID
		const [fileContent, file_id] = await Promise.all([
			kvstorage.getItem("watchlist") || "",
			kvstorage.getItem("file_id"),
		]);
		console.log("fileContent:", fileContent);
		console.log("file_id:", file_id);

		// Step 2: Append new text to the content
		const newContent = `${fileContent}\n${txt}`;
		console.log("Watchlist content:", newContent);
		
		const createdFile = await createTextFile(newContent, FILE_NAME);

		// Step 3: Convert to Blob and File
		const newFile = textToFile(createdFile, FILE_NAME);

		// Step 4: Handle vector store operations
		// @ts-ignore
		const vector_store_id = await getVectorStoreId(assistant_id);

		// If file_id exists, delete old file
		if (file_id && vector_store_id) {
			// @ts-ignore
			await deleteFile(file_id, vector_store_id);
		}

		// Step 5: Upload new file and update storage
		const result = await uploadFile(newFile);
		// @ts-ignore
		await updateStorage(kvstorage, result.id);

		// Step 6: Add new file to the vector store
		if (vector_store_id) {
			// @ts-ignore
			await addFileToVectorStore(result.id, vector_store_id);
		} else {
			await addLogEntry({
				type: "error",
				content: `No vector store found. Create a vector store and attach it to the assistant - ${assistant_id}`,
			});
			throw createError({
				statusCode: 500,
				statusMessage:
					"No vector store found. Create a vector store and attach it to the assistant.",
			});
		}

		// Step 7: Log the action
		// @ts-ignore
		await logWatchlistUpdate(txt);

		return true;
	} catch (error) {
		console.error("Watchlist Error:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Could not update watchlist",
		});
	}
});

// Utility Functions
async function createTextFile(content: string, filename: string) {
	return $fetch("/api/files/create", {
		method: "POST",
		body: { filename, content },
	});
}

function textToFile(text: string, filename: string) {
	const blob = new Blob([text], { type: "text/plain" });
	return new File([blob], filename, { type: "text/plain" });
}

async function getVectorStoreId(assistant_id: string) {
	const assistant = await getAssistant(assistant_id);
	// @ts-ignore
	return assistant.tool_resources?.file_search?.vector_store_ids[0];
}

async function updateStorage(kvstorage: any, newFileId: string) {
	await kvstorage.setItem("file_id", newFileId);
}

async function logWatchlistUpdate(txt: string) {
	await addLogEntry({
		type: "requires_action",
		content: `Watchlist updated: ${txt}`,
	});
}
