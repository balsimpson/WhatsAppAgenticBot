import OpenAI from "openai";

export const initializeOpenAI = () => {
	const config = useRuntimeConfig();
	const openai = new OpenAI({
		apiKey: config.public.OPENAI_KEY,
	});
	// @ts-ignore
	return openai;
};

// get list of assistants
export const getAssistantsList = async () => {
	try {
		const openai = initializeOpenAI();
		const assistants = await openai.beta.assistants.list();
		return assistants.data || [];
	} catch (error) {
		console.error("Error fetching assistants:", error);
		return [];
	}
};

// get the assistant with an id
export const getAssistant = async (id: string) => {
	const openai = initializeOpenAI();
	const assistant = await openai.beta.assistants.retrieve(id);
	return assistant;
};

// get list of files in storage
export const getStorageList = async () => {
	const openai = initializeOpenAI();
	const files = await openai.files.list();
	return files.data || [];
};

// get file with id
export const getFile = async (id: string) => {
	const openai = initializeOpenAI();
	const file = await openai.files.retrieve(id);
	return file;
}

// get list of vector stores
export const getVectorStores = async () => {
	const openai = initializeOpenAI();
	const stores = await openai.beta.vectorStores.list();
	return stores.data || [];
};

// get vector store specified by id
export const getVectorStore = async (id: string) => {
	try {
		const openai = initializeOpenAI();
		const store = await openai.beta.vectorStores.retrieve(id);
		return store;
	} catch (error) {
		console.error("Error fetching vector store:", error);
		return null;
	}
};
