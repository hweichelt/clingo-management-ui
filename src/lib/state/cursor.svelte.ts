class CursorState {
	cell_id: number = $state(40);

	async set(new_value: number) {
		this.cell_id = new_value;
	}
}

export const cursor_state = new CursorState();
