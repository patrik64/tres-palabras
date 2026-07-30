import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { remultApi } from 'remult/remult-sveltekit';
import { createPostgresDataProvider } from 'remult/postgres';
import { Lesson } from '../shared/Lesson';

export const api = remultApi({
	entities: [Lesson],
	admin: dev,
	// Supabase Postgres when DATABASE_URL is set; JSON files under ./db otherwise (local dev)
	dataProvider: env.DATABASE_URL
		? createPostgresDataProvider({ connectionString: env.DATABASE_URL })
		: undefined
});
