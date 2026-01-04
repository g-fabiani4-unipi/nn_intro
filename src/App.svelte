<script>
	import MNISTSection from './Sections/MNISTSection.svelte';
	import PerceptronSection from './Sections/PerceptronSection.svelte';
	import Intro from './Sections/Intro.svelte';
	import { json } from 'd3';
	import Backmatter from './Sections/Backmatter.svelte';
	// import SkipgramSection from './Sections/SkipgramSection.svelte';

	let network;

	json('./data/network.json').then((result) => (network = result));
</script>

<Intro />
<PerceptronSection network={network} />
<MNISTSection network={network} />
<!-- <SkipgramSection network={network} /> -->
<Backmatter />
