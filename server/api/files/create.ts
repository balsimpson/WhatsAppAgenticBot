/**
 * Handler to create and send a text file as a response based on the provided content.
 *
 * This function reads the content and filename from the incoming request body,
 * sets the appropriate headers for file download, and returns the content as a text file.
 * If any error occurs during the process, it throws a 500 error with a relevant message.
 *
 * @param {Object} event - The event object containing request details.
 * @param {string} event.body.content - The content to be saved in the file.
 * @param {string} event.body.filename - The name of the file to be created.
 * @returns {String} - The content to be sent as a file download.
 * @throws {Error} - Throws an error if the file creation fails.
 */
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
		});
	}
});
