<script>
	import { interpolateLab } from 'd3';
	import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
	import { tweened } from 'svelte/motion';

	export let x1;
	export let y1;
	export let x2;
	export let y2;
	export let stroke;
	export let opacity;
	export let contextName = 'canvas';

	const { register, deregister, invalidate } = getContext(contextName);
	const margin = getContext('margin');

	const tweenParams = {
		duration: 1000,
	};
	const tOpacity = tweened(0, tweenParams);
	const tStroke = tweened(stroke, {
		duration: 600,
		interpolate: interpolateLab,
	});

	function draw(ctx) {
		ctx.translate(margin.left, margin.top);
		ctx.globalAlpha = $tOpacity;
		ctx.strokeStyle = $tStroke;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
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

	$: tOpacity.set(opacity);
	$: tStroke.set(stroke);
</script>
