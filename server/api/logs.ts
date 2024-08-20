export default defineEventHandler(async (event) => {
	try {
		const storage = useStorage("data");
		const logs = (await storage.getItem("logs")) || [];
		console.log("logs", logs);

		return logs;
	} catch (error) {
		console.log("Logs error: ", error);
		return {
			message: "Logs-Error: " + error,
		};
	}
});
