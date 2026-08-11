import { repo } from 'remult';
import { todayKey } from '$lib/dates';
import { Lesson } from '../shared/Lesson';

export type SolvedLesson = {
	monday: string;
	pairs: { spanish: string; english: string; definition: string }[];
};

/** Mondays with at least one translated word, newest first. */
export async function solvedLessons(): Promise<SolvedLesson[]> {
	const lessons = await repo(Lesson).find({ orderBy: { monday: 'desc' } });
	return lessons
		.map((l) => ({
			monday: l.monday,
			pairs: [
				{ spanish: l.spanish1, english: l.english1, definition: l.definition1 },
				{ spanish: l.spanish2, english: l.english2, definition: l.definition2 },
				{ spanish: l.spanish3, english: l.english3, definition: l.definition3 }
			].filter((p) => p.spanish !== '' && p.english !== '')
		}))
		.filter((l) => l.pairs.length > 0);
}

/** Hand the history to the browser as a JSON download. */
export async function downloadHistory(): Promise<void> {
	const json = JSON.stringify(await solvedLessons(), null, 2);
	const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
	const link = document.createElement('a');
	link.href = url;
	link.download = `tres-palabras-history-${todayKey()}.json`;
	link.click();
	// revoking right away can cancel the download before the browser has read the blob
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}
