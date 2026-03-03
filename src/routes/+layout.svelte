<script lang="ts">
	import '../app.css';
	import NavButton from '$lib/components/NavButton.svelte';
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/Button.svelte';
	import { message_state } from '$lib/state/messages.svelte';
	import Message from '$lib/components/Message.svelte';
	import { user_state } from '$lib/state/user.svelte';

	let { children } = $props();
	let login_popover_open = $state(false);

	onMount(() => {
		localStorage.setItem('theme', 'light'); // TODO: hardcoded light mode for now
		const theme = localStorage.getItem('theme');
		if (theme !== null && theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.add('light');
		}
		user_state.update(window);
	});

	function toggleTheme() {
		document.documentElement.classList.toggle('dark');
		if (document.documentElement.classList.contains('dark')) {
			localStorage.setItem('theme', 'dark');
		} else {
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<header class="m-8 grid grid-cols-[auto_1fr_auto] items-center gap-8 rounded-xl p-4">
	<img src="/logo.svg" class="h-7 w-7 invert" alt="logo" />
	<div id="title" class="text-base font-bold opacity-95">CLINGO DASH</div>
	<nav class="flex flex-row gap-2">
		<NavButton label="Overview" href="/" />
		<NavButton label="Tasks" href="/tasks/" />
		<NavButton label="History" href="#" disabled={true} />
		<NavButton label="Settings" href="#" disabled={true} />
	</nav>
	<button onclick={toggleTheme}>Mode</button>
</header>
<main class="px-8">
	{@render children()}
</main>
<div id="login-reminder" class="login-popover {login_popover_open ? '' : 'closed'}">
	{#if user_state.logged_in}
		<div class="flex flex-col gap-4">
			<div>Logged in</div>
			<div>{user_state.username}</div>
			<div>{user_state.email}</div>
			<Button
				class="flex justify-center"
				href="/auth/logout"
				onclick={() => {
					login_popover_open = false;
				}}>Logout</Button
			>
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
	header {
		background: color-mix(in srgb, var(--color-foreground) 10%, transparent);
		backdrop-filter: blur(100px);
	}
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
