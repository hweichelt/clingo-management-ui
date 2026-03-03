<script lang="ts">
	import type { Message } from '$lib/state/messages.svelte';

	interface InputProps {
		message: Message;
	}

	let { message }: InputProps = $props();
</script>

<div class="message border-2 border-foreground/50 bg-foreground/10 px-4 py-1.5 rounded-lg type-{message.type}">
	{message.message}
</div>

<style>
	.message {
			transition: 200ms;
			backdrop-filter: blur(20px);
			animation: fadein 5s forwards ease-in-out;
	}
	.type-success{
			border-color: var(--color-green-500);
			background: color-mix(in srgb, var(--color-green-500) 50%, transparent);
	}
  .type-error{
      border-color: var(--color-red-500);
      background: color-mix(in srgb, var(--color-red-500) 50%, transparent);
  }
  .type-warning{
      border-color: var(--color-orange-600);
      background: color-mix(in srgb, var(--color-orange-600) 50%, transparent);
  }
	@keyframes fadein {
			0%{
					opacity: 0;
					transform: translateY(theme("spacing.4"));
			}
			5%{
					opacity: 1;
          transform: translateY(0);
      }
			95%{
					opacity: 1;
          transform: translateY(0);
      }
			100%{
					opacity: 0;
          transform: translateY(calc(-1 * theme("spacing.4")));
      }
  }
</style>