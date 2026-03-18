<script>
	import { onDestroy, onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	export let width;
	export let height;
	export let scale = false;
	export let responsive = false;
	export let margin = { top: 0, right: 0, bottom: 0, left: 0 };
	export let contextName = 'canvas';

	const drawFunctions = [];

	let canvas;
	let ctx;
	let pendingInvalidation = false;
	let frameId;

	function scaleCanvas(canvas, ctx, width, height) {
		const devicePixelRatio = window.devicePixelRatio || 1;

		canvas.width = width * devicePixelRatio;
		canvas.height = height * devicePixelRatio;
		if (!responsive) {
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
		}
		ctx.scale(devicePixelRatio, devicePixelRatio);
	}

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

	$: setContext('margin', margin);

	$: if (canvas && ctx && scale) scaleCanvas(canvas, ctx, width, height);
</script>

<canvas
	bind:this={canvas}
	width={width}
	height={height}
	transition:fade={{ duration: 1000 }}
	class:responsive={responsive}
/>
<slot />

<style>
	canvas {
		position: var(--position);
	}
	canvas.responsive {
		max-width: 100%;
		max-height: 100%;
	}
</style>
