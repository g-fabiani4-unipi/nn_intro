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
		interpolateLab,
	} from 'd3';
	import Scrolly from '../UI/Scrolly.svelte';
	import checkScrollDir from '../utils/checkScrollDir';
	import { allSteps, blackOlive, gray, positiveColor } from '../constants';
	import Pixel from '../GraphComponents/Pixel.svelte';
	import Circle from '../GraphComponents/Circle.svelte';
	import Line from '../GraphComponents/Line.svelte';
	import Text from '../GraphComponents/Text.svelte';
	import Example from '../GraphComponents/Example.svelte';
	import Canvas from '../GraphComponents/Canvas.svelte';
	import BarplotBar from '../GraphComponents/BarplotBar.svelte';

	export let network;
	export let scrollDir;

	const steps = allSteps['mnist'];

	const maxPixelWidth = 12;
	const width = 900;
	const innerHeight = maxPixelWidth * 64;
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

	let currentStep;
	let digits;
	let testExample;
	let decomposeInput;
	let enterInputNodes;
	let enterOutpuNodes;
	let enterHiddenNodes;
	let enterLinks;
	let imgPixels = [];
	let nodes;
	let links;
	let xScale;
	let yScale;
	let pixelWidth = 4;
	let enterExamples = false;
	let split = false;
	let magnify = false;
	let colorLinks = false;

	$: console.log('scroll direction', scrollDir);

	// Handle scrollytelling steps
	$: {
		if (steps && digits && currentStep >= 0) {
			enterExamples =
				currentStep >= steps.findIndex((s) => s.name === 'enter_examples');
			split =
				currentStep >= steps.findIndex((s) => s.name === 'train_test_split');
			if (currentStep >= steps.findIndex((s) => s.name == 'magnify')) {
				pixelWidth = maxPixelWidth;
				magnify = true;
			} else {
				pixelWidth = 4;
				magnify = false;
			}
			decomposeInput =
				currentStep >= steps.findIndex((s) => s.name === 'decompose_input');
			enterInputNodes =
				currentStep >= steps.findIndex((s) => s.name == 'enter_input_nodes');
			enterOutpuNodes =
				currentStep >= steps.findIndex((s) => s.name === 'enter_output_nodes');
			enterHiddenNodes =
				currentStep >= steps.findIndex((s) => s.name === 'enter_hidden_nodes');
			enterLinks =
				currentStep >= steps.findIndex((s) => s.name === 'enter_links');
			colorLinks = currentStep >= steps.findIndex((s) => s.name === 'train');

			if (currentStep >= steps.findIndex((s) => s.name === 'test')) {
				testExample = digits[75];
			} else {
				testExample = null;
			}
			if (steps[currentStep].name === 'test_2') {
				testExample = digits[80];
			}
			if (steps[currentStep].name === 'test_3') {
				testExample = digits[94];
			}
		} else {
			// Set initial values
			decomposeInput = false;
			enterInputNodes = false;
			enterOutpuNodes = false;
			enterHiddenNodes = false;
			enterLinks = false;
			colorLinks = false;
			pixelWidth = 4;
			enterExamples = false;
			split = false;
			magnify = false;
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
		<div class="sticky loading">loading...</div>
	{:else}
		<div class="sticky main-part">
			<div style="height: 100vh;">
				<Canvas
					height={height}
					width={width}
					scale={true}
					margin={margin}
					responsive={true}
				>
					{#each digits as digit, i}
						<Example
							x={!enterExamples ? -200 : (i % 10) * 11 * pixelWidth + 20}
							y={split && digit.group === 'test'
								? Math.floor(i / 10) * 11 * pixelWidth + 200
								: Math.floor(i / 10) * 11 * pixelWidth}
							pixelWidth={pixelWidth}
							stroke={nodeStrokeStyle}
							scale={grayScale}
							digit={digit}
							opacity={magnify ? 0 : 1}
						/>
					{/each}

					{#each links as link}
						<Line
							x1={link.source.cx}
							y1={link.source.cy}
							x2={link.target.cx}
							y2={link.target.cy}
							stroke={colorLinks
								? colorScale(link.weight)
								: interpolateLab(nodeStrokeStyle, 'white')(0.6)}
							opacity={enterLinks ? 1 : 0}
						/>
					{/each}
					{#each imgPixels as pixel (pixel.id)}
						<Pixel
							x={enterInputNodes
								? xScale(1) - nodeRadius
								: decomposeInput
									? 4
									: (pixel.index % 8) * maxPixelWidth + 20}
							y={enterInputNodes && pixel.node
								? pixel.node.cy - nodeRadius
								: enterInputNodes && !pixel.node
									? innerHeight / 2 - nodeRadius
									: decomposeInput
										? pixel.index * maxPixelWidth
										: Math.floor(pixel.index / 8) * maxPixelWidth}
							width={enterInputNodes ? nodeRadius * 2 : maxPixelWidth}
							fill={enterOutpuNodes ? nodeFill : grayScale(pixel.value)}
							opacity={!magnify ? 0 : enterInputNodes && !pixel.node ? 0 : 1}
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
							width={testExample ? barScale(testExample.proba[i]) : 0}
							value={testExample ? testExample.proba[i] : 0}
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
					<Example
						x={testExample ? innerWidth - maxPixelWidth * 8 : innerWidth + 100}
						y={0}
						pixelWidth={maxPixelWidth}
						stroke={nodeStrokeStyle}
						scale={grayScale}
						digit={testExample}
					/>
				</Canvas>
			</div>
		</div>
	{/if}
</section>
