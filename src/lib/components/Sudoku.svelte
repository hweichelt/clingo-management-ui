<svelte:options runes={true} />

<script lang="ts">
	import SudokuSubgrid from '$lib/components/SudokuSubgrid.svelte';
	import { get_cell_id } from '$lib/sudoku';
	import { cursor_state } from '$lib/state/cursor.svelte';
	import { cell_state } from '$lib/state/cells.svelte';
	import { onMount } from 'svelte';

	interface SudokuProps {
		initials: Map<number, number>;
	}
	let { initials }: SudokuProps = $props();

	cell_state.set_initials(initials);

	let cursor_x = $derived(cursor_state.cell_id % 9);
	let cursor_y = $derived(Math.floor(cursor_state.cell_id / 9));

	function change_cursor(x: number, y: number) {
		x = Math.max(Math.min(cursor_x + x, 8), 0);
		y = Math.max(Math.min(cursor_y + y, 8), 0);
		cursor_state.set(get_cell_id(x, y));
	}

	function onKeyDown(event) {
		switch(event.keyCode) {
			case 38:
				change_cursor(0,-1);
				break;
			case 40:
				change_cursor(0,1);
				break;
			case 37:
				change_cursor(-1,0);
				break;
			case 39:
				change_cursor(1,0);
				break;
			case 49: // 1
				cell_state.set(cursor_state.cell_id, 1);
				break;
			case 50: // 2
				cell_state.set(cursor_state.cell_id, 2);
				break;
			case 51: // 3
				cell_state.set(cursor_state.cell_id, 3);
				break;
			case 52: // 4
				cell_state.set(cursor_state.cell_id, 4);
				break;
			case 53: // 5
				cell_state.set(cursor_state.cell_id, 5);
				break;
			case 54: // 6
				cell_state.set(cursor_state.cell_id, 6);
				break;
			case 55: // 7
				cell_state.set(cursor_state.cell_id, 7);
				break;
			case 56: // 8
				cell_state.set(cursor_state.cell_id, 8);
				break;
			case 57: // 9
				cell_state.set(cursor_state.cell_id, 9);
				break;
			case 46: // DELETE
				cell_state.set(cursor_state.cell_id, null);
				break;
			case 8: // BACKSPACE
				cell_state.set(cursor_state.cell_id, null);
				break;

		}
	}
</script>

<!--<div>{cursor_x} {cursor_y} : {get_cell_id(cursor_x, cursor_y)}</div>-->
<div class="relative grid grid-cols-[1fr_auto_1fr] w-auto p-4 gap-1 bg-foreground/10 rounded-xl backdrop-blur-[20px]">
	<SudokuSubgrid subgrid_x={0} subgrid_y={0} />
	<SudokuSubgrid subgrid_x={1} subgrid_y={0} variant="highlighted" />
	<SudokuSubgrid subgrid_x={2} subgrid_y={0} />

	<SudokuSubgrid subgrid_x={0} subgrid_y={1} variant="highlighted" />
	<SudokuSubgrid subgrid_x={1} subgrid_y={1} />
	<SudokuSubgrid subgrid_x={2} subgrid_y={1} variant="highlighted" />

	<SudokuSubgrid subgrid_x={0} subgrid_y={2} />
	<SudokuSubgrid subgrid_x={1} subgrid_y={2} variant="highlighted" />
	<SudokuSubgrid subgrid_x={2} subgrid_y={2} />
</div>
<svelte:window onkeydown={onKeyDown} />

