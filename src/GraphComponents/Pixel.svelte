<script>
	import { tweened } from 'svelte/motion';

	export let x;
	export let y;
	export let width;
	export let fill;
	export let index;

	const tweenParams = {
		duration: 500,
		delay: index * 50,
	};

	const tX = tweened(x, tweenParams);
	const tY = tweened(y, tweenParams);

	$: tX.set(x);
	$: tY.set(y);
</script>

<rect
	x={$tX}
	y={$tY}
	width={width}
	height={width}
	fill={fill}
/>

<style>
	rect {
		stroke: var(--black-olive);
		stroke-width: 0.5px;
	}
</style>
