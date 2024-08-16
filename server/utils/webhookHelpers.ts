import { sendWhatsAppMessage } from "./whatsappServerUtils";
import { getAssistantResponse } from "./assistantHelpers";

export function isSubscriptionRequest(query: any): boolean {
	return query["hub.mode"] === "subscribe";
}

export function handleSubscription(query: any): string | undefined {
	const challenge = query["hub.challenge"];
	console.log("challenge", challenge);
	return challenge;
}

export async function processWebhookBody(body: any) {
	
	if (body.entry[0].changes[0].value.statuses) {
		console.log("status: ", body.entry[0].changes[0].value.statuses[0].status);
		return { statusCode: 200, body: "ok" };
	}
	
	const { user, phone_number_id, from, msg_body } = getMsg(body) as {
		user: string;
		phone_number_id: string;
		from: string;
		msg_body: string;
	};
	
	console.log("msg_body", JSON.stringify(msg_body));
	const messageType = body.entry[0].changes[0].value.messages[0].type;
	console.log("messageType", messageType);
	

	switch (messageType) {
		case "image":
		// return await handleImageMessage(body, user, from, phone_number_id);
		case "text":
			let reply = await getAssistantResponse(msg_body, user);
			console.log("reply", from, phone_number_id, reply);
			return await sendWhatsAppMessage(from, phone_number_id, {
				type: "text",
				content: reply,
			});
		case "document":
		// return await handleDocumentMessage(body, from, phone_number_id);
		case "interactive":
		// return await handleInteractiveMessage(msg_body, from, phone_number_id);
		default:
			return await sendWhatsAppMessage(from, phone_number_id, {
				type: "text",
				content: "Sorry, something went wrong. Please try again.",
			});
	}
}

// Implement handleImageMessage, handleTextMessage, handleDocumentMessage, handleInteractiveMessage here
// ...

function getMsg(body: any) {
	try {
		let phone_number_id =
			body.entry[0].changes[0].value.metadata.phone_number_id || "";
		let from = "";
		let msg_body = "";
		let user = body.entry[0].changes[0].value.contacts[0].profile.name || "";

		if (
			body.entry[0].changes[0].value &&
			body.entry[0].changes[0].value.messages[0]
		) {
			from = body.entry[0].changes[0].value.messages[0].from || ""; // extract the phone number from the webhook payload
			msg_body = body.entry[0].changes[0].value?.messages[0]?.text?.body || "";
		}

		return { user, phone_number_id, from, msg_body };
	} catch (error) {
		return error;
	}
}
