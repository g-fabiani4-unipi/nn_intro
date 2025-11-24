<script>
	import neuronFigure from '../assets/512px-Neuron-figure.svg.png';
	import perceptronFigure from '../assets/perceptron.svg';
</script>

<div class="hero">
	<h1>The perceptron</h1>
</div>
<section class="prose">
	<h2>This is your brain</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, quia,
		similique ipsum explicabo architecto dignissimos facere et porro quaerat
		itaque molestias accusantium maiores beatae quam doloremque illum saepe
		corrupti nobis.
	</p>
	<p>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi, est! Alias
		mollitia rem sed quo. Minus velit ex earum quisquam nisi eos culpa adipisci,
		ab, ad laudantium quas dolorum dolore.
	</p>

	<figure>
		<a
			href="https://commons.wikimedia.org/wiki/File:Neuron-figure.svg"
			class="img-link"
		>
			<img
				src={neuronFigure}
				alt="Schematic representation of a biological neuron"
				height="600px"
			/></a
		>
		<figcaption>
			<a href="https://commons.wikimedia.org/wiki/File:Neuron-figure.svg"
				>Nicolas.Rougier</a
			>,
			<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>,
			via Wikimedia Commons
		</figcaption>
	</figure>
</section>
<section class="prose">
	<h2>This is your brain at Cornell</h2>
	<figure>
		<img
			src={perceptronFigure}
			alt="Schematic representation of a perceptron with 3 inputs"
			width="500px"
		/>
	</figure>
</section>

<style>
	section {
		margin: 0 auto;
	}

	figure {
		display: flex;
		flex-direction: column;
		width: fit-content;
		margin: auto;
	}

	figure img {
		box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
	}

	figure > figcaption {
		font-size: 1rem;
		margin-top: 5px;
	}

	h1 {
		backdrop-filter: blur(1px);
		padding: 10px;
	}
</style>
