export function get_cell_id_subgrid(subgrid_x: number, subgrid_y: number, x: number, y: number) {
	const subgrid_rows_before = subgrid_y * 3 * 9;
	const subgrid_rows_current = y * 9;
	const subgrid_cols_before = subgrid_x * 3;
	return subgrid_rows_before + subgrid_rows_current + subgrid_cols_before + x;
}

export function get_cell_id(x: number, y: number) {
	return y * 9 + x;
}

export function get_cell_coordinates(cell_id: number) {
	const y = Math.floor(cell_id /9);
	const x = cell_id % 9;
	return [x, y];
}

export function get_subgrid_id(x: number, y: number) {
	const subgrid_x = Math.floor(x / 3);
	const subgrid_y = Math.floor(y / 3);
	return subgrid_y * 3 + subgrid_x;
}