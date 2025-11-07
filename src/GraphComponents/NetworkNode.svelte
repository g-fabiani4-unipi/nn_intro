<script>
	export let node;
	export let nodeRadius;
</script>

<circle
	class="network-node"
	cx={node.x}
	cy={node.y}
	fill="white"
	r={nodeRadius}
/>
<text
	class="network-node-label"
	x={node.x}
	y={node.y}
	text-anchor="middle"
	dominant-baseline="middle">{node.id[0] == 'b' ? 1 : node.id}</text
>

<style>
	circle {
		stroke: var(--black-olive);
		stroke-width: 2px;
	}
</style>
