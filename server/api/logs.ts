export default defineEventHandler(async (event) => {
	try {
		const storage = useStorage("data");
		const logs = (await storage.getItem("logs")) || [];
		// Reverse sort the array by index
        // @ts-ignore
		logs.sort((a, b, indexA, indexB) => indexB - indexA);
		return logs;
	} catch (error) {
		console.log("Logs error: ", error);
		return {
			message: "Logs-Error: " + error,
		};
	}
});
