<script>
	export let node;
	export let nodeRadius;

	import { selectedNode } from '../stores';

	function handleClick(id) {
		if (id.startsWith('h')) {
			selectedNode.set(id);
		} else {
			selectedNode.set(null);
		}
	}
</script>

<svelte:window on:click={() => selectedNode.set(null)} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<g
	role="graphics-object"
	on:click|stopPropagation={() => handleClick(node.id)}
>
	<circle
		class="network-node"
		class:bias={node.id[0] === 'b'}
		cx={node.x}
		cy={node.y}
		fill="white"
		r={nodeRadius}
		class:selected={node.id === $selectedNode}
	/>
	<text
		class="network-node-label"
		class:bias={node.id[0] === 'b'}
		x={node.x}
		y={node.y}
		text-anchor="middle"
		dominant-baseline="middle">{node.id[0] === 'b' ? 1 : node.id}</text
	>
</g>

<style>
	.network-node {
		stroke: var(--black-olive);
		stroke-width: 2px;
		transition: fill 200ms;
	}
	.network-node.bias {
		stroke-opacity: 0.6;
	}

	.network-node.selected {
		fill: var(--hunyadi-yellow);
	}

	.network-node-label {
		font-size: 1.25rem;
	}
	.network-node-label.bias {
		opacity: 0.6;
	}
</style>
