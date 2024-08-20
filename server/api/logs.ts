export default defineEventHandler(async (event) => {
	try {
        const storage = useStorage("data");
        const logs = await storage.getItem("logs") || [];

		return logs;
	} catch (error) {
		console.log("Logs error: ", error);
		return {
			message: "Logs-Error: " + error,
		};
	}
});