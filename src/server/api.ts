import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { SqlDatabase } from 'remult';
import { remultApi } from 'remult/remult-sveltekit';
import { PostgresDataProvider } from 'remult/postgres';
import pg from 'pg';
import { Lesson } from '../shared/Lesson';

function supabaseDataProvider() {
	if (!env.DATABASE_URL) return undefined; // JSON files under ./db (local dev)
	const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
	// idle pooled connections can drop (transient network errors); without a
	// listener, node crashes on the pool's unhandled 'error' event
	pool.on('error', (err) => console.error('postgres pool error:', err.message));
	return new SqlDatabase(new PostgresDataProvider(pool));
}

export const api = remultApi({
	entities: [Lesson],
	admin: dev,
	dataProvider: supabaseDataProvider()
});
