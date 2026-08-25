/** Flags of spanish-speaking countries, used as the page background. Only the
 *  colour bands — the coats of arms, suns and stars are left out. */
export const flags = [
	'argentina',
	'bolivia',
	'chile',
	'colombia',
	'costa-rica',
	'ecuador',
	'guatemala',
	'honduras',
	'mexico',
	'panama',
	'peru',
	'spain',
	'venezuela'
] as const;

export type Flag = (typeof flags)[number];

/** A flag other than `current`, so every page switch visibly changes the background. */
export function randomFlag(current?: string): Flag {
	const pool = flags.filter((f) => f !== current);
	return pool[Math.floor(Math.random() * pool.length)];
}
