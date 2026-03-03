<script lang="ts">
	interface IconProps {
		name: string;
	}

	let { name }: IconProps = $props();
</script>

<div class="dark:invert">
	<img src="/icons/{name}.svg" alt="name" />
</div>
