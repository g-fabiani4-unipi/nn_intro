<script>
	import {
		interpolateGreys,
		json,
		scaleLinear,
		scaleSequential,
		extent,
		max,
	} from 'd3';
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
	let enterInputNodes = false;
	let imgPixels = [];
	let nodes;
	let links;

	const width = 900;
	const innerHeight = pixelWidth * 64;
	const margin = { top: 10, left: 10, bottom: 10, right: 10 };
	const innerWidth = width - margin.left - margin.right;
	const height = innerHeight + margin.top + margin.bottom;
	const networkXPadding = 30;
	const nodeRadius = 10;

	// Handle scrollytelling steps
	$: {
		if (steps && digits && currentStep >= 0) {
			if (currentStep >= steps.findIndex((s) => s.name == 'decompose_input')) {
				decomposeInput = true;
			} else {
				decomposeInput = false;
			}
			if (
				currentStep >= steps.findIndex((s) => s.name == 'enter_input_nodes')
			) {
				enterInputNodes = true;
			} else {
				enterInputNodes = false;
			}
		}
	}

	json('./data/digits.json').then((result) => (digits = result));

	$: if (digits) {
		imgPixels = digits[0].img.map((v, i) => ({
			id: 'x' + (i + 1),
			value: v,
		}));
	}

	$: if (network) {
		const data = network['mnist_perceptron'];
		nodes = data.nodes;

		const xScale = scaleLinear()
			.domain(extent(Object.keys(data.dims)))
			.range([networkXPadding, innerWidth - networkXPadding]);

		const yScale = scaleLinear()
			.domain([1, max(Object.values(data.dims))])
			.range([nodeRadius, innerHeight - nodeRadius]);

		console.log(yScale.domain());
		console.log(yScale.range());

		nodes.forEach((node) => {
			node.cx = xScale(node.layer);
			node.cy = yScale(
				node.order +
					(max(Object.values(data.dims)) - data.dims[node.layer]) / 2,
			);

			links = data.links.map((link) => ({
				...link,
				source: nodes.find((node) => node.id === link.source),
				target: nodes.find((node) => node.id === link.target),
			}));
		});
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
				{#if enterInputNodes}
					{#each nodes.filter( (node) => node.id.startsWith('x'), ) as node (node.id)}
						<circle
							class="newtork-node"
							{...node}
							r={nodeRadius}
						/>
					{/each}
				{:else}
					{#each imgPixels as pixel, i (pixel.id)}
						<Pixel
							x={decomposeInput ? 4 : (i % 8) * pixelWidth + 20}
							y={decomposeInput
								? i * pixelWidth
								: Math.floor(i / 8) * pixelWidth}
							width={pixelWidth}
							fill={colorScale(pixel.value)}
							index={i}
						/>
					{/each}
				{/if}
			</GraphContainer>
		</div>
	{/if}
</section>
