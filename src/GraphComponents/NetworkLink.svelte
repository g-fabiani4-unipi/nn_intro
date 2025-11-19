<script>
	import { tweened } from 'svelte/motion';

	export let link;
	export let colorScale;
	export let linkScale;
	export let disableInput;
	export let weight;

	let editing = false;

	const tweenParams = {
		duration: 200,
	};

	const link_weight = tweened(0, tweenParams);

	$: link_weight.set(+weight);

	$: midpoint_x = link.x1 + (link.x2 - link.x1) / 3;
	$: midpoint_y = link.y1 + (link.y2 - link.y1) / 3;
</script>

<line
	{...link}
	stroke={colorScale($link_weight)}
	stroke-width={linkScale(Math.abs($link_weight))}
/>
<foreignObject
	x={midpoint_x}
	y={midpoint_y}
	on:mouseenter={() => (editing = true)}
	on:mouseleave={() => (editing = false)}
	on:focusin={() => (editing = true)}
	on:focusout={() => (editing = false)}
	role="graphics-object"
>
	{#if editing && !disableInput}
		<input
			type="number"
			bind:value={weight}
			on:click|stopPropagation={() => null}
		/>
	{:else}
		<div>{weight}</div>
	{/if}
</foreignObject>

<style>
	foreignObject {
		height: 2rem;
		width: 3.3rem;
		color: black;
	}

	foreignObject > input {
		max-width: 2.5rem;
		text-align: center;
		font-size: 1rem;
		font-family: 'Roboto', sans-serif;
		padding: 4px;
	}

	foreignObject > div {
		background-color: white;
		text-align: center;
		width: 2rem;
		height: fit-content;
		padding: 4px;
		border: 1px solid var(--black-olive);
		font-size: 1rem;
	}
</style>
