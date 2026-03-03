<script>
	import SudokuNumberOverview from '$lib/components/SudokuNumberOverview.svelte';
</script>

<div class="rounded-xl bg-foreground/10 grid grid-cols-9 p-4 gap-2">
	{#each {length: 9} as _, i}
		<SudokuNumberOverview value={i+1} />
	{/each}
</div>