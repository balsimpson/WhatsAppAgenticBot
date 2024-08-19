import { getStorageList } from "~~/composables/useAssistant";

export default defineEventHandler(async (event) => {
	try {
		// get id from query
		const { id } = getQuery(event);
		// @ts-ignore
		const files = await getStorageList();
		return files;
	} catch (error) {
		console.log("Get Files", error);
		return {
			message: "Get files: Error" + error,
		};
	}
});