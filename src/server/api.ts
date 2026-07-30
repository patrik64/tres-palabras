import { dev } from '$app/environment';
import { remultApi } from 'remult/remult-sveltekit';
import { Lesson } from '../shared/Lesson';

export const api = remultApi({
	entities: [Lesson],
	admin: dev
	// Supabase (later): read DATABASE_URL and pass a postgres dataProvider here;
	// with no dataProvider remult stores JSON files under ./db in dev.
});
