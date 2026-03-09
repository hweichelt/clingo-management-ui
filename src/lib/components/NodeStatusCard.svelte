<script lang="ts">
	import Icon from './Icon.svelte';

	interface NodeStatusCardProps {
		name: string;
		status?: 'disconnected' | 'idle' | 'running';
		class?: string;
	}

	let { name, status = 'disconnected', class: className = '' }: NodeStatusCardProps = $props();
</script>

<div
	class="card border-base-300 bg-base-200 grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border p-4"
>
	<Icon name="server" class="h-5 w-5" />
	<div class="text-sm">{name}</div>
	<div class="status-indicator relative status-{status} h-4 w-4 rounded-full border-2">
		<div
			class="hover-card bg-base-300 border-base-content/25 rounded-md border px-3 py-1 shadow-md"
		>
			{status}
		</div>
	</div>
</div>

<style>
	.hover-card {
		position: absolute;
		top: -2rem;
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		pointer-events: none;
		transition-property: top, opacity;
		transition-duration: 200ms;
	}
	.card:hover .hover-card {
		opacity: 1;
		top: -2.5rem;
		pointer-events: all;
	}
	.status-indicator.status-disconnected {
		background-color: transparent;
		border-color: color-mix(in srgb, var(--color-base-content) 50%, transparent);
	}
	.status-indicator.status-running {
		border-color: var(--color-primary);
		animation: running 2s infinite alternate-reverse;
	}
	.status-indicator.status-idle {
	}
	@keyframes running {
		0% {
			background: color-mix(in srgb, var(--color-primary) 20%, transparent);
		}
		100% {
			background: color-mix(in srgb, var(--color-primary) 60%, transparent);
		}
	}
</style>
