import { getFile } from "~~/composables/useAssistant";

export default defineEventHandler(async (event) => {
	try {
        const id = event.context.params?.id
        // @ts-ignore
		const file = await getFile(id);
		return file;
	} catch (error) {
		console.log("Get-file-error: ", error);
		return {
			message: "Get-file-Error: " + error,
		};
	}
});