export default defineEventHandler(async (event) => {
	try {
		const { content, filename } = await readBody(event);
		const data = content;

		// Set headers
		setHeader(event, "Content-Disposition", `attachment; filename=${filename}`);
		setHeader(event, "Content-Type", "text/plain");

		// Send the response
		return data;
	} catch (error) {
        console.error("File create Error: ", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Could not create file",
        })
    }
});
