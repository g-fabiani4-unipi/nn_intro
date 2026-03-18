<script>
	import { afterUpdate, getContext, onDestroy, onMount } from 'svelte';
	export let x;
	export let y;
	export let height;
	export let width;
	export let stroke = null;
	export let fill = null;
	export let opacity = 1;
	export let contextName = 'canvas';

	const { register, deregister, invalidate } = getContext(contextName);
	const margin = getContext('margin');

	function draw(ctx) {
		if (width) {
			ctx.translate(margin.left, margin.top);
			ctx.globalAlpha = opacity;
			ctx.fillStyle = fill;
			ctx.strokeStyle = stroke;
			ctx.beginPath();
			ctx.fillRect(x, y, width, height);
			ctx.strokeRect(x, y, width, height);
			ctx.fill();
			ctx.stroke();
		}
	}

	onMount(() => {
		register(draw);
		invalidate();
	});

	onDestroy(() => {
		deregister(draw);
	});

	afterUpdate(() => {
		invalidate();
	});
</script>
