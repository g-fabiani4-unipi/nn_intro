<script>
	export let width;
	export let height;
	export let margin = { top: 0, right: 0, bottom: 0, left: 0 };
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
