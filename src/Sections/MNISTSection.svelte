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
	import { allSteps, blackOlive, gray, positiveColor } from '../constants';
	import Pixel from '../GraphComponents/Pixel.svelte';
	import Circle from '../GraphComponents/Circle.svelte';
	import Line from '../GraphComponents/Line.svelte';
	import Text from '../GraphComponents/Text.svelte';
	import Canvas from '../GraphComponents/Canvas.svelte';
	import { fade, fly } from 'svelte/transition';
	import BarplotBar from '../GraphComponents/BarplotBar.svelte';
	import GraphContainer from '../GraphComponents/GraphContainer.svelte';

	export let network;

	const steps = allSteps['mnist'];

	const pixelWidth = 12;
	const smallerPixelWidth = 8;
	const width = 900;
	const innerHeight = pixelWidth * 64;
	const margin = { top: 30, left: 30, bottom: 30, right: 30 };
	const innerWidth = width - margin.left - margin.right;
	const height = innerHeight + margin.top + margin.bottom;
	const networkXPadding = 30;
	const nodeRadius = 10;
	const nodeFill = gray;
	const nodeStrokeStyle = blackOlive;
	const nodeStrokeWidth = 2;
	const barFill = positiveColor;
	const grayScale = scaleSequential([0, 15], interpolateGreys);
	const colorScale = scaleSequentialSqrt([-1, 1], interpolatePiYG);
	const barScale = scaleLinear().domain([0, 1]).range([0, 180]);

	let currentStep = 0;
	let digits;
	let clickedDigit;
	let decomposeInput;
	let enterInputNodes;
	let enterOutpuNodes;
	let enterHiddenNodes;
	let enterLinks;
	let enterTestExamples;
	let imgPixels = [];
	let nodes;
	let links;
	let xScale;
	let yScale;

	// Handle scrollytelling steps
	$: {
		if (steps && digits && currentStep >= 0) {
			if (currentStep >= steps.findIndex((s) => s.name == 'decompose_input')) {
				decomposeInput = true;
			} else {
				decomposeInput = false;
			}
			enterInputNodes =
				currentStep >= steps.findIndex((s) => s.name == 'enter_input_nodes');
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
			if (currentStep >= steps.findIndex((s) => s.name === 'end')) {
				enterTestExamples = true;
			} else {
				enterTestExamples = false;
				clickedDigit = null;
			}
		} else {
			// Set initial values
			decomposeInput = false;
			enterInputNodes = false;
			enterOutpuNodes = false;
			enterHiddenNodes = false;
			enterLinks = false;
			enterTestExamples = false;
		}
	}

	json('./data/digits.json').then((result) => (digits = result));

	$: if (digits && network) {
		const data = network['mnist_perceptron'];
		nodes = data.nodes;

		xScale = scaleLinear()
			.domain(extent(Object.keys(data.dims)))
			.range([networkXPadding, innerWidth - 230]);

		yScale = scaleLinear()
			.domain([1, max(Object.values(data.dims))])
			.range([nodeRadius, innerHeight - nodeRadius]);

		nodes.forEach((node) => {
			node.cx = xScale(node.layer);
			node.cy = yScale(
				node.order +
					(max(Object.values(data.dims)) - data.dims[node.layer]) / 2,
			);

			imgPixels = digits[1].img.map((v, i) => {
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

	function handleClickDigit(digit) {
		clickedDigit = digit;
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
		<div class="sticky loading">loading...</div>
	{:else}
		<div class="sticky main-part">
			<div style="height: 100vh;">
				<Canvas
					height={height}
					width={width}
					scale={true}
					margin={margin}
					--position="absolute"
				>
					{#each links as link}
						<Line
							x1={link.source.cx}
							y1={link.source.cy}
							x2={link.target.cx}
							y2={link.target.cy}
							stroke={colorScale(link.weight)}
							opacity={enterLinks ? 1 : 0}
						/>
					{/each}
					{#each imgPixels as pixel (pixel.id)}
						<Pixel
							x={enterInputNodes
								? xScale(1) - nodeRadius
								: decomposeInput
									? 4
									: (pixel.index % 8) * pixelWidth + 20}
							y={enterInputNodes && pixel.node
								? pixel.node.cy - nodeRadius
								: enterInputNodes && !pixel.node
									? innerHeight / 2 - nodeRadius
									: decomposeInput
										? pixel.index * pixelWidth
										: Math.floor(pixel.index / 8) * pixelWidth}
							width={enterInputNodes ? nodeRadius * 2 : pixelWidth}
							fill={enterOutpuNodes ? nodeFill : grayScale(pixel.value)}
							opacity={enterInputNodes && !pixel.node ? 0 : 1}
							index={pixel.index}
							round={enterInputNodes}
							strokeWidth={enterInputNodes ? nodeStrokeWidth : 0.5}
							stroke={nodeStrokeStyle}
							delay={!enterInputNodes}
						/>
					{/each}
					<!-- Dots -->
					{#each [-1, 0, 1] as dot}
						<Circle
							cx={xScale(1)}
							cy={innerHeight / 2 + dot * 20}
							fill={nodeStrokeStyle}
							stroke={nodeStrokeStyle}
							opacity={enterInputNodes ? 1 : 0}
							r={4}
							delay={1000}
						/>
					{/each}
					<!-- Output nodes -->
					{#each nodes.filter((n) => n.id.startsWith('o')) as node, i (node.id)}
						<Circle
							cx={enterOutpuNodes ? node.cx : node.cx + 300}
							cy={node.cy}
							fill={nodeFill}
							opacity={enterOutpuNodes ? 1 : 0}
							strokeWidth={nodeStrokeWidth}
							stroke={nodeStrokeStyle}
							r={nodeRadius}
						/>
						<Text
							x={enterOutpuNodes ? node.cx + 15 : node.cx + 15 + 300}
							y={node.cy}
							baseline="middle"
							color={nodeStrokeStyle}
							content={i}
							opacity={enterOutpuNodes ? 1 : 0}
						/>
						<BarplotBar
							x={innerWidth - 200}
							y={node.cy - nodeRadius}
							height={nodeRadius * 2}
							width={clickedDigit ? barScale(clickedDigit.proba[i]) : 0}
							value={clickedDigit ? clickedDigit.proba[i] : 0}
							stroke={nodeStrokeStyle}
							fill={barFill}
						/>
					{/each}
					<!-- Hidden nodes -->
					{#each nodes.filter((n) => n.id.startsWith('h') || n.id.startsWith('k')) as node}
						<Circle
							cx={node.cx}
							cy={enterHiddenNodes ? node.cy : node.cy + 300}
							fill={nodeFill}
							opacity={enterHiddenNodes ? 1 : 0}
							strokeWidth={nodeStrokeWidth}
							stroke={nodeStrokeStyle}
							r={nodeRadius}
						/>
					{/each}
				</Canvas>
				<GraphContainer
					width={width}
					height={height}
					margin={margin}
					--position="absolute"
				>
					{#each digits as digit, i}
						{#if enterTestExamples}
							<g
								transform="translate({innerWidth -
									((i + 1) * smallerPixelWidth * 8 +
										i * smallerPixelWidth)}, 0)"
								role="button"
								tabindex={i + 1}
								on:keypress={() => handleClickDigit(digit)}
								on:click={() => handleClickDigit(digit)}
								transition:fly={{ duration: 500, x: 300 }}
							>
								{#each digit.img as pixel, j}
									<rect
										x={(j % 8) * smallerPixelWidth}
										y={Math.floor(j / 8) * smallerPixelWidth}
										height={smallerPixelWidth}
										width={smallerPixelWidth}
										fill={grayScale(pixel)}
										stroke={nodeStrokeStyle}
										stroke-width={0.5}
									/>
								{/each}
								<rect
									class:clicked={clickedDigit === digit}
									class="example-button"
									height={smallerPixelWidth * 8}
									width={smallerPixelWidth * 8}
									stroke-width={3}
									fill="none"
								/>
							</g>
						{/if}
					{/each}
				</GraphContainer>
			</div>
		</div>
	{/if}
</section>

<style>
	.example-button.clicked {
		stroke: var(--hunyadi-yellow);
	}
</style>
