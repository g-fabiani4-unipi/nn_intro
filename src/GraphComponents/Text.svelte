<script>
	import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
	import { tweened } from 'svelte/motion';

	export let content;
	export let x;
	export let y;
	export let baseline;
	export let color = null;
	export let opacity = 1;
	export let contextName = 'canvas';
	export let tweenParams = {
		duration: 1000,
	};

	const { register, deregister, invalidate } = getContext(contextName);
	const margin = getContext('margin');

	const tX = tweened(x, tweenParams);
	const tY = tweened(y, tweenParams);
	const tOpacity = tweened(opacity, tweenParams);

	function draw(ctx) {
		ctx.translate(margin.left, margin.top);
		ctx.globalAlpha = $tOpacity;
		ctx.fillStyle = color;
		ctx.font = '18px Roboto, sans-serif';
		ctx.textBaseline = baseline;
		ctx.fillText(content, $tX, $tY);
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

	$: tX.set(x);
	$: tY.set(y);
	$: tOpacity.set(opacity);
</script>
