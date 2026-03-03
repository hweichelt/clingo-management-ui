<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		children: Snippet;
		variant?: 'primary' | 'secondary';
		shortcut?: string;
		class?: string;
		onclick?: () => void;
		href?: string;
		disabled?: boolean;
	}

	let {
		disabled,
		href,
		onclick,
		variant = 'primary',
		class: className = '',
		shortcut,
		children
	}: ButtonProps = $props();
</script>

{#if href !== undefined}
	<a
		{href}
		{onclick}
		class="border-primary bg-primary/35 flex cursor-pointer flex-row items-center gap-2 rounded-xl border-4 px-3.5 py-1.5 {className} variant-{variant}"
	>
		{@render children()}
	</a>
{:else}
	<button
		{onclick}
		{disabled}
		class="border-primary bg-primary/35 flex cursor-pointer flex-row items-center gap-2 rounded-xl border-4 px-3.5 py-1.5 {className} variant-{variant}"
	>
		{@render children()}
		{#if shortcut !== undefined}
			<div class="border-foreground/50 bg-foreground/10 rounded-md border-2 px-2 py-0.5 text-xs">
				{shortcut}
			</div>
		{/if}
	</button>
{/if}

<style>
	.variant-secondary {
		border-color: transparent;
		background: color-mix(in srgb, var(--color-foreground) 10%, transparent);
		transition-property: border-color, background-color;
		transition-duration: 200ms;
	}
	.variant-secondary:hover {
		border-color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 35%, transparent);
	}
	button:disabled {
		border-color: color-mix(in srgb, var(--color-foreground) 35%, transparent);
		background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
		opacity: 50%;
		cursor: default;
	}
</style>
