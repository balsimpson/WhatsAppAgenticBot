import OpenAI from "openai";
import { getAssistant } from "./assistantConfig";
import { handleToolCalls } from "./toolHandlers";

const OPENAI_KEY = process.env.OPENAI_KEY;

// Initialize OpenAI client
const openai = new OpenAI({
	apiKey: OPENAI_KEY,
});

export async function getAssistantResponse(prompt: any, user: string) {
	console.log(`${user}: `, prompt);
	const storage = useStorage("data");
	let threadId = (await storage.getItem(user)) || "";
	let thread = threadId
		? //   @ts-ignore
		  await openai.beta.threads.retrieve(threadId)
		: await createNewThread(storage, user);

	// Check and handle pending runs
	await handlePendingRuns(thread.id);

	const message = await openai.beta.threads.messages.create(thread.id, {
		role: "user",
		content: prompt,
	});

	const assistant = await getAssistant(user);
	console.log("assistant", assistant);

	let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
		assistant_id: assistant.id,
		//instructions: `${assistant.instructions} Address user as ${user}.`,
	});

	console.log("run", run);

	// run = await openai.beta.threads.runs.retrieve(thread.id, run.id);

	return await handleRunStatus(run, thread);
}

async function createNewThread(storage: any, user: string) {
	console.log("creating new thread");
	
	const newThread = await openai.beta.threads.create();
	await storage.setItem(user, newThread.id);
	return newThread;
}

async function handlePendingRuns(threadId: string) {
	const runs = await openai.beta.threads.runs.list(threadId);

	if (runs && runs?.data.length > 0) {

		for (const run of runs.data) {
			if (run.status != "completed") {
				let run_id = run.id;
				let res = await openai.beta.threads.runs.cancel(threadId, run_id);
				console.log("cancel run", res);
			}
		}
		// runs.data.forEach(async (run: any) => {
		// 	if (run.status != "completed") {
		// 		let run_id = run.id;
		// 		let res = await openai.beta.threads.runs.cancel(threadId, run_id);
		// 		console.log("cancel run", res);
		// 	}
		// });
	}

	return true;
}

// @ts-ignore
async function handleRunStatus(
	run: OpenAI.Beta.Threads.Runs.Run,
	thread: OpenAI.Beta.Thread
) {
	while (run.status === "in_progress" || run.status === "queued") {
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
		run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
	}

	if (run.status === "completed") {
		const messages = await openai.beta.threads.messages.list(run.thread_id);

		console.log("messages", messages);

		for (const message of messages.data) {
			console.log("message", message);

			if (message.role == "assistant") {
				//@ts-ignore
				console.log("messageTxt", message.content[0].text.value);
				
				//@ts-ignore
				return convertToWhatsAppMarkdown(message.content[0].text.value);
			}
		}
	} else if (run.status === "requires_action") {
		return await handleRequiresAction(run, thread);
	} else {
		console.error("Run did not complete:", run);
		return "Oops! I got no reply.";
	}
}

// @ts-ignore
async function handleRequiresAction(
	run: OpenAI.Beta.Threads.Runs.Run,
	thread: OpenAI.Beta.Thread
) {
	if (run.required_action?.submit_tool_outputs?.tool_calls) {
		const toolOutputs = await handleToolCalls(
			run.required_action.submit_tool_outputs.tool_calls
		);
		run = await openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
			tool_outputs: toolOutputs,
		});
		return await handleRunStatus(run, thread);
	}
}

function convertToWhatsAppMarkdown(text: string) {
	// Convert bold text
	text = text.replace(/\*\*(.*?)\*\*/g, "*$1*");
	// Convert italic text
	text = text.replace(/\*(.*?)\*/g, "_$1_");
	// Convert monospace text
	text = text.replace(/```(.*?)```/gs, "```$1```");

	return text;
}
