/** Format a local date as a 'YYYY-MM-DD' key. Avoids toISOString(), which shifts to UTC. */
function toKey(d: Date): string {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** The current week's Monday (the most recent one, today included) plus the
 *  following `count - 1` Mondays, as 'YYYY-MM-DD' keys, local time. */
export function currentWeekMondays(count = 6, from = new Date()): string[] {
	const start = new Date(from);
	start.setHours(0, 0, 0, 0);
	start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
	return Array.from({ length: count }, (_, i) => {
		const monday = new Date(start);
		monday.setDate(start.getDate() + i * 7);
		return toKey(monday);
	});
}

/** 'Monday, Aug 3' — parses the key as local time; new Date('YYYY-MM-DD') would parse as UTC. */
export function formatMonday(key: string, withYear = false): string {
	const [y, m, d] = key.split('-').map(Number);
	return new Date(y, m - 1, d).toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
		...(withYear ? { year: 'numeric' } : {})
	});
}
