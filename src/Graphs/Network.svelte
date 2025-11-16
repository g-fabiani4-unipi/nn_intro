<script>
	import {
		forceCenter,
		forceLink,
		forceSimulation,
		forceX,
		forceY,
		scaleLinear,
		forceManyBody,
		interpolatePiYG,
		scaleSequentialSymlog,
		scaleSqrt,
	} from 'd3';
	import GraphContainer from '../GraphComponents/GraphContainer.svelte';
	import NetworkNode from '../GraphComponents/NetworkNode.svelte';
	import NetworkLink from '../GraphComponents/NetworkLink.svelte';
	import { params } from '../stores';

	export let network;
	export let showNetwork;
	export let currentNetwork;
	export let disableInput;

	const width = 800;
	const height = 400;
	const nodeRadius = 25;

	const xScale = scaleLinear().domain([1, 5]).range([0, innerWidth]);
	const colorScale = scaleSequentialSymlog([-7, 7], interpolatePiYG);
	const linkScale = scaleSqrt().domain([0, 10]).range([3, 15]);

	$: simulation = forceSimulation(network[currentNetwork].nodes);
	let nodes = [];
	let links = [];
	$: simulation.on('tick', () => {
		nodes = simulation.nodes();
		if (nodes) {
			links = network[currentNetwork].links.map((link) => {
				const source = nodes.find((node) => node.id == link.source.id);
				const target = nodes.find((node) => node.id == link.target.id);
				return {
					x1: source.x,
					x2: target.x,
					y1: source.y,
					y2: target.y,
				};
			});
		}
	});

	$: {
		console.log('running simulation');
		simulation
			.force(
				'link',
				forceLink()
					.id(function (d) {
						return d.id;
					})
					.links(network[currentNetwork].links)
					.distance(70),
			)
			.force('x', forceX((d) => xScale(d.layer)).strength(0.15))
			.force(
				'y',
				forceY((d) => (d.id[0] == 'b' ? 400 : 0)),
			)
			.force('charge', forceManyBody().strength(-3800))
			.force('center', forceCenter(width / 2, height / 2).strength(0.5));
	}
</script>

<div id="output-graph-container">
	<GraphContainer
		width={width}
		height={height}
		responsive={true}
	>
		{#if showNetwork}
			{#each links as link, i}
				<NetworkLink
					link={link}
					colorScale={colorScale}
					linkScale={linkScale}
					disableInput={disableInput}
					bind:weight={$params[i]}
				/>
			{/each}
			{#each nodes as node (node.id)}
				<NetworkNode
					node={node}
					nodeRadius={nodeRadius}
				/>
			{/each}
		{/if}
	</GraphContainer>
</div>

<style>
	#output-graph-container {
		max-width: 800px;
		max-height: 400px;
		width: 100%;
		margin: 0;
	}
</style>
