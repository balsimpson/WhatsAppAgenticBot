import { $fetch } from "ofetch";
const BASE_URL = `https://graph.facebook.com/v20.0`;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

type MessageType = "text" | "image" | "interactive";

interface MessageOptions {
	type: MessageType;
	content: string;
	mediaId?: string;
	buttonText?: string;
}

/**
 * Sends a WhatsApp message of various types (text, image, or interactive).
 * 
 * @param recipient - The recipient's phone number
 * @param phoneNumberId - Your WhatsApp phone number ID
 * @param options - Message options including type and content
 * 
 * @example
 * // Sending a text message
 * sendWhatsAppMessage(
 *   "1234567890",
 *   "your_phone_number_id",
 *   { type: "text", content: "Hello, world!" }
 * );
 * 
 * // Sending an image message
 * sendWhatsAppMessage(
 *   "1234567890",
 *   "your_phone_number_id",
 *   { type: "image", content: "Image description", mediaId: "your_media_id" }
 * );
 * 
 * // Sending an interactive message
 * sendWhatsAppMessage(
 *   "1234567890",
 *   "your_phone_number_id",
 *   { type: "interactive", content: "Do you want to proceed?", buttonText: "Yes, proceed" }
 * );
 */
export async function sendWhatsAppMessage(
	recipient: string,
	phoneNumberId: string,
	options: MessageOptions
) {
	const { type, content, mediaId, buttonText } = options;

	let body: any;

	switch (type) {
		case "text":
			body = {
				messaging_product: "whatsapp",
				to: recipient,
				type: "text",
				text: {
					body: content,
				},
			};
			break;
		case "image":
			if (!mediaId) {
				throw new Error("Media ID is required for image messages");
			}
			body = {
				messaging_product: "whatsapp",
				to: recipient,
				type: "image",
				image: {
					id: mediaId,
				},
			};
			break;
		case "interactive":
			body = {
				messaging_product: "whatsapp",
				to: recipient,
				type: "interactive",
				interactive: {
					type: "button",
					body: {
						text: content,
					},
					action: {
						buttons: [
							{
								type: "reply",
								reply: {
									id: "proceed_button_id",
									title: buttonText || "Confirm",
								},
							},
						],
					},
				},
			};
			break;
		default:
			throw new Error("Unsupported message type");
	}

	try {
		const response = await $fetch(`${BASE_URL}/${phoneNumberId}/messages`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		return response;
	} catch (error) {
		console.error("Error sending WhatsApp message:", error);
		throw error;
	}
}

export const getMediaFromMeta = async (media_id: string) => {
	try {
		const response = await $fetch(`${BASE_URL}/${media_id}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
				"Content-Type": `application/json`,
			},
		});

		// @ts-ignore
		const res = JSON.parse(response);
		const originalUrl = res.url;
		const media = await $fetch(originalUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
			},
		});

		let blobtofile = new File([media], "mediafile.png", { type: "image/png" });

		return blobtofile;
	} catch (error) {
		console.log(error);
	}
};
