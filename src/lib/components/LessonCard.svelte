<script lang="ts">
	import { repo } from 'remult';
	import { Lesson } from '../../shared/Lesson';
	import { formatMonday, todayKey } from '$lib/dates';

	let {
		monday,
		mode,
		lesson
	}: { monday: string; mode: 'teacher' | 'student'; lesson?: Lesson } = $props();

	let words = $state(['', '', '']);
	let dirty = $state(false);
	let saved = $state(false);
	let error = $state('');

	// resync from server data unless the user is mid-edit
	$effect(() => {
		if (dirty) return;
		if (mode === 'student' && isFuture) {
			// don't reveal anything for lessons that haven't opened yet
			words = ['', '', ''];
			return;
		}
		words =
			mode === 'teacher'
				? [lesson?.spanish1 ?? '', lesson?.spanish2 ?? '', lesson?.spanish3 ?? '']
				: [lesson?.english1 ?? '', lesson?.english2 ?? '', lesson?.english3 ?? ''];
	});

	const spanish = $derived([
		lesson?.spanish1 ?? '',
		lesson?.spanish2 ?? '',
		lesson?.spanish3 ?? ''
	]);
	const definitions = $derived([
		lesson?.definition1 ?? '',
		lesson?.definition2 ?? '',
		lesson?.definition3 ?? ''
	]);
	const hasSpanish = $derived(spanish.some((w) => w !== ''));
	const isFuture = $derived(monday > todayKey());
	const canEdit = $derived(mode === 'teacher' || (hasSpanish && !isFuture));

	async function save(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		try {
			const set =
				mode === 'teacher'
					? { spanish1: words[0], spanish2: words[1], spanish3: words[2] }
					: { english1: words[0], english2: words[1], english3: words[2] };
			await repo(Lesson).upsert({ where: { monday }, set });
			dirty = false;
			saved = true;
			setTimeout(() => (saved = false), 1500);
		} catch (err) {
			error = (err as Error).message ?? 'something went wrong';
		}
	}
</script>

<form
	onsubmit={save}
	class="rounded-lg px-4 py-3 transition duration-500 ease-in-out {canEdit
		? 'bg-white shadow-lg'
		: 'bg-gray-200 opacity-60 shadow'}"
>
	<p class="font-semibold text-gray-900 select-none">{formatMonday(monday)}</p>

	{#if mode === 'student' && isFuture}
		<p class="mt-2 text-sm font-medium text-gray-500 select-none">
			this lesson opens on its monday
		</p>
	{:else if mode === 'student' && !hasSpanish}
		<p class="mt-2 text-sm font-medium text-gray-500 select-none">
			the teacher hasn't added words for this monday yet
		</p>
	{/if}

	{#each [0, 1, 2] as i (i)}
		<div class="mt-2 {mode === 'student' ? 'grid grid-cols-2 items-center gap-2' : ''}">
			{#if mode === 'student'}
				<span class="truncate text-sm font-semibold text-gray-700 select-none">
					{isFuture ? '—' : spanish[i] || '—'}
				</span>
			{/if}
			<input
				type="text"
				bind:value={words[i]}
				oninput={() => (dirty = true)}
				disabled={!canEdit}
				placeholder={mode === 'teacher' ? `spanish word ${i + 1}` : 'english translation'}
				spellcheck="false"
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				class="form-input block w-full font-medium focus:shadow-outline-green disabled:bg-gray-100 disabled:text-gray-400 sm:text-sm sm:leading-5"
			/>
			{#if mode === 'teacher' && definitions[i] && words[i].trim().toLowerCase() === spanish[i].trim().toLowerCase()}
				<p class="mt-1 text-xs font-medium text-gray-500 italic select-none">{definitions[i]}</p>
			{/if}
		</div>
	{/each}

	{#if error}
		<p class="mt-2 text-sm font-semibold text-red-600">{error}</p>
	{/if}

	<div class="mt-3 flex items-center justify-end gap-2 select-none">
		{#if saved}
			<span class="text-xs font-semibold text-primary-700">saved</span>
		{/if}
		<button
			type="submit"
			disabled={!canEdit || !dirty}
			class="rounded-md border border-transparent bg-primary-600 px-4 py-1 text-sm leading-5 font-semibold text-white shadow-sm transition duration-150 ease-in-out hover:bg-primary-400 focus:shadow-outline-green focus:outline-none disabled:cursor-default disabled:bg-gray-300"
		>
			save
		</button>
	</div>
</form>
