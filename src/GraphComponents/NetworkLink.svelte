<script>
	import { tweened } from 'svelte/motion';

	export let link;
	export let colorScale;
	export let linkScale;

	const tweenParams = {
		duration: 200,
	};

	const link_weight = tweened(0, tweenParams);

	$: link_weight.set(+link.weight);
</script>

<line
	{...link}
	stroke={colorScale($link_weight)}
	stroke-width={linkScale(Math.abs($link_weight))}
/>
