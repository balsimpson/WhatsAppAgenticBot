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
		console.error("Fetching assistants:", error);
		throw createError({
			// statusCode: 401,
			// @ts-ignore
			statusMessage: error.message,
		});
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
};

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

// add file to vector store
export const addFileToVectorStore = async (
	file_id: string,
	vectore_store_id: string
) => {
	try {
		const openai = initializeOpenAI();

		return await openai.beta.vectorStores.files.create(vectore_store_id, {
			file_id: file_id,
		});
	} catch (error) {
		console.log("addFileToVectorStore", error);
		return error;
	}
};

// upload file to storage
export const uploadFile = async (file: any) => {
	try {
		const openai = initializeOpenAI();

		// upload file to openai
		return await openai.files.create({
			file: file,
			purpose: "assistants",
		});
	} catch (error) {
		console.log("uploadFile", error);
		return error;
	}
};

// delete file from storage and vector store
export const deleteFile = async (file_id: string, vectore_store_id: string) => {
	const openai = initializeOpenAI();

	try {
		// delete file from vectorstore
		await openai.beta.vectorStores.files.del(vectore_store_id, file_id);
		// delete file from storage
		await openai.files.del(file_id);

		return true;
	} catch (error) {
		console.log("deleteFile", error);
		return error;
	}
};
