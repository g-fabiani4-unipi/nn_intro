<script>
	import Rect from './Rect.svelte';
	import { tweened } from 'svelte/motion';

	export let x;
	export let y;
	export let pixelWidth;
	export let opacity = 1;
	export let stroke;
	export let scale;
	export let digit;

	const tweenParams = {
		duration: 800,
	};

	const tX = tweened(x, tweenParams);
	const tY = tweened(y, tweenParams);
	const tOpacity = tweened(opacity, { delay: 800, duration: 800 });
	const tPixelWidth = tweened(pixelWidth, tweenParams);

	$: tX.set(x);
	$: tY.set(y);
	$: tOpacity.set(opacity);
	$: tPixelWidth.set(pixelWidth);
</script>

<Rect
	x={$tX}
	y={$tY}
	width={8 * $tPixelWidth}
	height={8 * $tPixelWidth}
	stroke={stroke}
	fill="transparent"
	opacity={$tOpacity}
/>
{#each digit.img as pixel, i}
	<Rect
		x={$tX + (i % 8) * $tPixelWidth}
		y={$tY + Math.floor(i / 8) * $tPixelWidth}
		width={$tPixelWidth}
		height={$tPixelWidth}
		fill={scale(pixel)}
		stroke="transparent"
		opacity={$tOpacity}
	/>
{/each}
