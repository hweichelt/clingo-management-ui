<script lang="ts">
	import type { Snippet } from 'svelte';

	interface DashboardPanelProps {
		label: string;
		class?: string;
		children: Snippet;
	}

	let { label, class: className = '', children }: DashboardPanelProps = $props();
</script>

<div
	class="bg-base-100 border-base-300 flex flex-col gap-4 rounded-xl border p-4 shadow-xs backdrop-blur-lg {className}"
>
	<div class="bg-base-200 text-base-content self-start rounded-full px-4 py-2 text-sm font-bold">
		<span class="opacity-60">{label}</span>
	</div>
	{@render children()}
</div>
