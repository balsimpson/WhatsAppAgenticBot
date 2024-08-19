import { getAssistant } from "~~/composables/useAssistant";

export default defineEventHandler(async (event) => {
	try {
        const id = event.context.params?.id
        // @ts-ignore
		const assistant = await getAssistant(id);
		return assistant;
	} catch (error) {
		console.log("Assistants list error: ", error);
		return {
			message: "Assistants-Error: " + error,
		};
	}
});