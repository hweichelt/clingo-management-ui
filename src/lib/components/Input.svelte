<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	interface InputProps {
		value: string;
		placeholder?: string;
		id?: string;
		class?: string;
		type: HTMLInputTypeAttribute;
		onclick?: () => void;
		oninput?: () => void;
		faulty?: boolean;
	}

	let { faulty = false, value = $bindable(""), placeholder, id, class: className = "", type, onclick, oninput }: InputProps = $props();
</script>

<div class="input relative flex overflow-hidden rounded-lg border-2 border-foreground/50 {faulty? 'error': ''}">
	<input {id} {placeholder} {type} {onclick} {oninput} bind:value={value} class="flex-1 px-4 py-2{className}">
		<div class="dynamic-placeholder text-xs text-foreground/65 px-2 py-0.5 bg-foreground/10 rounded 	{value.length > 0? '': 'hide'}">{placeholder}</div>
</div>

<style>
	.input{
		transition-property: background-color, border-color;
		transition-duration: 200ms;
	}
	.error{
		border-color: var(--color-red-500);
		background: color-mix(in srgb, var(--color-red-500) 30%, transparent);
	}
	.dynamic-placeholder{
		position: absolute;
		top: 50%;
		right: theme("spacing.4");
		transform: translateY(-50%);
		margin-left: theme("spacing.4");
		transition-property: right, transform;
		transition-duration: 200ms;
	}
	.dynamic-placeholder.hide{
		right: calc(-1 * theme("spacing.4"));
		transform: translate(100%, -50%);
	}
</style>