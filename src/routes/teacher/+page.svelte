<script lang="ts">
	import LessonCalendar from '$lib/components/LessonCalendar.svelte';
</script>

<div class="mx-auto mt-2 w-full max-w-[52rem] p-4">
	<div class="flex items-center select-none">
		<h1 class="rounded-full bg-white px-3 py-1 text-lg font-semibold text-gray-900">teacher</h1>
		<div class="flex-grow"></div>
		<a href="/" class="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:text-tertiary-600">home</a>
	</div>
	<LessonCalendar mode="teacher" />
</div>
