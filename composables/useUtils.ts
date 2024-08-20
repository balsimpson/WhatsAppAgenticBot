export const useDateFormatter = () => {
	const formatDate = (timestamp: any) => {
		const date = new Date(timestamp * 1000);
		const options = {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			// second: "2-digit",
			hour12: true,
		};
		//   @ts-ignore
		return new Intl.DateTimeFormat("en-US", options).format(date);
	};

	return {
		formatDate,
	};
};

export const formatBytes = (bytes: any) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    // @ts-ignore
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    // @ts-ignore
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};
