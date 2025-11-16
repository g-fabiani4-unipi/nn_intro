<script>
	import { svg } from 'd3';

	export let width;
	export let height;
	export let responsive = false;
	export let margin = { top: 0, right: 0, bottom: 0, left: 0 };
</script>

{#if responsive}
	<svg
		viewBox="0 0 {width} {height}"
		class:responsive={responsive}
	>
		<g transform="translate({margin.left}, {margin.top})">
			<slot />
		</g>
	</svg>
{:else}
	<svg
		width={width}
		height={height}
	>
		<g transform="translate({margin.left}, {margin.top})">
			<slot />
		</g>
	</svg>
{/if}

<style>
	svg {
		position: var(--position);
		background-color: var(--background-color);
	}

	svg.responsive {
		width: 100%;
		height: 100%;
	}
</style>
