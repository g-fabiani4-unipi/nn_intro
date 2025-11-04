<script>
	export let scale;
	export let innerWidth;
	export let innerHeight;
	export let type;
	export let offset = null;
	export let tickValues = null;

	const ticks = tickValues ? tickValues : scale.ticks();
</script>

{#if type == 'bottom'}
	<g
		class="axis"
		transform="translate(0, {offset !== null ? offset : innerHeight})"
	>
		<line
			x1={0}
			y1={0}
			x2={innerWidth}
			y2={0}
		/>
		{#each ticks as tick}
			<g transform="translate({scale(tick)}, 0)">
				<line
					x1={0}
					x2={0}
					y1={0}
					y2={5}
				/>
				<text
					text-anchor="middle"
					x={0}
					y={20}>{tick}</text
				>
			</g>
		{/each}
	</g>
{:else}
	<g
		class="axis"
		transform="translate({offset !== null ? offset : 0}, 0)"
	>
		<line
			x1={0}
			y1={0}
			x2={0}
			y2={innerHeight}
		/>
		{#each ticks as tick}
			<g transform="translate(0, {scale(tick)})">
				<line
					x1={0}
					x2={-5}
					y1={0}
					y2={0}
				/>
				<text
					text-anchor="end"
					dominant-baseline="middle"
					x={-10}
					y={0}>{tick}</text
				>
			</g>
		{/each}
	</g>
{/if}

<style>
	.axis line {
		stroke: var(--black-olive);
	}

	.axis text {
		font-size: 14px;
		fill: var(--black-olive);
	}
</style>
