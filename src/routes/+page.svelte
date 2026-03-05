<script>
	import DashboardPanel from '$lib/components/DashboardPanel.svelte';
	import PlotSystemResources from '$lib/components/PlotSystemResources.svelte';
	import ProcessCard from '$lib/components/ProcessCard.svelte';
</script>

<div class="grid grid-cols-[1fr_2fr] gap-4">
	<div
		class="bg-base-100 border-base-300 flex flex-col gap-4 rounded-xl border p-4 shadow-xs backdrop-blur-lg"
	>
		<div class="bg-base-200 text-base-content self-start rounded-full px-4 py-2 text-sm font-bold">
			<span class="opacity-60">Running Processes</span>
		</div>
		<div class="flex flex-col gap-2">
			<ProcessCard label="Massive Configuration" progress={0.67} />
			<ProcessCard label="Flatland" progress={0.33} />
			<ProcessCard label="Sudoku" progress={1} />
		</div>
	</div>
	<DashboardPanel label="System Resources">
		<div class="border-base-300 bg-base-200 rounded-md border px-4">
			<PlotSystemResources />
		</div>
	</DashboardPanel>
</div>
