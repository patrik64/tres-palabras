<script lang="ts">
	import { repo } from 'remult';
	import { Lesson } from '../../shared/Lesson';
	import { currentWeekMondays } from '$lib/dates';
	import LessonCard from './LessonCard.svelte';
	import Spinner from './Spinner.svelte';

	let { mode }: { mode: 'teacher' | 'student' } = $props();

	// both start at this week's monday; the teacher also preps the five weeks after it
	const mondays = $derived(currentWeekMondays(mode === 'student' ? 1 : 6));
	let lessons = $state<Lesson[]>([]);
	let loaded = $state(false);

	// a plain fetch, not a live query: the live query's SSE stream gets cut
	// after a second on netlify functions, and the client reconnects forever
	// without ever loading anything
	$effect(() => {
		repo(Lesson)
			.find({ where: { monday: { $in: mondays } } })
			.then(
				(found) => {
					lessons = found;
					loaded = true;
				},
				// fall through to empty cards rather than spinning forever
				() => (loaded = true)
			);
	});

	// without live updates the card hands back what it saved, so the
	// definitions the server looked up show without a reload
	function replace(saved: Lesson) {
		lessons = [...lessons.filter((l) => l.monday !== saved.monday), saved];
	}
</script>

{#if loaded}
	<div class="mt-4 grid gap-4 {mondays.length > 1 ? 'sm:grid-cols-2' : ''}">
		{#each mondays as monday (monday)}
			<LessonCard
				{monday}
				{mode}
				lesson={lessons.find((l) => l.monday === monday)}
				onsaved={replace}
			/>
		{/each}
	</div>
{:else}
	<Spinner />
{/if}
