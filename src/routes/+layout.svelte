<script lang="ts">
	import '../app.css';
	import NavButton from '$lib/components/NavButton.svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { children } = $props();
	let login_popover_open = $state(false);
	let logged_in = $state(false);
	let theme: string | null = $state(null);

	onMount(() => {
		localStorage.setItem('theme', 'light'); // TODO: hardcoded light mode for now
		theme = localStorage.getItem('theme');
		if (theme !== null && theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.add('light');
		}
	});

	function toggleTheme() {
		document.documentElement.classList.toggle('dark');
		if (document.documentElement.classList.contains('dark')) {
			localStorage.setItem('theme', 'dark');
		} else {
			localStorage.setItem('theme', 'light');
		}
		theme = localStorage.getItem('theme');
	}
</script>

<header
	class="bg-base-100 border-base-300 m-8 grid grid-cols-[auto_1fr_auto_auto] items-center gap-8 rounded-xl border px-6 py-4 shadow-xs"
>
	<Icon name="logo" class="h-7 w-7" />
	<div id="title" class="text-lg font-medium">ClingoDashboard</div>
	<nav class="flex flex-row gap-2">
		<NavButton icon="dashboard" label="Overview" href="/" />
		<NavButton icon="task" label="Tasks" href="/tasks/" />
		<NavButton icon="history" label="History" href="#" disabled={true} />
		<NavButton icon="settings" label="Settings" href="#" disabled={true} />
	</nav>
	<Button onclick={toggleTheme} size="icon" shape="round" variant="ghost">
		{#if theme == 'light'}
			<Icon name="dark" class="h-5 w-5" />
		{:else}
			<Icon name="light" class="h-5 w-5" />
		{/if}
	</Button>
</header>
<main class="px-8">
	{@render children()}
</main>
<div id="login-reminder" class="login-popover {login_popover_open ? '' : 'closed'}">
	{#if logged_in}
		<div class="flex flex-col gap-4">
			<Button class="flex justify-center">Logout</Button>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<Button
					class="flex justify-center"
					variant="secondary"
					onclick={() => {
						login_popover_open = false;
					}}>Sign-Up</Button
				>
				<Button
					class="flex justify-center"
					variant="secondary"
					onclick={() => {
						login_popover_open = false;
					}}>Log-In</Button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.login-popover {
		position: absolute;
		right: calc(theme('width.8') + theme('width.4'));
		top: calc(theme('height.16') + theme('height.1'));
		width: theme('width.80');
		padding: theme('width.4');
		background: color-mix(in srgb, #000 50%, transparent);
		border-radius: theme('borderRadius.lg');
		backdrop-filter: blur(20px);
		transition-property: opacity, top;
		transition-duration: 200ms;
		opacity: 1;
		z-index: 10;
	}
	.login-popover.closed {
		top: calc(theme('height.14'));
		opacity: 0;
		pointer-events: none;
	}
</style>
