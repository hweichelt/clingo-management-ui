<svelte:options runes={true} />

<script lang="ts">
	import { cell_state } from '$lib/state/cells.svelte';

	interface SudokuCellProps {
		value: number;
	}
	let { value }: SudokuCellProps = $props();
	let subgrids = $derived(cell_state.get_subgrids_containing(value));
	let is_complete = $derived(subgrids.length >= 9);
</script>

<div class="overview bg-primary/35 py-4 flex flex-col gap-3 items-center rounded-md border-2 border-transparent {is_complete? 'complete': ''}">
	<div class="text-lg font-bold text-foreground/80">{value}</div>
	<div class="grid grid-cols-3 gap-1">
		{#each {length: 9} as _, i}
			{#if subgrids.includes(i)}
				<div class="h-1.5 w-1.5 rounded-full bg-foreground/80"></div>
			{:else}
				<div class="h-1.5 w-1.5 rounded-full bg-foreground/35"></div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.overview{
		transition-property: background-color, border-color;
		transition-duration: 200ms;
	}
	.overview.complete{
		opacity: 0.5;
		background: transparent;
		border-color: color-mix(in srgb, var(--color-foreground) 35%, transparent);
	}
</style>