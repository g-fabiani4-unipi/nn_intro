<script>
	export let node;
	export let nodeRadius;
</script>

<circle
	class="network-node"
	class:bias={node.id[0] === 'b'}
	cx={node.x}
	cy={node.y}
	fill="white"
	r={nodeRadius}
/>
<text
	class="network-node-label"
	class:bias={node.id[0] === 'b'}
	x={node.x}
	y={node.y}
	text-anchor="middle"
	dominant-baseline="middle">{node.id[0] === 'b' ? 1 : node.id}</text
>

<style>
	.network-node {
		stroke: var(--black-olive);
		stroke-width: 2px;
	}
	.network-node.bias {
		stroke-opacity: 0.6;
	}
	.network-node-label {
		font-size: 1.25rem;
	}
	.network-node-label.bias {
		opacity: 0.6;
	}
</style>
