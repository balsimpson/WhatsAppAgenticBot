import {
	isSubscriptionRequest,
	handleSubscription,
	processWebhookBody,
} from "~/server/utils/webhookHelpers";

export default defineEventHandler(async (event: any) => {
	try {
		const query = getQuery(event);

		if (Object.keys(query).length > 0 && isSubscriptionRequest(query)) {
			return handleSubscription(query);
		}

		// If no query params or not a subscription request, process the message
		const body = await readBody(event);
		const res = await processWebhookBody(body);

		console.log("response: ", res);
		return res;
	} catch (error) {
		console.error(error);
		return { error: "An error occurred processing the request" };
	}
});
