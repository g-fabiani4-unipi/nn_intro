<script>
	import { tweened } from 'svelte/motion';

	export let x;
	export let y;
	export let width;
	export let fill;
	export let index;
	export let round;
	export let strokeWidth;
	export let delay = true;

	const tX = tweened(x);
	const tY = tweened(y);
	const corner = tweened(0, { duration: 500 });
	const tWidth = tweened(width, { duration: 500 });

	$: tX.set(x, { duration: delay ? 500 : 1000, delay: delay ? index * 50 : 0 });
	$: tY.set(y, { duration: delay ? 500 : 1000, delay: delay ? index * 50 : 0 });
	$: round ? corner.set(50) : corner.set(0);
	$: tWidth.set(width);
</script>

<rect
	x={$tX}
	y={$tY}
	width={$tWidth}
	height={$tWidth}
	fill={fill}
	stroke-width={strokeWidth}
	rx={$corner}
	ry={$corner}
/>

<style>
	rect {
		stroke: var(--black-olive);
		transition: fill 800ms;
	}
</style>
