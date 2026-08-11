<script lang="ts">
	import { repo } from 'remult';
	import { Lesson } from '../../shared/Lesson';
	import { currentMonday, nextMondays } from '$lib/dates';
	import LessonCard from './LessonCard.svelte';

	let { mode }: { mode: 'teacher' | 'student' } = $props();

	// the student works on the current week's lesson; the teacher preps the upcoming ones
	const mondays = $derived(mode === 'student' ? [currentMonday()] : nextMondays(6));
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
