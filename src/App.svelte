<script>
	import { json } from 'd3';
	import MNISTSection from './Sections/MNISTSection.svelte';
	import PerceptronSection from './Sections/PerceptronSection.svelte';
	import Intro from './Sections/Intro.svelte';
	import Backmatter from './Sections/Backmatter.svelte';
	import Outro from './Sections/Outro.svelte';

	let network;

	json('./data/network.json').then((result) => (network = result));
</script>

<Intro />
<PerceptronSection network={network} />
<MNISTSection network={network} />
<Outro />
<Backmatter />
