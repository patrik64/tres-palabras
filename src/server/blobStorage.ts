import { getStore, type Store } from '@netlify/blobs';
import type { JsonEntityStorage } from 'remult';

/** Keeps remult's JSON database in netlify blobs — one blob per entity, same
 *  shape as the files under ./db. Netlify's function filesystem is read-only,
 *  so the deployed app has nowhere else to write. */
export class BlobJsonStorage implements JsonEntityStorage {
	private store: Store;

	/** On netlify the sdk configures itself from the environment; locally
	 *  pass the site id and a personal access token. */
	constructor(credentials?: { siteID: string; token: string }) {
		this.store = getStore({
			name: 'lessons',
			// remult reads the whole file and writes it back, so a stale read
			// would silently drop the last save — the default is eventual
			consistency: 'strong',
			...credentials
		});
	}

	async getItem(entityDbName: string): Promise<string | null> {
		return this.store.get(`${entityDbName}.json`, { type: 'text' }); // null when nothing saved yet
	}

	async setItem(entityDbName: string, json: string): Promise<void> {
		await this.store.set(`${entityDbName}.json`, json);
	}
}
