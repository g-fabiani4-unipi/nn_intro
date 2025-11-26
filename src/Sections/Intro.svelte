<script>
	import neuronFigure from '../assets/512px-Neuron-figure.svg.png';
	import perceptronFigure from '../assets/perceptron.svg';
	import MNISTSection from './MNISTSection.svelte';
</script>

<div class="hero">
	<h1>The perceptron</h1>
</div>
<section class="prose">
	<h2>This is your brain</h2>

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
	<p>
		The <strong>perceptron</strong> is a computational model of the biological
		neuron proposed by Cornell Aeronautical Laboratory researcher
		<strong>Frank Rosenblatt</strong> in 1957.
	</p>
	<figure>
		<img
			src={perceptronFigure}
			alt="Schematic representation of a perceptron with 3 inputs"
			width="500px"
		/>
	</figure>
	<p>The perceptron only performs two operations:</p>
	<p>First it computes a weighted sum of the inputs (plus the bias term)</p>
	<math
		xmlns="http://www.w3.org/1998/Math/MathML"
		display="block"
		class="math-block"
	>
		<mi>z</mi><mo>=</mo>
		<msub><mi>w</mi><mn>1</mn></msub>
		<msub><mi>x</mi><mn>1</mn></msub>
		<mo>+</mo>
		<msub><mi>w</mi><mn>2</mn></msub>
		<msub><mi>x</mi><mn>2</mn></msub>
		<mo>+</mo>
		<msub><mi>w</mi><mn>3</mn></msub>
		<msub><mi>x</mi><mn>3</mn></msub>
		<mo>+</mo>
		<msub><mi>w</mi><mn>0</mn></msub>
		<mo>.</mo>
	</math>
	<p>
		And then it passes the ouput of the previous operation into an activation
		function
	</p>
	<math
		xmlns="http://www.w3.org/1998/Math/MathML"
		display="block"
		class="math-block"
	>
		<mi>y</mi><mo>=</mo>
		<mi>sign</mi><mo>(</mo><mi>z</mi><mo>)</mo>
		<mo>.</mo>
	</math>

	<p>Where the <em>sign</em> function is defined as:</p>

	<math
		xmlns="http://www.w3.org/1998/Math/MathML"
		display="block"
		class="math-block"
	>
		<mrow>
			<mrow>
				<mn>sign</mn>
				<mo>(</mo>
				<mi>z</mi>
				<mo>)</mo>
			</mrow>
			<mo>=</mo>
			<mrow>
				<mo>{'{'}</mo>
				<mtable>
					<mtr>
						<mtd>
							<mo>+</mo>
							<mn>1</mn>
						</mtd>
						<mtd>
							<mtext>if&nbsp;</mtext>
							<mi>z</mi>
							<mo>&GreaterEqual;</mo>
							<mn>0</mn>
							<mo>;</mo>
						</mtd>
					</mtr>
					<mtr>
						<mtd>
							<mo>-</mo>
							<mn>1</mn>
						</mtd>
						<mtd>
							<mtext>if&nbsp;</mtext>
							<mi>z</mi>
							<mo>&lt;</mo>
							<mn>0</mn>
							<mo>.</mo>
						</mtd>
					</mtr>
				</mtable>
			</mrow>
		</mrow>
	</math>
	<p>If we put all together, the perceptron output is positive when</p>
	<math
		xmlns="http://www.w3.org/1998/Math/MathML"
		display="block"
		class="math-block"
	>
		<msub><mi>w</mi><mn>1</mn></msub>
		<msub><mi>x</mi><mn>1</mn></msub>
		<mo>+</mo>
		<msub><mi>w</mi><mn>2</mn></msub>
		<msub><mi>x</mi><mn>2</mn></msub>
		<mo>+</mo>
		<msub><mi>w</mi><mn>3</mn></msub>
		<msub><mi>x</mi><mn>3</mn></msub>
		<mo>+</mo>
		<msub><mi>w</mi><mn>0</mn></msub>
		<mo>&GreaterEqual;</mo>
		<mn>0</mn>
		<mo>.</mo>
	</math>
	<p>
		Where the equation <math
			xmlns="http://www.w3.org/1998/Math/MathML"
			display="inline"
		>
			<msub><mi>w</mi><mn>1</mn></msub>
			<msub><mi>x</mi><mn>1</mn></msub>
			<mo>+</mo>
			<msub><mi>w</mi><mn>2</mn></msub>
			<msub><mi>x</mi><mn>2</mn></msub>
			<mo>+</mo>
			<msub><mi>w</mi><mn>3</mn></msub>
			<msub><mi>x</mi><mn>3</mn></msub>
			<mo>+</mo>
			<msub><mi>w</mi><mn>0</mn></msub>
			<mo>=</mo>
			<mn>0</mn>
		</math>
		defines a hyperplane that acts as a decision boundary.
	</p>
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
