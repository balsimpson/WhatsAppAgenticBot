import { sendWhatsAppMessage } from "~~/composables/useWhatsapp";

export default defineEventHandler(async (event) => {
	try {
        const { msg, from, id } = await readBody(event);
        // @ts-ignore
		const reply = await sendWhatsAppMessage(msg, from, id);
		return reply;
	} catch (error) {
		console.log("Assistants list error: ", error);
		return {
			message: "Assistants-Error: " + error,
		};
	}
});