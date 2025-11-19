<script>
	import { tweened } from 'svelte/motion';
	export let x;
	export let y;
	export let height;
	export let width;
	export let value;

	const tweenParams = { duration: 600 };

	let tWidth = tweened(0, tweenParams);
	let tValue = tweened(0, tweenParams);
	$: tWidth.set(width);
	$: tValue.set(value);
</script>

<rect
	class="barplot-bar"
	x={x}
	y={y}
	height={height}
	width={$tWidth}
/>
<text
	x={x + 3 + $tWidth}
	y={y + height / 2}
	dominant-baseline="middle"
	>{$tValue ? Math.round($tValue * 100) + '%' : ''}
</text>

<style>
	.barplot-bar {
		fill: var(--kelly-green);
		stroke: var(--black-olive);
	}
</style>
