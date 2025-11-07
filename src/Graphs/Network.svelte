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

	export let network;
	export let showNetwork;
	export let currentNetwork;

	const width = 600;
	const height = 400;
	const nodeRadius = 20;

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
				forceY((d) => (d.id[0] == 'b' ? 300 : 0)),
			)
			.force('charge', forceManyBody().strength(-1500))
			.force('center', forceCenter(width / 2, height / 2).strength(0.5));
	}
</script>

<GraphContainer
	width={width}
	height={height}
>
	{#if showNetwork}
		{#each links as link}
			<NetworkLink
				link={link}
				colorScale={colorScale}
				linkScale={linkScale}
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
