import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { JsonDataProvider } from 'remult';
import { remultApi } from 'remult/remult-sveltekit';
import { Lesson } from '../shared/Lesson';
import { BlobJsonStorage } from './blobStorage';

function blobDataProvider() {
	if (!env.BLOB_READ_WRITE_TOKEN) return undefined; // JSON files under ./db (local dev)
	return new JsonDataProvider(new BlobJsonStorage(env.BLOB_READ_WRITE_TOKEN), true);
}

export const api = remultApi({
	entities: [Lesson],
	admin: dev,
	dataProvider: blobDataProvider()
});
