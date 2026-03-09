<script>
	import { Plot, LineY, RuleY, AreaY, Text } from 'svelteplot';
	import { noise } from '../scripts/noise.js';

	const OFFSET_Y = 500;

	let rand = $state([]);
	let maxLen = $state(300);

	let mag = $state(1);

	function addLine() {
		do {
			const prevI = rand.length ? rand.at(-1).x : 200;
			mag = Math.pow(10, Math.floor(Math.log10(prevI) - 2));
			const i = prevI + mag;
			const pt = {
				x: i,
				y: OFFSET_Y + (noise(i / 40 / mag) * 100 - 50) * Math.log10(mag * 10) * 5
			};
			rand = [...rand.slice(-maxLen), pt];
		} while (rand.length < 150);
		// maxLen =
		//     noise(S + rand.at(-1).x / 60 / mag) * 80 + 300;
		window.requestAnimationFrame(addLine);
	}

	$effect(async () => {
		if (!rand.length) addLine();
	});
</script>

<Plot
	title="Memory Usage"
	grid
	inset={10}
	y={{ tickSpacing: 30, nice: true }}
	x={{ tickSpacing: 90, insetRight: 45 }}
	height={250}
>
	<RuleY data={[0]} />
	{#if rand.length > 1}
		<AreaY data={rand} x="x" y="y" opacity={0.1} />
		<LineY data={rand} x="x" y="y" markerEnd="dot" />
		<Text
			data={[rand.at(-1)]}
			x="x"
			y="y"
			fontWeight="bold"
			stroke="var(--bg-1)"
			strokeWidth={3}
			fill="currentColor"
			textAnchor="start"
			dx={6}
			text={(d) => `${d.y.toFixed(0)} (A)`}
		/>
	{/if}
</Plot>
