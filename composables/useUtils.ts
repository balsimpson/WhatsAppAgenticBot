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

export const getRelativeTime = (timestamp: string | number | Date) => {
	const date = new Date(timestamp);

	const formatter = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
	const diff = Date.now() - date.getTime();

	const seconds = Math.round(diff / 1000);
	const minutes = Math.round(seconds / 60);
	const hours = Math.round(minutes / 60);
	const days = Math.round(hours / 24);

	if (days >= 7) {
		return date.toLocaleDateString("en-US", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	} else if (days >= 1) {
		return formatter.format(-days, "day");
	} else if (hours >= 1) {
		return formatter.format(-hours, "hour");
	} else if (minutes >= 1) {
		return formatter.format(-minutes, "minute");
	} else {
		return formatter.format(-seconds, "second");
	}
};

export function useTimeAgo(timestamp: any) {
	const timeAgo = ref("");

	// Update the timeAgo value every second
	const timer = setInterval(() => {
		updateTimeAgo(timestamp);
	}, 1000);

	function updateTimeAgo(timestamp: any) {
		const now = new Date().getTime();
		const difference = now - new Date(timestamp).getTime();

		const seconds = Math.floor(difference / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		if (seconds < 60) {
			timeAgo.value = `${seconds} seconds ago`;
		} else if (minutes < 60) {
			timeAgo.value = `${minutes} minutes ago`;
		} else if (hours < 24) {
			timeAgo.value = `${hours} hours ago`;
		} else if (days < 30) {
			timeAgo.value = `${days} days ago`;
		} else if (months < 12) {
			timeAgo.value = `${months} months ago`;
		} else {
			timeAgo.value = `${years} years ago`;
		}
	}

	return { timeAgo };
}

let intervalId: any = null;
export const handlePolling = (isPolling: boolean) => {

	const fetchLogs = async () => {
		const data = await $fetch("/api/logs");
		const logs = useState("allLogs");
		logs.value = data || [];
	};

	const startPolling = () => {
		intervalId = setInterval(fetchLogs, 3000);
	};

	const stopPolling = () => {
		clearInterval(intervalId);
	};

	if (isPolling) {
		fetchLogs(); // Fetch logs immediately
		startPolling();
	} else {
		stopPolling();
	}
};
