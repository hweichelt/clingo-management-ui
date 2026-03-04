<svelte:options runes={true} />

<script lang="ts">
	import Icon from './Icon.svelte';
	import Progress from './Progress.svelte';

	interface ProcessCardProps {
		label: string;
		progress: number;
	}
	let { label, progress }: ProcessCardProps = $props();
	let is_finished = $derived(progress === 1);
	let eta = $derived(is_finished ? 'finished' : `ETA: ${Math.round((1 - progress) * 12)}:17:43`);
</script>

<div
	class="bg-base-200 border-base-300 grid grid-cols-[1fr_auto] gap-3 rounded-md border p-4 shadow-xs"
>
	<div class="label felx-row flex items-center text-sm">{label}</div>
	<div class="bg-base-300 flex flex-row items-center gap-1 rounded-full px-3 text-xs">
		{#if is_finished}
			<Icon name="check" class="h-4 w-4" />
		{/if}
		<div>{eta}</div>
	</div>
	<div class="col-span-2">
		<Progress {progress} />
	</div>
</div>

<style>
</style>
