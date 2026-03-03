import { SvelteMap } from 'svelte/reactivity';
import { get_cell_coordinates, get_subgrid_id } from '$lib/sudoku';

class CellState {
	cells: SvelteMap<number, number | undefined> = new SvelteMap();
	initials: SvelteMap<number, number> = new SvelteMap();

	async set(cell_id: number, new_value: number | null) {
		if(new_value === null){
			this.cells.delete(cell_id);
		} else {
			this.cells.set(cell_id, new_value);
		}
	}
	async set_initials(initials: Map<number, number>){
		this.initials = new SvelteMap(initials);
	}
	get(cell_id: number) {
		return this.cells.get(cell_id);
	}
	get_subgrids_containing(value: number) {
		const all_values = new Map([...this.cells, ...this.initials]);
		const subgrids = all_values.entries().filter(([_, entry_value]) => {
			return entry_value === value;
		}).map(([entry_key, _]) => {
			const [x, y] = get_cell_coordinates(entry_key);
			return get_subgrid_id(x, y);
		});
		return [...new Set(subgrids)];
	}
}

export const cell_state = new CellState();
