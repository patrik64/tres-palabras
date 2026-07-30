/** Format a local date as a 'YYYY-MM-DD' key. Avoids toISOString(), which shifts to UTC. */
function toKey(d: Date): string {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** The next `count` Mondays as 'YYYY-MM-DD' keys, local time.
 *  If today is a Monday it counts as the first one. */
export function nextMondays(count = 6, from = new Date()): string[] {
	const d = new Date(from);
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() + ((8 - d.getDay()) % 7));
	return Array.from({ length: count }, (_, i) => {
		const m = new Date(d);
		m.setDate(d.getDate() + i * 7);
		return toKey(m);
	});
}

/** 'Monday, Aug 3' — parses the key as local time; new Date('YYYY-MM-DD') would parse as UTC. */
export function formatMonday(key: string): string {
	const [y, m, d] = key.split('-').map(Number);
	return new Date(y, m - 1, d).toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'short',
		day: 'numeric'
	});
}
