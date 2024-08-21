import {
	isSubscriptionRequest,
	handleSubscription,
	processWebhookBody,
} from "~/server/utils/webhookHelpers";
import { addLogEntry } from "~/server/utils/assistantHelpers";
import { eventEmitter } from "../utils/eventEmitter";

export default defineEventHandler(async (event: any) => {
	try {
		const query = getQuery(event);
		// Emit the event when webhook is called
		eventEmitter.emit("newEvent", "Webhook triggered");

		if (Object.keys(query).length > 0 && isSubscriptionRequest(query)) {
			return handleSubscription(query);
		}

		// If no query params or not a subscription request, process the message
		const body = await readBody(event);
		// console.log("body: ", body);

		// Emit the event when webhook is called
		eventEmitter.emit("newEvent", "Webhook triggered");

		const res = await processWebhookBody(body);

		// console.log("response: ", res);
		return res;
	} catch (error) {
		console.error(error);
		await addLogEntry({
			type: "error",
			content: JSON.stringify(error),
		});
		return { error: "An error occurred processing the request" };
	}
});
