<script>
	import { interpolateGreys, json, scaleSequential } from 'd3';
	import Scrolly from '../UI/Scrolly.svelte';
	import { allSteps } from '../constants';
	import GraphContainer from '../GraphComponents/GraphContainer.svelte';
	import Pixel from '../GraphComponents/Pixel.svelte';

	export let network;

	const steps = allSteps['mnist'];
	const pixelWidth = 12;
	const colorScale = scaleSequential([0, 15], interpolateGreys);

	let currentStep;
	let digits;
	let decomposeInput = false;
	let imgPixels = [];

	const width = 900;
	const height = 800;
	const margin = { top: 10, left: 10, bottom: 10, right: 10 };

	// Handle scrollytelling steps
	$: if (steps && digits && currentStep >= 0) {
		if (currentStep >= steps.findIndex((s) => s.name == 'decompose_input')) {
			decomposeInput = true;
		} else {
			decomposeInput = false;
		}
	}

	json('./data/digits.json').then((result) => (digits = result));
	$: network && console.log(network['mnist_perceptron'].dims);
	$: if (digits) {
		imgPixels = digits[0].img.map((v, i) => ({
			id: 'x' + i,
			value: v,
		}));
	}
</script>

<section class="section-container">
	<div class="steps-container">
		<Scrolly bind:value={currentStep}>
			{#each steps as { text }, i}
				<div
					class="step"
					class:active={currentStep === i}
				>
					<div class="step-content">{@html text}</div>
				</div>
			{/each}
		</Scrolly>
	</div>
	{#if !(network && digits)}
		<div class="loading">loading...</div>
	{:else}
		<div class="sticky main-part">
			<GraphContainer
				height={height}
				width={width}
				margin={margin}
			>
				{#each imgPixels as pixel, i (pixel.id)}
					<Pixel
						x={decomposeInput ? 4 : (i % 8) * pixelWidth + 20}
						y={decomposeInput ? i * pixelWidth : Math.floor(i / 8) * pixelWidth}
						width={pixelWidth}
						fill={colorScale(pixel.value)}
						index={i}
					/>
				{/each}
			</GraphContainer>
		</div>
	{/if}
</section>
