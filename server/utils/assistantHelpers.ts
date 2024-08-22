import OpenAI from "openai";
import { getAssistant } from "./assistantConfig";
import { handleToolCalls } from "./toolHandlers";
import { allLogs } from "~/composables/useStates";

const OPENAI_KEY = process.env.OPENAI_KEY;

// Initialize OpenAI client
const openai = new OpenAI({
	apiKey: OPENAI_KEY,
});

export async function getAssistantResponse(prompt: any, user: string) {
	console.log(`${user}: `, prompt);
	const storage = useStorage("data");

	// Log user prompt
	await addLogEntry({ type: "user", user, content: prompt });

	let threadId: string = (await storage.getItem(user)) || "";
	let thread = await getThread(threadId);

	// Check and handle pending runs
	await handlePendingRuns(thread?.id);

	const message = await openai.beta.threads.messages.create(thread.id, {
		role: "user",
		content: prompt,
	});

	const assistant = await getAssistant(user);
	console.log("assistant_id", assistant.id);

	let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
		assistant_id: assistant.id,
		//instructions: `${assistant.instructions} Address user as ${user}.`,
	});

	return await handleRunStatus(run, thread);

	async function getThread(thread_id: string) {
		let thread_data: any;
		if (thread_id) {
			// @ts-ignore
			thread_data = await openai.beta.threads.retrieve(thread_id);
			const lastUpdateTimestamp = new Date(thread_data.created_at);

			//@ts-ignore
			if (Date.now() - lastUpdateTimestamp.getTime() * 1000 > 15 * 60 * 1000) {
				// If it was, create a new thread
				const newThread = await openai.beta.threads.create();
				thread_id = newThread.id;
				thread_data = newThread;
				// Update the thread_id in the KV store
				await storage.setItem(user, thread_data.id);
				//console.log("save", res);
			}
		} else {
			// console.log("no thread", user);
			const newThread = await openai.beta.threads.create();
			thread_id = newThread.id;
			thread_data = newThread;
			// Save the new thread_id in the KV store
			await storage.setItem(user, thread.id);
		}
		return thread_data;
	}
}

// Helper function to add a log entry
export async function addLogEntry(entry: any) {

	// const logsState = useState<string[]>('logs', () => []);

	const storage = useStorage("data");
	const logs = (await storage.getItem("logs")) || [];

	const now = new Date();
	entry.timestamp = now.toISOString();

	// @ts-ignore
	if (logs.length >= 15) {
		// @ts-ignore
		logs.pop();
	}
	// @ts-ignore
	logs.unshift(entry);
	
	// update useState
	// @ts-ignore
	allLogs.value = logs;
	
	// @ts-ignore
	console.log("allLogs", allLogs.value);

	await storage.setItem("logs", logs);
}

async function handlePendingRuns(threadId: string) {
	try {
		const runs = await openai.beta.threads.runs.list(threadId);

		if (runs && runs?.data.length > 0) {
			for (const run of runs.data) {
				if (run.status != "completed") {
					let run_id = run.id;
					let res = await openai.beta.threads.runs.cancel(threadId, run_id);
					console.log("cancel run", res);
				}
			}
		}

		return true;
	} catch (error) {
		console.error("Error handling pending runs:", error);
		return false;
	}
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

		// console.log("messages", messages.data);

		for (const message of messages.data) {
			//@ts-ignore
			// console.log("message", message.content[0].text.value);

			if (message.role == "assistant") {
				//@ts-ignore
				await addLogEntry({
					type: "assistant",
					//@ts-ignore
					content: message.content[0]?.text?.value,
				});
				//@ts-ignore
				return convertToWhatsAppMarkdown(message.content[0].text.value);
			}
		}
	} else if (run.status === "requires_action") {
		let functionName =
			run.required_action?.submit_tool_outputs.tool_calls[0].function.name;

		//@ts-ignore
		await addLogEntry({
			type: "requires_action",
			content: "Calling function: " + functionName,
		});
		console.log(
			"Run requires action:",
			run.required_action?.submit_tool_outputs.tool_calls[0].function.name
		);
		return await handleRequiresAction(run, thread);
	} else {
		await addLogEntry({
			type: "error",
			user: "",
			content: "Run did not complete:" + JSON.stringify(run),
		});

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
			run.required_action.submit_tool_outputs.tool_calls,
			run.assistant_id
		);
		run = await openai.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
			tool_outputs: toolOutputs,
		});
		return await handleRunStatus(run, thread);
	}
}

function convertToWhatsAppMarkdown(text: string) {
	// Convert monospace text (must come first)
	text = text.replace(/```(.*?)```/gs, "```$1```");

	// Convert bold text
	text = text.replace(/\*\*(.*?)\*\*/g, "*$1*");

	// Convert italic text
	text = text.replace(/(?<!\*)\*(?!\*)(.*?)\*(?<!\*)/g, "_$1_");

	return text;
}
