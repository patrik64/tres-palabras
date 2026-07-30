import { Entity, Fields, isBackend } from 'remult';

/** First dictionary definition of a spanish word from the RAE dictionary
 *  (dle.rae.es, via the rae-api.com mirror — the official site blocks server requests). */
async function fetchDefinition(word: string): Promise<string> {
	if (!word.trim()) return '';
	try {
		const res = await fetch(
			`https://rae-api.com/api/words/${encodeURIComponent(word.trim().toLowerCase())}`,
			{ signal: AbortSignal.timeout(8000) }
		);
		if (!res.ok) return '';
		const json = await res.json();
		return json?.data?.meanings?.[0]?.senses?.[0]?.description ?? '';
	} catch {
		return '';
	}
}

@Entity<Lesson>('lessons', {
	allowApiCrud: true,
	id: { monday: true },
	defaultOrderBy: { monday: 'asc' },
	saving: async (lesson, e) => {
		if (!isBackend()) return;
		await Promise.all(
			(['spanish1', 'spanish2', 'spanish3'] as const).map(async (key, i) => {
				const defKey = `definition${i + 1}` as 'definition1' | 'definition2' | 'definition3';
				if (e.fields[key].valueChanged() || (lesson[key] && !lesson[defKey])) {
					lesson[defKey] = await fetchDefinition(lesson[key]);
				}
			})
		);
	}
})
export class Lesson {
	@Fields.string()
	monday = ''; // 'YYYY-MM-DD' (local date, always a Monday)

	@Fields.string()
	spanish1 = '';

	@Fields.string()
	spanish2 = '';

	@Fields.string()
	spanish3 = '';

	@Fields.string()
	english1 = '';

	@Fields.string()
	english2 = '';

	@Fields.string()
	english3 = '';

	@Fields.string()
	definition1 = '';

	@Fields.string()
	definition2 = '';

	@Fields.string()
	definition3 = '';

	@Fields.updatedAt()
	updatedAt?: Date;
}
