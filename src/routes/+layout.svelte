<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>tres palabras</title>
</svelte:head>

<div class="flex items-center p-2 select-none">
	<svg width="20" height="20" viewBox="0 0 20 20" fill="gray">
		<path
			fill-rule="evenodd"
			d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
			clip-rule="evenodd"
		/>
	</svg>
	<a href="/" class="-mt-1 pl-1 font-semibold">tres palabras</a>
</div>

{@render children()}
