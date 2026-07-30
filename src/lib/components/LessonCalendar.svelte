<script lang="ts">
	import { repo } from 'remult';
	import { Lesson } from '../../shared/Lesson';
	import { currentWeekMondays, nextMondays } from '$lib/dates';
	import LessonCard from './LessonCard.svelte';

	let { mode }: { mode: 'teacher' | 'student' } = $props();

	// the student keeps the current week's lesson all week; the teacher only preps upcoming ones
	const mondays = $derived(mode === 'student' ? currentWeekMondays(6) : nextMondays(6));
	let lessons = $state<Lesson[]>([]);

	$effect(() =>
		repo(Lesson)
			.liveQuery({ where: { monday: { $in: mondays } } })
			.subscribe((info) => (lessons = info.applyChanges(lessons)))
	);
</script>

<div class="mt-4 grid gap-4 sm:grid-cols-2">
	{#each mondays as monday (monday)}
		<LessonCard {monday} {mode} lesson={lessons.find((l) => l.monday === monday)} />
	{/each}
</div>
