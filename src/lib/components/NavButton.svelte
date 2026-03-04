<svelte:options runes={true} />

<script lang="ts">
	import Icon from './Icon.svelte';

	interface NavButtonProps {
		label: string;
		icon: string;
		href: string;
		disabled?: boolean;
	}
	let { label, icon, href, disabled = false }: NavButtonProps = $props();

	if (disabled) {
		href = '';
	}
</script>

<a
	{href}
	class="bg-foreground/10 flex flex-row items-center gap-2 rounded-md border-2 border-transparent px-3 py-0.5 {disabled
		? 'disabled'
		: ''}"
>
	<Icon name={icon} class="h-5 w-5" />
	{label}
</a>

<style>
	a {
		transition-property: background-color, border-color;
		transition-duration: 200ms;
	}
	a:not(.disabled):hover {
		background: color-mix(in srgb, var(--color-primary) 25%, transparent);
		border-color: var(--color-primary);
	}
	a.disabled {
		pointer-events: none;
		user-select: none;
		opacity: 0.5;
		cursor: default;
	}
</style>
