<svelte:options runes={true} />

<script lang="ts">
	import { cursor_state } from '$lib/state/cursor.svelte';
	import { cell_state } from '$lib/state/cells.svelte';
	import { get_cell_coordinates } from '$lib/sudoku';

	interface SudokuCellProps {
		cell_id: number;
	}
	let { cell_id }: SudokuCellProps = $props();
	let is_focused = $derived(cursor_state.cell_id === cell_id);
	let is_initial = $derived(cell_state.initials.has(cell_id));
	let cell_value = $derived(cell_state.get(cell_id));
	let animation_delay = compute_animation_delay(cell_id);

	function cell_clicked(event: MouseEvent) {
		if(!is_initial){
			event.preventDefault();
			cursor_state.set(cell_id);
		}
	}
	function compute_animation_delay(cell_id: number) {
		const [x, y] = get_cell_coordinates(cell_id);
		const delay_x = Math.abs(x-4) * 50;
		const delay_y = Math.abs(y-4) * 50;
		return delay_x + delay_y
	}
</script>


<button class="cell h-14 w-14 flex justify-center items-center bg-foreground/5 rounded-full border-3 border-transparent text-lg font-bold text-foreground/80 {is_focused? 'focus': ''} {is_initial? 'initial': ''}" onclick={cell_clicked} style="animation-delay: {animation_delay}ms">
	{#if is_initial}
		{cell_state.initials.get(cell_id)}
	{:else}
		{cell_value}
	{/if}
</button>

<style>
	.cell{
		transition-property: background-color;
		transition-duration: 200ms;
		opacity: 0;
		animation: pop-in 500ms forwards;
	}
	.cell.initial{
		border-color: color-mix(in srgb, var(--color-foreground) 25%, transparent);
		background: transparent;
	}
	.cell.focus{
		border-color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 35%, transparent);
	}
	@keyframes pop-in {
			0%{
					transform: scale(0);
					opacity: 0;
			}
			80%{
          transform: scale(1.1);
      }
			100%{
					opacity: 1;
          transform: scale(1);
      }
  }
</style>