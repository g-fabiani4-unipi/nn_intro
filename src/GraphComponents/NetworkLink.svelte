<script>
	import { tweened } from 'svelte/motion';

	export let x1;
	export let x2;
	export let y1;
	export let y2;
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

	$: midpoint_x = x1 + (x2 - x1) / 3;
	$: midpoint_y = y1 + (y2 - y1) / 3;
</script>

<line
	x1={x1}
	x2={x2}
	y1={y1}
	y2={y2}
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
		<div class:disabled={disableInput}>{weight}</div>
	{/if}
</foreignObject>

<style>
	foreignObject {
		height: 100%;
		width: 100%;
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

	foreignObject > div.disabled {
		color: color-mix(in srgb, var(--black-olive), white 30%);
		border-color: color-mix(in (srgb), var(--black-olive), white 30%);
		cursor: not-allowed;
	}
</style>
