<script>
	import { afterUpdate, getContext, onDestroy, onMount } from 'svelte';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { rgb } from 'd3-color';
	import { tweened } from 'svelte/motion';

	export let params;
	export let width;
	export let height;
	export let margin;
	export let xScale;
	export let yScale;
	export let colorScale;
	export let contextName = 'canvas';

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const tweenParams = {
		duration: 200,
	};

	const w1 = tweened(0, tweenParams);
	const w2 = tweened(0, tweenParams);
	const w0 = tweened(0, tweenParams);

	$: w1.set(+params[0]);
	$: w2.set(+params[1]);
	$: w0.set(+params[2]);

	function classify(x1, x2) {
		return x1 * $w1 + x2 * $w2 + $w0 >= 0 ? 1 : -1;
	}

	const { register, deregister, invalidate } = getContext(contextName);

	function draw(ctx) {
		const imageData = ctx.createImageData(innerWidth, innerHeight);

		for (let x2 = 0, p = -1; x2 < innerHeight; ++x2) {
			for (let x1 = 0; x1 < innerWidth; ++x1) {
				const y = classify(xScale.invert(x1), yScale.invert(x2));
				const color = rgb(colorScale(y));
				imageData.data[++p] = color.r;
				imageData.data[++p] = color.g;
				imageData.data[++p] = color.b;
				imageData.data[++p] = 160;
			}
		}
		ctx.putImageData(imageData, 20, 20);
	}

	onMount(() => {
		register(draw);
		invalidate();
	});

	onDestroy(() => {
		deregister(draw);
	});

	afterUpdate(invalidate);
</script>
