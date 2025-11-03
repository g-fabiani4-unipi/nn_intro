<script>
	export let width;
	export let height;
	export let margin;
</script>

<svg
	width={width}
	height={height}
>
	<g transform="translate({margin.left}, {margin.top})">
		<slot />
	</g>
</svg>

<style>
	svg {
		position: var(--position);
	}
</style>
