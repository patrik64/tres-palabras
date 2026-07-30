<script lang="ts">
	import LessonCalendar from '$lib/components/LessonCalendar.svelte';
</script>

<div class="mx-auto mt-2 w-full max-w-[52rem] p-4 lg:rounded-[5px] lg:border lg:border-dashed lg:border-gray-600">
	<div class="flex items-center select-none">
		<h1 class="text-lg font-semibold text-gray-900">student</h1>
		<div class="flex-grow"></div>
		<a href="/" class="text-sm font-medium text-gray-700 underline hover:text-tertiary-600">home</a>
	</div>
	<LessonCalendar mode="student" />
</div>
