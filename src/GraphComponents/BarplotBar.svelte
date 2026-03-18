<script>
	import { tweened } from 'svelte/motion';
	import Rect from './Rect.svelte';
	import Text from './Text.svelte';
	export let x;
	export let y;
	export let height;
	export let width;
	export let value;
	export let stroke = null;
	export let fill = null;

	const tweenParams = { duration: 600 };

	const tWidth = tweened(0, tweenParams);
	const tValue = tweened(0, tweenParams);

	$: tWidth.set(width);
	$: tValue.set(value);
</script>

<Rect
	x={x}
	y={y}
	height={height}
	width={$tWidth}
	fill={fill}
	stroke={stroke}
/>
<Text
	x={x + 3 + $tWidth}
	y={y + height / 2}
	baseline="middle"
	content={$tValue ? Math.round($tValue * 100) + '%' : ''}
	tweenParams={{ duration: 0 }}
/>
