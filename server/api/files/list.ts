import { getStorageList } from "~~/composables/useAssistant";

export default defineEventHandler(async (event) => {
	try {
		// get id from query
		const { id } = getQuery(event);
		// @ts-ignore
		const files = await getStorageList();
		return files;
	} catch (error) {
		// @ts-ignore
		console.error("Get Files", error.message);
		throw createError({
			// @ts-ignore
			statusMessage: error.message,
		});
	}
});