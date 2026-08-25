import { get, put, BlobNotFoundError } from '@vercel/blob';
import type { JsonEntityStorage } from 'remult';

/** Keeps remult's JSON database in vercel blob — one blob per entity, same
 *  shape as the files under ./db. Vercel's function filesystem is read-only,
 *  so the deployed app has nowhere else to write. */
export class BlobJsonStorage implements JsonEntityStorage {
	// the sdk reads process.env, which sveltekit's dotenv loading doesn't fill in dev
	constructor(private token: string) {}

	async getItem(entityDbName: string): Promise<string | null> {
		try {
			// useCache: false — the cdn caches for a minute at minimum, which
			// would serve a stale lesson right after the teacher saved one
			const res = await get(`${entityDbName}.json`, {
				access: 'private',
				useCache: false,
				token: this.token
			});
			return res?.statusCode === 200 ? await new Response(res.stream).text() : null;
		} catch (err) {
			if (err instanceof BlobNotFoundError) return null; // no lessons saved yet
			throw err;
		}
	}

	async setItem(entityDbName: string, json: string): Promise<void> {
		await put(`${entityDbName}.json`, json, {
			access: 'private',
			contentType: 'application/json',
			allowOverwrite: true,
			cacheControlMaxAge: 60,
			token: this.token
		});
	}
}
