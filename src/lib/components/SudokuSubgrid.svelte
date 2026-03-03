<svelte:options runes={true} />

<script lang="ts">
	import SudokuCell from '$lib/components/SudokuCell.svelte';
	import { get_cell_id_subgrid } from '$lib/sudoku';

	interface SudokuSubgridProps {
		variant?: "default" | "highlighted";
		subgrid_x: number;
		subgrid_y: number;
	}
	let { subgrid_x, subgrid_y, variant = "default" }: SudokuSubgridProps = $props();
</script>

<div class="grid grid-cols-3 gap-2 p-2 variant-{variant} rounded-lg">
	<SudokuCell cell_id={get_cell_id_subgrid(subgrid_x, subgrid_y, 0, 0)} />
	<SudokuCell cell_id={get_cell_id_subgrid(subgrid_x, subgrid_y, 1, 0)} />
	<SudokuCell cell_id={get_cell_id_subgrid(subgrid_x, subgrid_y, 2, 0)} />

	<SudokuCell cell_id={get_cell_id_subgrid(subgrid_x, subgrid_y, 0, 1)} />
	<SudokuCell cell_id={get_cell_id_subgrid(subgrid_x, subgrid_y, 1, 1)} />
	<SudokuCell cell_id={get_cell_id_subgrid(subgrid_x, subgrid_y, 2, 1)} />

	<SudokuCell cell_id={get_cell_id_subgrid(subgrid_x, subgrid_y, 0, 2)} />
	<SudokuCell cell_id={get_cell_id_subgrid(subgrid_x, subgrid_y, 1, 2)} />
	<SudokuCell cell_id={get_cell_id_subgrid(subgrid_x, subgrid_y, 2, 2)} />
</div>

<style>
	.variant-highlighted {
			background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
	}
</style>