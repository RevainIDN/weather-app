export function formatTime(dt: number, timezone: number): string {
	const utcTime = new Date(dt * 1000);
	const localTime = new Date(utcTime.getTime() + timezone * 1000);

	const formattedTime = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZone: 'UTC'
	}).format(localTime);

	return formattedTime;
}