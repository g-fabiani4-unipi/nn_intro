<script>
	import { tweened } from 'svelte/motion';
	import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
	import { fly } from 'svelte/transition';
	import { interpolateLab } from 'd3';

	export let x;
	export let y;
	export let width;
	export let fill;
	export let index = 0;
	export let round = false;
	export let strokeWidth = 0.5;
	export let stroke = null;
	export let opacity = 1;
	export let delay = true;
	export let contextName = 'canvas';

	const { register, deregister, invalidate } = getContext(contextName);
	const margin = getContext('margin');
	const tX = tweened(x);
	const tY = tweened(y);
	const tFill = tweened(fill, { duration: 800, interpolate: interpolateLab });
	const corner = tweened(0, { duration: 500 });
	const tWidth = tweened(width, { duration: 500 });
	const tOpacity = tweened(opacity, { delay: 800, duration: 800 });

	function draw(ctx) {
		ctx.translate(margin.left, margin.top);
		ctx.globalAlpha = $tOpacity;
		ctx.fillStyle = $tFill;
		ctx.lineWidth = strokeWidth;
		ctx.strokeStyle = stroke;
		ctx.beginPath();
		ctx.roundRect($tX, $tY, $tWidth, $tWidth, [$corner, $corner]);
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

	$: tX.set(x, {
		duration: delay ? 500 : 1000,
		delay: delay ? index * 50 : 500,
	});
	$: tY.set(y, {
		duration: delay ? 500 : 1000,
		delay: delay ? index * 50 : 500,
	});

	$: round ? corner.set(50) : corner.set(0);
	$: tWidth.set(width);
	$: tFill.set(fill);
	$: tOpacity.set(opacity);
</script>
