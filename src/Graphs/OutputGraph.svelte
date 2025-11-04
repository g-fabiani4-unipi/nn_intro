<script>
	import Canvas from '../GraphComponents/Canvas.svelte';
	import Heatmap from '../GraphComponents/Heatmap.svelte';
	import GraphContainer from '../GraphComponents/GraphContainer.svelte';
	import Axis from '../GraphComponents/Axis.svelte';
	import { scaleLinear, scaleOrdinal } from 'd3';
	import { fly } from 'svelte/transition';

	export let params;
	export let data;
	export let targetFunc;
	export let highlightExample;
	export let removeHighlight;
	export let showData;

	const width = 340;
	const height = 340;
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = scaleLinear().domain([-2, +2]).range([0, innerWidth]);
	const yScale = scaleLinear().domain([-2, +2]).range([innerHeight, 0]);

	const colorScale = scaleOrdinal()
		.domain([-1, +1])
		// @ts-ignore
		.range(['#C51B7D', '#7FBC41']);
</script>

<Canvas
	width={width}
	height={height}
	--position="absolute"
>
	<Heatmap
		params={params}
		width={width}
		height={height}
		margin={margin}
		xScale={xScale}
		yScale={yScale}
		colorScale={colorScale}
	/>
</Canvas>
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
				stroke="black"
				fill={colorScale(d.y)}
				on:mouseenter={() => highlightExample(d.example)}
				on:mouseleave={() => removeHighlight()}
				role="graphics-object"
			/>
		{/if}
	{/each}
	<Axis
		type="horizontal"
		innerHeight={innerHeight}
		innerWidth={innerWidth}
		scale={xScale}
	/>
	<Axis
		type="vertical"
		innerHeight={innerHeight}
		innerWidth={innerWidth}
		scale={yScale}
	/>
</GraphContainer>

<style>
	circle {
		transition: all 300ms;
	}
</style>
