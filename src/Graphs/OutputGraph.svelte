<script>
	import Canvas from '../GraphComponents/Canvas.svelte';
	import Heatmap from '../GraphComponents/Heatmap.svelte';
	import GraphContainer from '../GraphComponents/GraphContainer.svelte';
	import Axis from '../GraphComponents/Axis.svelte';
	import { scaleLinear, scaleOrdinal } from 'd3';
	import { fly } from 'svelte/transition';
	import { negativeColor, positiveColor } from '../constants';

	export let currentNetwork;
	export let data;
	export let targetFunc;
	export let highlightExample;
	export let removeHighlight;
	export let showData;
	export let showCanvas;

	const margin = { top: 10, right: 10, bottom: 10, left: 10 };

	const innerWidth = 300;
	const innerHeight = 300;
	const width = innerWidth + margin.left + margin.right;
	const height = innerHeight + margin.top + margin.bottom;

	const xScale = scaleLinear().domain([-2, +2]).range([0, innerWidth]);
	const yScale = scaleLinear().domain([-2, +2]).range([innerHeight, 0]);

	const colorScale = scaleOrdinal()
		.domain([-1, +1])
		// @ts-ignore
		.range([negativeColor, positiveColor]);
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
				transition:fly={{ duration: 1000, y: -300, delay: 500 + i * 500 }}
				cx={xScale(d.x1)}
				cy={yScale(d.x2)}
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
	/>
	<Axis
		type="left"
		innerHeight={innerHeight}
		innerWidth={innerWidth}
		scale={yScale}
		offset={xScale(0)}
		tickValues={[-2, -1, 1, 2]}
	/>
</GraphContainer>

<style>
	circle {
		transition: all 300ms;
		stroke: var(--black-olive);
	}
</style>
