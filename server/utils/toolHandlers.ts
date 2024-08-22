// import { addToDifferentSheets, searchSheets } from '~/composables/useGoogleSheets'
// import { getTmdbInfo } from '~/composables/useTmdb'
// import { getPosts } from '~/composables/useReddit'
// import { googleSearch } from '~/composables/useGoogleSearch'
// import { sendEmail } from '~/server/utils/emailHelpers'

export async function handleToolCalls(toolCalls: any[], assistantId: string) {
	return await Promise.all(
		toolCalls.map(async (tool: any) => {
			const functionArguments = JSON.parse(tool.function.arguments);
			if (tool.function.name in toolHandlers) {
				const handler = toolHandlers[tool.function.name];
				return await handler(tool, functionArguments, assistantId);
			}
		})
	);
}

const toolHandlers: { [key: string]: Function } = {
	get_movie_tvshow_details: async (
		tool: any,
		functionArguments: any,
		assistant_id: string
	) => {
		return {
			tool_call_id: tool.id,
			output: "title: The Shawshank Redemption, year: 1994, rating: 9.3",
		};
	},
	add_to_watchlist: async (
		tool: any,
		functionArguments: any,
		assistant_id: string
	) => {
		let result = await $fetch(`/api/watchlist?txt=${functionArguments.name}&assistant_id=${assistant_id}`);

		return {
			tool_call_id: tool.id,
			output: "Watchlist added",
		};
	},
	// ... other tool handlers
};
