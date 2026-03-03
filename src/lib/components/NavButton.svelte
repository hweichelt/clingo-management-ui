<svelte:options runes={true} />

<script lang="ts">
	interface NavButtonProps {
		label: string;
		href: string;
		disabled?: boolean;
	}
	let { label, href, disabled = false }: NavButtonProps = $props();

	if(disabled){
		href = ""
	}
</script>

<a {href} class="px-3 py-0.5 rounded-md bg-foreground/10 border-3 border-transparent {disabled? 'disabled': ''}">{label}</a>

<style>
	a{
			transition-property: background-color, border-color;
			transition-duration: 200ms;
	}
	a:not(.disabled):hover{
			background: color-mix(in srgb, var(--color-primary) 30%, transparent);
			border-color: var(--color-primary);
	}
	a.disabled {
			pointer-events: none;
      user-select: none;
			opacity: 0.5;
			cursor: default;
	}
</style>