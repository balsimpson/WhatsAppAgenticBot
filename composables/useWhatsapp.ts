import Configuration from "openai";
import OpenAIApi from "openai";
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const OPENAI_KEY = process.env.OPENAI_KEY;

const BASE_URL = "https://graph.facebook.com/v20.0";

export const sendWhatsAppMessage = async (msg: any, from: any, id: any, messageType: string = 'text', mediaId?: string) => {
    console.log("msg", msg);

    let body: any;

    switch (messageType) {
        case 'text':
            body = {
                messaging_product: "whatsapp",
                to: from,
                type: "text",
                text: {
                    body: msg,
                },
            };
            break;
        case 'image':
            if (!mediaId) {
                throw new Error("Media ID is required for image messages");
            }
            body = {
                messaging_product: "whatsapp",
                to: from,
                type: "image",
                image: {
                    id: mediaId,
                },
            };
            break;
        case 'interactive':
            body = {
                messaging_product: "whatsapp",
                to: from,
                type: "interactive",
                interactive: {
                    type: "button",
                    body: {
                        text: msg,
                    },
                    action: {
                        buttons: [
                            {
                                type: "reply",
                                reply: {
                                    id: "proceed_button_id",
                                    title: "Confirm",
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
        const response = await $fetch(`${BASE_URL}/${id}/messages`, {
            method: "POST",
            body: body,
            headers: {
                Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                "Content-Type": `application/json`,
            },
        });
        return response;
    } catch (error) {
        console.log("sendWhatsAppMessage", error);
        return error;
    }
};

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

		const configuration = new Configuration({
			apiKey: OPENAI_KEY,
		});
		// @ts-ignore
		const openai = new OpenAIApi(configuration);
		const file = await openai.files.create({
			// @ts-ignore
			file: blobtofile,
			purpose: "vision",
		});
		return file;
	} catch (error) {
		console.log(error);
	}
};
