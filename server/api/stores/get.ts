import { getVectorStore } from "~~/composables/useAssistant";

export default defineEventHandler(async (event) => {
	try {
		// get id from query
		const { id } = getQuery(event);
		// @ts-ignore
		const store = await getVectorStore(id);
		return store;
	} catch (error) {
		console.log("Get Store by ID", error);
		return {
			message: "Get Store by ID: Error" + error,
		};
	}
});
