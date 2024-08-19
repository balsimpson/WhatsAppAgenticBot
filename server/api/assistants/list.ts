import { getAssistantsList } from "~~/composables/useAssistant";

export default defineEventHandler(async (event) => {
	try {
		const assistants = await getAssistantsList();
		return assistants;
	} catch (error) {
		console.log("Assistants list error: ", error);
		return {
			message: "Assistants-Error: " + error,
		};
	}
});