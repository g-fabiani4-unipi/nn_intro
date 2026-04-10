<script>
	import { json } from 'd3';
	import checkScrollDir from './utils/checkScrollDir';
	import MNISTSection from './Sections/MNISTSection.svelte';
	import PerceptronSection from './Sections/PerceptronSection.svelte';
	import Intro from './Sections/Intro.svelte';
	import Backmatter from './Sections/Backmatter.svelte';
	import Outro from './Sections/Outro.svelte';
	import { onMount } from 'svelte';

	let network;
	let scrollY = 0;
	let scrollDir;

	function handleScroll() {
		scrollY = document.body.scrollTop;
	}

	$: scrollDir = checkScrollDir(scrollY);

	json('./data/network.json').then((result) => (network = result));
	onMount(() => handleScroll());
</script>

<svelte:body on:scroll={handleScroll} />
<Intro />
<PerceptronSection
	network={network}
	scrollDir={scrollDir}
/>
<MNISTSection
	network={network}
	scrollDir={scrollDir}
/>
<Outro />
<Backmatter />
