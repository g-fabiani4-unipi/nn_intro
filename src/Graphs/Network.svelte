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
	export let showBias;
	export let currentNetwork;
	export let disableInput;

	const width = 800;
	const height = 400;
	const nodeRadius = 25;

	const xScale = scaleLinear().domain([1, 5]).range([0, width]);
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
					source: source.id,
					x1: source.x,
					x2: target.x,
					y1: source.y,
					y2: target.y,
				};
			});
		}
	});

	$: {
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

	function clampX(x) {
		return Math.max(Math.min(x, width - nodeRadius), nodeRadius);
	}

	function clampY(y) {
		return Math.max(Math.min(y, height - nodeRadius), nodeRadius);
	}
</script>

<GraphContainer
	width={width}
	height={height}
	responsive={true}
>
	{#if showNetwork}
		{#each links as link, i}
			{#if !link.source.startsWith('b') || showBias}
				<NetworkLink
					x1={clampX(link.x1)}
					x2={clampX(link.x2)}
					y1={clampY(link.y1)}
					y2={clampY(link.y2)}
					colorScale={colorScale}
					linkScale={linkScale}
					disableInput={disableInput}
					bind:weight={$params[i]}
				/>
			{/if}
		{/each}
		{#each nodes as node (node.id)}
			{#if !node.id.startsWith('b') || showBias}
				<NetworkNode
					x={clampX(node.x)}
					y={clampY(node.y)}
					id={node.id}
					nodeRadius={nodeRadius}
				/>
			{/if}
		{/each}
	{/if}
</GraphContainer>
