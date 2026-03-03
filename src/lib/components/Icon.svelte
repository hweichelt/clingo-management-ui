<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		name: string;
	}

	let { name }: ButtonProps = $props();
</script>

<div class="dark:invert">
	<img src="/icons/{name}.svg" alt="name">
</div>