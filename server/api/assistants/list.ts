import { getAssistantsList } from "~~/composables/useAssistant";

export default defineEventHandler(async (event) => {
	try {
		const assistants = await getAssistantsList();
		return assistants;
	} catch (error) {
		// @ts-ignore
		console.log("Assistants list error: ", error.message);
		throw createError({
			// @ts-ignore
			statusMessage: error.message,
		});
	}
});