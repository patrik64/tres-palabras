<script lang="ts">
	import { formatMonday } from '$lib/dates';
	import { solvedLessons, type SolvedLesson } from '$lib/history';

	let groups = $state<SolvedLesson[]>([]);
	let loaded = $state(false);

	$effect(() => {
		solvedLessons().then((lessons) => {
			groups = lessons;
			loaded = true;
		});
	});
</script>

<div class="mx-auto mt-2 w-full max-w-[52rem] p-4 lg:rounded-[5px] lg:border lg:border-dashed lg:border-gray-600">
	<div class="flex items-center select-none">
		<h1 class="text-lg font-semibold text-gray-900">history</h1>
		<div class="flex-grow"></div>
		<a href="/" class="text-sm font-medium text-gray-700 underline hover:text-tertiary-600">home</a>
	</div>

	{#if loaded && groups.length === 0}
		<p class="mt-4 text-sm font-medium text-gray-500 select-none">no solved translations yet</p>
	{/if}

	<div class="mt-4 space-y-4">
		{#each groups as group (group.monday)}
			<div class="rounded-lg bg-white px-4 py-3 shadow-lg transition duration-500 ease-in-out">
				<p class="font-semibold text-gray-900 select-none">{formatMonday(group.monday, true)}</p>
				<div class="mt-2 space-y-2">
					{#each group.pairs as pair, i (i)}
						<div class="grid grid-cols-2 gap-2 text-sm">
							<div>
								<span class="font-semibold text-gray-700">{pair.spanish}</span>
								{#if pair.definition}
									<p class="text-xs font-medium text-gray-500 italic">{pair.definition}</p>
								{/if}
							</div>
							<span class="font-medium text-gray-600">{pair.english}</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
