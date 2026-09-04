import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { JsonDataProvider } from 'remult';
import { remultApi } from 'remult/remult-sveltekit';
import { Lesson } from '../shared/Lesson';
import { BlobJsonStorage } from './blobStorage';

function blobDataProvider() {
	// on netlify the blobs sdk finds its own credentials
	if (env.NETLIFY_BLOBS_CONTEXT) return new JsonDataProvider(new BlobJsonStorage(), true);
	// local dev against the real store, if a site id and token are provided
	if (env.NETLIFY_SITE_ID && env.NETLIFY_AUTH_TOKEN)
		return new JsonDataProvider(
			new BlobJsonStorage({ siteID: env.NETLIFY_SITE_ID, token: env.NETLIFY_AUTH_TOKEN }),
			true
		);
	return undefined; // JSON files under ./db
}

export const api = remultApi({
	entities: [Lesson],
	admin: dev,
	dataProvider: blobDataProvider()
});
