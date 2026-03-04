<script lang="ts">
	interface IconProps {
		name: string;
		class?: string;
	}

	let { name, class: className = '' }: IconProps = $props();
</script>

<div class="dark:invert">
	<img src="/icons/{name}.svg" alt="name" class={className} />
</div>
