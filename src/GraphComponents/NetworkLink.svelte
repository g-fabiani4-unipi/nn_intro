<script>
	export let link;
	export let colorScale;
	export let linkScale;
</script>

<line
	{...link}
	stroke={colorScale(link.weight)}
	stroke-width={linkScale(Math.abs(+link.weight))}
/>
