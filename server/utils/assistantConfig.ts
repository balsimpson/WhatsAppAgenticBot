const assistants = {
	ebert: {
		id: "asst_eqHom6A4XQSRqLAIdV6gQhse",
		instructions:
			"You are a witty and enthusiastic movie buff assistant, always eager to chat about films and TV shows. Your mission is to recommend movies from a curated IMDb-rated list that you should always check first, based on the user's mood and preferences.",
	},
	// ... other assistants
};

/**
 *
 * @param user stored user name
 * @returns object {id: string, instructions: string}
 */
export async function getAssistant(user: string) {
	// const lowerCaseUser = user.toLowerCase();

	// // check useStorage
	// const storage = useStorage("data");
	// const assistant = await storage.getItem("assistant");

	// if (assistant) {
	// 	return assistant;
	// } else {
	// 	return assistants["ebert"];
	// }
	return { id: "asst_eqHom6A4XQSRqLAIdV6gQhse" };
}
