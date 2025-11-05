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

	export let network;
	export let showNetwork;
	export let currentNetwork;

	const width = 600;
	const height = 300;

	const xScale = scaleLinear().domain([1, 5]).range([0, innerWidth]);
	const colorScale = scaleSequentialSymlog([-7, 7], interpolatePiYG);
	const linkScale = scaleSqrt().domain([0, 7]).range([3, 10]);

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
					weight: link.weight,
				};
			});
		}
	});

	$: {
		console.log('running simulation');
		simulation
			.force(
				'link',
				forceLink() // This force provides links between nodes
					.id(function (d) {
						return d.id;
					}) // This provide  the id of a node
					.links(network[currentNetwork].links), // and this the list of links
			)
			.force('x', forceX((d) => xScale(d.layer)).strength(0.15))
			.force(
				'y',
				forceY((d) => (d.id[0] == 'b' ? 300 : 0)),
			)
			.force('charge', forceManyBody().strength(-1000)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
			.force('center', forceCenter(width / 2, height / 2).strength(1.5));
	}
</script>

<GraphContainer
	width={width}
	height={height}
>
	{#if showNetwork}
		{#each links as link, i}
			<line
				{...link}
				stroke={colorScale(link.weight)}
				stroke-width={linkScale(Math.abs(+link.weight))}
			/>
		{/each}
		{#each nodes as node}
			<circle
				cx={node.x}
				cy={node.y}
				fill="white"
				r={20}
			/>
			<text
				x={node.x}
				y={node.y}
				text-anchor="middle"
				dominant-baseline="middle">{node.id[0] == 'b' ? 1 : node.id}</text
			>
		{/each}
	{/if}
</GraphContainer>

<style>
	circle {
		stroke: var(--black-olive);
		stroke-width: 2px;
	}
</style>
