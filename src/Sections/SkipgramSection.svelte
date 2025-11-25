<script>
	import {
		scaleLinear,
		extent,
		max,
		interpolatePiYG,
		scaleSequentialSqrt,
		format,
	} from 'd3';
	import { allSteps } from '../constants';
	import GraphContainer from '../GraphComponents/GraphContainer.svelte';
	import Scrolly from '../UI/Scrolly.svelte';
	import { fade } from 'svelte/transition';
	import BarplotBar from '../GraphComponents/BarplotBar.svelte';

	export let network;

	const steps = allSteps['skipgram'];
	const width = 900;
	const height = 600;
	const margin = { top: 30, left: 30, bottom: 30, right: 30 };
	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;
	const networkWidth = (innerWidth * 2) / 3;
	const nodeRadius = 25;
	const colorScale = scaleSequentialSqrt([-1, 1], interpolatePiYG);
	const linkScale = scaleLinear().domain([0, 1]).range([5, 15]);
	const barplotScale = scaleLinear()
		.domain([0, 1])
		.range([0, (innerWidth - networkWidth) * 2]);

	let nodes;
	let links;
	let currentStep = 0;
	let activateInput;
	let selectedOutput;
	let showProbability = false;

	$: if (network) {
		const data = network['skip_gram'];
		nodes = data.nodes;

		const xScale = scaleLinear()
			.domain(extent(Object.keys(data.dims)))
			.range([nodeRadius, networkWidth - nodeRadius]);

		const yScale = scaleLinear()
			.domain([1, max(Object.values(data.dims))])
			.range([nodeRadius, innerHeight - nodeRadius]);

		nodes.forEach((node) => {
			node.cx = xScale(node.layer);
			node.cy = yScale(
				node.order +
					(max(Object.values(data.dims)) - data.dims[node.layer]) / 2,
			);
			node.activation =
				node.id[0] == 'h'
					? data.hidden_activations[node.order - 1]
					: node.id[0] == 'y'
						? data.output_activations[node.order - 1]
						: '';
			node.softmax =
				node.id[0] == 'y' ? data.softmax_activations[node.order - 1] : '';
		});
		links = data.links.map((link) => ({
			...link,
			source: nodes.find((node) => node.id === link.source),
			target: nodes.find((node) => node.id === link.target),
			active:
				!activateInput ||
				link.target === selectedOutput ||
				link.source === 'x1',
		}));
	}

	// Handle scrollytelling steps
	$: if (network && currentStep >= 0) {
		if (currentStep >= steps.findIndex((s) => s.name == 'activate_input')) {
			activateInput = true;
		} else {
			activateInput = false;
		}

		if (steps[currentStep].name.startsWith('activate_output')) {
			selectedOutput = `y${steps[currentStep].name[steps[currentStep].name.length - 1]}`;
		} else {
			selectedOutput = null;
		}

		if (currentStep >= steps.findIndex((s) => s.name == 'softmax')) {
			showProbability = true;
		} else {
			showProbability = false;
		}
	}

	$: console.log(selectedOutput);
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
	{#if !network}
		<div class="sticky loading">loading...</div>
	{:else}
		<div class="sticky main-part">
			<div style="height: 100vh;">
				<GraphContainer
					height={height}
					width={width}
					margin={margin}
					responsive={true}
				>
					{#each links as link}
						<line
							class="network-link inactive"
							x1={link.source.cx}
							y1={link.source.cy}
							x2={link.target.cx}
							y2={link.target.cy}
							stroke-width={linkScale(Math.abs(link.weight))}
						/>
					{/each}
					{#each links.filter((link) => link.active) as link (`${link.source.id}-${link.target.id}`)}
						<g transition:fade={{ duration: 500 }}>
							<line
								class="network-link"
								x1={link.source.cx}
								y1={link.source.cy}
								x2={link.target.cx}
								y2={link.target.cy}
								stroke={colorScale(link.weight)}
								stroke-width={linkScale(Math.abs(link.weight))}
							/>
							{#if activateInput}
								<g
									transform={`translate(${link.source.cx + (link.target.cx - link.source.cx) / 3},
                ${link.source.cy + (link.target.cy - link.source.cy) / 3})`}
								>
									<rect
										x={-27.5}
										y={-15}
										class="network-link-label"
										width={55}
										height={30}
										fill="white"
									/>
									<text
										text-anchor="middle"
										dominant-baseline="middle"
									>
										{format('.3f')(link.weight)}
									</text></g
								>
							{/if}
						</g>
					{/each}

					{#each nodes as node}
						<circle
							class="network-node"
							class:active={activateInput && node.id === 'x1'}
							class:inactive={activateInput &&
								node.id[0] === 'x' &&
								node.id !== 'x1'}
							cx={node.cx}
							cy={node.cy}
							fill="white"
							r={nodeRadius}
						/>
						{#if node.word}
							<text
								x={node.cx}
								y={node.cy}
								dominant-baseline="middle"
								text-anchor="middle"
								>{node.word}
							</text>
						{/if}
						{#if node.id[0] == 'h' && activateInput}
							<text
								transition:fade={{ duration: 400 }}
								x={node.cx}
								y={node.cy}
								text-anchor="middle"
								dominant-baseline="middle">{node.activation}</text
							>
						{/if}
						{#if node.id[0] == 'y' && selectedOutput && node.order <= selectedOutput[1]}
							<text
								x={node.cx + nodeRadius + 10}
								y={node.cy}
								dominant-baseline="middle"
								>{format('.3f')(node.activation)}
							</text>
						{/if}
						{#if node.id[0] == 'y' && showProbability}
							<BarplotBar
								x={node.cx + nodeRadius + 10}
								y={node.cy - nodeRadius}
								height={nodeRadius * 2}
								width={barplotScale(node.softmax)}
								value={node.softmax}
							/>
						{/if}
					{/each}
				</GraphContainer>
			</div>
		</div>
	{/if}
</section>

<style>
	.network-node {
		stroke: var(--black-olive);
		stroke-width: 2px;
		transition: all 400ms;
	}

	.network-node.active {
		fill: color-mix(in srgb, var(--kelly-green), white 25%);
	}

	.network-node.inactive {
		fill: color-mix(in srgb, var(--magenta-dye), white 25%);
	}

	.network-link.inactive {
		stroke: var(--black-olive);
		stroke-opacity: 0.1;
	}

	.network-link-label {
		stroke: var(--black-olive);
	}
</style>
