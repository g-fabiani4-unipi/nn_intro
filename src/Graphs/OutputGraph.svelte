<script>
	import Canvas from '../GraphComponents/Canvas.svelte';
	import Heatmap from '../GraphComponents/Heatmap.svelte';
	import GraphContainer from '../GraphComponents/GraphContainer.svelte';
	import Axis from '../GraphComponents/Axis.svelte';
	import { scaleLinear, scaleOrdinal } from 'd3';
	import { fly } from 'svelte/transition';
	import { negativeColor, positiveColor } from '../constants';
	import { params, selectedNode } from '../stores';

	export let currentNetwork;
	export let data;
	export let targetFunc;
	export let highlightExample;
	export let removeHighlight;
	export let showData;
	export let showCanvas;
	export let showHiddenLayer;

	const margin = { top: 20, right: 10, bottom: 10, left: 20 };

	const innerWidth = 300;
	const innerHeight = 300;
	const width = innerWidth + margin.left + margin.right;
	const height = innerHeight + margin.top + margin.bottom;

	const xScale = scaleLinear().domain([-2, +2]).range([0, innerWidth]);
	const yScale = scaleLinear().domain([-2, +2]).range([innerHeight, 0]);

	$: showProjection = showHiddenLayer && $selectedNode === null;

	const colorScale = scaleOrdinal()
		.domain([-1, +1])
		// @ts-ignore
		.range([negativeColor, positiveColor]);

	function hiddenFeatures(d, $params) {
		const features = {
			h1: d.x1 * $params[0] + d.x2 * $params[1] + $params[2] >= 0 ? 1 : -1,
			h2: d.x1 * $params[3] + d.x2 * $params[4] + $params[5] >= 0 ? 1 : -1,
		};
		return features;
	}
</script>

{#if showCanvas}
	<Canvas
		width={width}
		height={height}
		--position="absolute"
	>
		<Heatmap
			currentNetwork={currentNetwork}
			width={width}
			height={height}
			margin={margin}
			xScale={xScale}
			yScale={yScale}
			colorScale={colorScale}
			showProjection={showProjection}
		/>
	</Canvas>
{/if}
<GraphContainer
	width={width}
	height={height}
	margin={margin}
	--position="absolute"
>
	{#each data[targetFunc] as d, i}
		{#if showData}
			<circle
				transition:fly={{ duration: 1000, y: -300, delay: i * 500 }}
				cx={showProjection
					? xScale(hiddenFeatures(d, $params).h1)
					: xScale(d.x1)}
				cy={showProjection
					? yScale(hiddenFeatures(d, $params).h2)
					: yScale(d.x2)}
				r={d.highlighted ? 12 : 8}
				fill={colorScale(d.y)}
				on:mouseenter={() => highlightExample(d.example)}
				on:mouseleave={() => removeHighlight()}
				role="graphics-object"
			/>
		{/if}
	{/each}
	<Axis
		type="bottom"
		innerHeight={innerHeight}
		innerWidth={innerWidth}
		scale={xScale}
		offset={yScale(0)}
		tickValues={[-2, -1, 1, 2]}
		label={showProjection ? 'h1' : 'x1'}
	/>
	<Axis
		type="left"
		innerHeight={innerHeight}
		innerWidth={innerWidth}
		scale={yScale}
		offset={xScale(0)}
		tickValues={[-2, -1, 1, 2]}
		label={showProjection ? 'h2' : 'x2'}
	/>
</GraphContainer>

<style>
	circle {
		transition:
			all 1.5s ease,
			r 0.4s ease;
		stroke: var(--black-olive);
	}
</style>
