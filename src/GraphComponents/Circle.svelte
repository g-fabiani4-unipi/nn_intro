<script>
	import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
	import { tweened } from 'svelte/motion';
	export let cx;
	export let cy;
	export let r;
	export let strokeWidth = 1;
	export let stroke = null;
	export let fill;
	export let opacity;
	export let delay = null;
	export let contextName = 'canvas';

	const { register, deregister, invalidate } = getContext(contextName);
	const margin = getContext('margin');

	const tweenParams = {
		duration: 1000,
		delay: 0 || delay,
	};
	const tX = tweened(cx, tweenParams);
	const tY = tweened(cy, tweenParams);
	const tOpacity = tweened(opacity, tweenParams);

	function draw(ctx) {
		ctx.translate(margin.left, margin.top);
		ctx.globalAlpha = $tOpacity;
		ctx.fillStyle = fill;
		ctx.strokeStyle = stroke;
		ctx.lineWidth = strokeWidth;
		ctx.beginPath();
		ctx.arc($tX, $tY, r, 0, 2 * Math.PI, false);
		ctx.fill();
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

	$: tX.set(cx);
	$: tY.set(cy);
	$: tOpacity.set(opacity);
</script>
