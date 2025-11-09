<script>
	import {
		interpolateGreys,
		json,
		scaleLinear,
		scaleSequential,
		extent,
		max,
		scaleSequentialSqrt,
		interpolatePiYG,
	} from 'd3';
	import Scrolly from '../UI/Scrolly.svelte';
	import { allSteps } from '../constants';
	import GraphContainer from '../GraphComponents/GraphContainer.svelte';
	import Pixel from '../GraphComponents/Pixel.svelte';

	export let network;

	const steps = allSteps['mnist'];
	const pixelWidth = 12;
	const grayScale = scaleSequential([0, 15], interpolateGreys);
	const colorScale = scaleSequentialSqrt([-1, 1], interpolatePiYG);

	let currentStep;
	let digits;
	let decomposeInput = false;
	let enterInputNodes = false;
	let enterOutpuNodes = false;
	let enterHiddenNodes = false;
	let enterLinks = false;
	let imgPixels = [];
	let currentPixels = [];
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
				currentPixels = imgPixels.filter((p) => p.node);
			} else {
				enterInputNodes = false;
				currentPixels = imgPixels;
			}
			if (
				currentStep >= steps.findIndex((s) => s.name == 'enter_output_nodes')
			) {
				enterOutpuNodes = true;
			} else {
				enterOutpuNodes = false;
			}

			if (
				currentStep >= steps.findIndex((s) => s.name === 'enter_hidden_nodes')
			) {
				enterHiddenNodes = true;
			} else {
				enterHiddenNodes = false;
			}
			if (currentStep >= steps.findIndex((s) => s.name === 'enter_links')) {
				enterLinks = true;
			} else {
				enterLinks = false;
			}
		}
	}

	json('./data/digits.json').then((result) => (digits = result));

	$: if (digits && network) {
		const data = network['mnist_perceptron'];
		nodes = data.nodes;

		const xScale = scaleLinear()
			.domain(extent(Object.keys(data.dims)))
			.range([networkXPadding, innerWidth - networkXPadding * 4]);

		const yScale = scaleLinear()
			.domain([1, max(Object.values(data.dims))])
			.range([nodeRadius, innerHeight - nodeRadius]);

		nodes.forEach((node) => {
			node.cx = xScale(node.layer);
			node.cy = yScale(
				node.order +
					(max(Object.values(data.dims)) - data.dims[node.layer]) / 2,
			);

			imgPixels = digits[0].img.map((v, i) => {
				const id = 'x' + (i + 1);
				return {
					id: id,
					value: v,
					index: i,
					node: nodes.find((n) => n.id === id),
				};
			});

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
				{#if enterLinks}
					{#each links as link}
						<line
							x1={link.source.cx}
							y1={link.source.cy}
							x2={link.target.cx}
							y2={link.target.cy}
							stroke={colorScale(link.weight)}
						/>
					{/each}
				{/if}
				{#each currentPixels as pixel, i (pixel.id)}
					<Pixel
						x={enterInputNodes
							? pixel.node.cx - nodeRadius
							: decomposeInput
								? 4
								: (pixel.index % 8) * pixelWidth + 20}
						y={enterInputNodes
							? pixel.node.cy - nodeRadius
							: decomposeInput
								? pixel.index * pixelWidth
								: Math.floor(pixel.index / 8) * pixelWidth}
						width={enterInputNodes ? nodeRadius * 2 : pixelWidth}
						fill={enterOutpuNodes ? 'white' : grayScale(pixel.value)}
						index={pixel.index}
						round={enterInputNodes}
						strokeWidth={enterInputNodes ? 2 : 0.5}
						delay={!enterInputNodes}
					/>
				{/each}
				{#if enterOutpuNodes}
					{#each nodes.filter((n) => n.id.startsWith('o')) as node, i (node.id)}
						<circle
							{...node}
							r={nodeRadius}
							fill="white"
						/>
						<text
							x={node.cx + 15}
							y={node.cy + nodeRadius / 2}
							dominant-baseline="pending"
							text-anchor="right"
							>{i}
						</text>
					{/each}
				{/if}
				{#if enterHiddenNodes}
					{#each nodes.filter((n) => n.id.startsWith('h') || n.id.startsWith('k')) as node (node.id)}
						<circle
							{...node}
							r={nodeRadius}
							fill="white"
						/>
					{/each}
				{/if}
			</GraphContainer>
		</div>
	{/if}
</section>

<style>
	circle {
		stroke: var(--black-olive);
		stroke-width: 2px;
	}
</style>
