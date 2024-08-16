const assistants = {
	help: {
		id: "asst_G4RErXXXXXXXXXXX",
		instructions:
			"You're a helpful research assistant. For all questions, use the information of the uploaded files as context.",
	},
	// ... other assistants
};

/**
 *
 * @param user stored user name
 * @returns object {id: string, instructions: string}
 */
export async function getAssistant(user: string) {
	const lowerCaseUser = user.toLowerCase();

	// check useStorage
	const storage = useStorage("data");
	const assistant = await storage.getItem("assistant");

	if (assistant) {
		return assistant;
	} else {
		return assistants["help"];
	}
}
