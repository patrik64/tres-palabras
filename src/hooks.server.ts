import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { randomFlag } from '$lib/flags';
import { api } from './server/api';

/** Pick the flag server side so the first paint already has one — picking it
 *  during hydration instead would flash an unpainted page. */
const flag: Handle = ({ event, resolve }) =>
	resolve(event, { transformPageChunk: ({ html }) => html.replace('%flag%', randomFlag()) });

export const handle: Handle = sequence(api, flag);
