<svelte:options runes={true} />

<script lang="ts">
	import Icon from './Icon.svelte';
	import Progress from './Progress.svelte';
	import { Plot, Line, AxisY, AxisX } from 'svelteplot';

	interface ProcessCardProps {
		label: string;
		server: string;
		progress: number;
	}
	let { label, server, progress }: ProcessCardProps = $props();
	let is_finished = $derived(progress === 1);
	let eta = $derived(is_finished ? 'finished' : `ETA: ${Math.round((1 - progress) * 12)}:17:43`);

	let expanded = $state(true);
	let expanded_class = $derived(expanded ? 'expanded' : '');

	let dummy_data_models = [
		{ timestep: 1, models: 0 },
		{ timestep: 2, models: 0 },
		{ timestep: 3, models: 1 },
		{ timestep: 4, models: 3 },
		{ timestep: 5, models: 7 },
		{ timestep: 6, models: 15 },
		{ timestep: 7, models: 29 },
		{ timestep: 8, models: 36 },
		{ timestep: 9, models: 41 },
		{ timestep: 10, models: 44 }
	];

	function toggle_expanded() {
		expanded = !expanded;
	}
</script>

<div
	class="card bg-base-200 border-base-300 relative z-0 grid grid-cols-[1fr_auto] gap-3 rounded-md border p-4 shadow-xs {expanded_class}"
>
	<button
		class="button-expand bg-base-300 absolute right-0 bottom-0 left-0 flex w-full cursor-pointer flex-row items-center justify-center p-1 opacity-0"
		title="Expand"
		onclick={toggle_expanded}
	>
		<Icon name="expand_down" class="opacity-40" />
	</button>
	<div class="label felx-row flex items-center text-sm">{label}</div>
	<div class="flex flex-row gap-2">
		<div class="bg-base-300 flex flex-row items-center gap-2 rounded-full px-2 text-xs">
			<Icon name="server" class="h-4 w-4" />
			<div>{server}</div>
		</div>
		<div class="bg-base-300 flex flex-row items-center gap-1 rounded-full px-3 text-xs">
			{#if is_finished}
				<Icon name="check" class="h-4 w-4" />
			{/if}
			<div>{eta}</div>
		</div>
	</div>
	<div class="z-20 col-span-2">
		<Progress {progress} />
	</div>
	{#if expanded}
		<div class="details bg-base-300 relative col-span-2 grid w-full grid-cols-2 gap-2 p-4 text-xs">
			<button
				class="button-close bg-base-content/10 absolute top-2 right-2 flex cursor-pointer flex-row items-center justify-center rounded-full p-1 opacity-0"
				title="Close"
				onclick={toggle_expanded}
			>
				<Icon name="expand_up" class="opacity-40" />
			</button>
			<div class="stats flex flex-col gap-2">
				<div>
					<div>Grounding Time</div>
					<div>02:27:34</div>
				</div>
				<div>
					<div>Grounding Size</div>
					<div>34.678 GB</div>
				</div>
				<div>
					<div>Solving Time</div>
					<div>01:52:45</div>
				</div>
				<div>
					<div>Models Found</div>
					<div>174</div>
				</div>
				<div>
					<div>Optimization</div>
					<div>62</div>
				</div>
			</div>
			<div class="bg-base-200/75 rounded-xl p-2">
				<Plot height={150} inset={10} grid>
					<Line data={dummy_data_models} x="timestep" y="models" opacity={0.4} />
				</Plot>
			</div>
		</div>
	{/if}
</div>

<style>
	.card {
		transition-property: padding-bottom;
		transition-duration: 200ms;
	}
	.card:not(.expanded):hover {
		padding-bottom: 3rem;
	}
	.button-expand {
		pointer-events: none;
		transition-property: opacity;
		transition-duration: 200ms;
	}
	.card:not(.expanded):hover .button-expand {
		pointer-events: all;
		opacity: 1;
	}
	.button-close {
		pointer-events: none;
		transition-property: opacity;
		transition-duration: 200ms;
	}
	.card.expanded:hover .button-close {
		pointer-events: all;
		opacity: 1;
	}
	.details {
		width: calc(100% + 2 * theme('spacing.4'));
		margin: 0 calc(-1 * theme('spacing.4')) calc(-1 * theme('spacing.4'))
			calc(-1 * theme('spacing.4'));
	}
	.stats > div {
		background-color: var(--color-base-200);
		padding: theme('spacing.1') theme('spacing.3');
		border-radius: theme('borderRadius.full');
		display: grid;
		grid-template-columns: 1fr auto;
	}
</style>
