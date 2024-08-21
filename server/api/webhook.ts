import {
	isSubscriptionRequest,
	handleSubscription,
	processWebhookBody,
} from "~/server/utils/webhookHelpers";
import { addLogEntry } from "~/server/utils/assistantHelpers";
import { serverEvents } from '~/server/utils/eventEmitter'

export default defineEventHandler(async (event: any) => {
	try {
		const query = getQuery(event);

		serverEvents.emit('newEvent', { message: 'Something happened on the server!' })
		
		if (Object.keys(query).length > 0 && isSubscriptionRequest(query)) {
			return handleSubscription(query);
		}

		// If no query params or not a subscription request, process the message
		const body = await readBody(event);
		// console.log("body: ", body);

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
