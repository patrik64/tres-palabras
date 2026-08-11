<script lang="ts">
	import { repo } from 'remult';
	import { Lesson } from '../../shared/Lesson';
	import { currentWeekMondays } from '$lib/dates';
	import LessonCard from './LessonCard.svelte';

	let { mode }: { mode: 'teacher' | 'student' } = $props();

	// both start at this week's monday; the teacher also preps the five weeks after it
	const mondays = $derived(currentWeekMondays(mode === 'student' ? 1 : 6));
	let lessons = $state<Lesson[]>([]);

	$effect(() =>
		repo(Lesson)
			.liveQuery({ where: { monday: { $in: mondays } } })
			.subscribe((info) => (lessons = info.applyChanges(lessons)))
	);
</script>

<div class="mt-4 grid gap-4 {mondays.length > 1 ? 'sm:grid-cols-2' : ''}">
	{#each mondays as monday (monday)}
		<LessonCard {monday} {mode} lesson={lessons.find((l) => l.monday === monday)} />
	{/each}
</div>
