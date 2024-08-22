import {
	isSubscriptionRequest,
	handleSubscription,
	processWebhookBody,
} from "~/server/utils/webhookHelpers";
import { addLogEntry } from "~/server/utils/assistantHelpers";


export default defineEventHandler(async (event: any) => {
	
	try {
		const query = getQuery(event);

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
			// @ts-ignore
			content: `${error.statusCode}: ${error.message}`,
		});
		return { error: "An error occurred processing the request" + JSON.stringify(error) };
	}
});
