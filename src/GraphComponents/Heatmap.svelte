<script>
	import { afterUpdate, getContext, onDestroy, onMount } from 'svelte';
	import { rgb } from 'd3-color';
	import { tweened } from 'svelte/motion';

	export let network;
	export let currentNetwork;
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

	const w11 = tweened(0, tweenParams);
	const w21 = tweened(0, tweenParams);
	const w01 = tweened(0, tweenParams);
	const w12 = tweened(0, tweenParams);
	const w22 = tweened(0, tweenParams);
	const w02 = tweened(0, tweenParams);
	const w1y = tweened(0, tweenParams);
	const w2y = tweened(0, tweenParams);
	const w0y = tweened(0, tweenParams);

	$: w11.set(network[currentNetwork].links[0].weight);
	$: w21.set(network[currentNetwork].links[1].weight);
	$: w01.set(network[currentNetwork].links[2].weight);
	$: if (currentNetwork == 'ml_perceptron') {
		w12.set(network[currentNetwork].links[3].weight);
		w22.set(network[currentNetwork].links[4].weight);
		w02.set(network[currentNetwork].links[5].weight);
		w1y.set(network[currentNetwork].links[6].weight);
		w2y.set(network[currentNetwork].links[7].weight);
		w0y.set(network[currentNetwork].links[8].weight);
	}

	function sign(num) {
		return num >= 0 ? 1 : -1;
	}

	function classify(x1, x2) {
		if (currentNetwork == 'perceptron') {
			return sign(x1 * $w11 + x2 * $w21 + $w01);
		}
		const h1 = sign(x1 * $w11 - x2 * $w21 + $w01);
		const h2 = sign(x1 * $w12 - x2 * $w22 + $w02);
		return sign($w1y * h1 + $w2y * h2 + $w0y);
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
