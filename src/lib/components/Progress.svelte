<svelte:options runes={true} />

<script lang="ts">
	interface ProgressProps {
		progress: number;
	}
	let { progress }: ProgressProps = $props();

	let is_finished = $state(progress === 1);

	let state_class = $derived(is_finished ? 'finished' : 'running');
</script>

<div
	class="border-primary bg-primary/5 h-8 overflow-hidden rounded-full border-2 state-{state_class}"
>
	<div class="bar h-full" style="width: {progress * 100}%;"></div>
</div>

<style>
	.bar {
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--color-primary) 45%, transparent),
			color-mix(in srgb, var(--color-primary) 65%, transparent)
		);
	}
	.state-finished .bar {
		background: color-mix(in srgb, var(--color-primary) 40%, transparent);
	}
	.state-running .bar:before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent 25%,
			color-mix(in srgb, var(--color-primary-content) 50%, transparent),
			transparent 75%
		);
		background-size: 200% 100%;
		background-position: 100% 0;
		animation: running 3s infinite;
	}
	@keyframes running {
		0% {
			background-position: 150% 0;
		}
		100% {
			background-position: -50% 0;
		}
	}
</style>
