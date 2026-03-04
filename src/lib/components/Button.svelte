<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		children: Snippet;
		variant?: 'default' | 'ghost';
		shortcut?: string;
		size?: 'default' | 'icon';
		shape?: 'square' | 'rounded' | 'round';
		class?: string;
		onclick?: () => void;
		href?: string;
		disabled?: boolean;
	}

	let {
		disabled,
		href,
		onclick,
		variant = 'default',
		size = 'default',
		shape = 'rounded',
		class: className = '',
		shortcut,
		children
	}: ButtonProps = $props();

	let class_string = `flex cursor-pointer border flex-row items-center gap-2 rounded-lg border-2 px-3.5 py-1.5 ${className} variant-${variant} size-${size} shape-${shape}`;
</script>

{#if href !== undefined}
	<a {href} {onclick} class={class_string}>
		{@render children()}
	</a>
{:else}
	<button {onclick} {disabled} class={class_string}>
		{@render children()}
		{#if shortcut !== undefined}
			<div class="border-foreground/50 bg-foreground/10 rounded-md border-2 px-2 py-0.5 text-xs">
				{shortcut}
			</div>
		{/if}
	</button>
{/if}

<style>
	button.variant-ghost {
		background: transparent;
		border-color: transparent;
	}
	button.variant-ghost:hover {
		background: color-mix(in srgb, var(--color-primary) 25%, transparent);
		border-color: var(--color-primary);
	}
	button:disabled {
		border-color: color-mix(in srgb, var(--color-foreground) 35%, transparent);
		background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
		opacity: 50%;
		cursor: default;
	}
	.size-icon {
		padding: 0.5rem;
	}
	.shape-round {
		border-radius: 50%;
	}
</style>
