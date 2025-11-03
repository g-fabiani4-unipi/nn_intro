<script>
	import { onDestroy, onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	export let width;
	export let height;
	export let contextName = 'canvas';

	const drawFunctions = [];

	let canvas;
	let ctx;
	let pendingInvalidation = false;
	let frameId;

	function update() {
		if (!ctx) return;

		ctx.clearRect(0, 0, width, height);
		drawFunctions.forEach((fn) => {
			ctx.save();
			fn(ctx);
			ctx.restore();
		});

		pendingInvalidation = false;
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
	});

	onDestroy(() => {
		if (frameId) {
			cancelAnimationFrame(frameId);
		}
	});

	$: setContext(contextName, {
		register(fn) {
			drawFunctions.push(fn);
		},
		deregister(fn) {
			drawFunctions.splice(drawFunctions.indexOf(fn), 1);
		},
		invalidate(fn) {
			if (pendingInvalidation) return;
			pendingInvalidation = true;
			frameId = requestAnimationFrame(update);
		},
	});
</script>

<canvas
	bind:this={canvas}
	width={width}
	height={height}
	transition:fade={{ duration: 1000 }}
/>
<slot />

<style>
	canvas {
		position: var(--position);
	}
</style>
