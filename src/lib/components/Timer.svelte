<script lang="ts">

	interface TimerProps {
		start_time: string;
	}

	let { start_time }: TimerProps = $props();
</script>

<div class="timer border-2 border-foreground/50 text-foreground/90 bg-foreground/10 px-4 py-2 rounded-xl">
	{start_time}
</div>

<style>
	.timer{
			box-shadow: inset 0 0 theme("width.4") rgba(255,255,255,0.1);
	}
</style>