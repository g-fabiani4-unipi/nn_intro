<script>
	import neuronFigure from '../assets/512px-Neuron-figure.svg.png';
	import perceptronFigure from '../assets/perceptron.svg';
</script>

<div class="hero">
	<header>
		<h1>The perceptron</h1>
		<p class="lead">A visual introduction to Deep Learning</p>
	</header>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="48"
		height="48"
		fill="currentColor"
		class="bi bi-mouse-fill"
		viewBox="0 0 16 16"
		aria-hidden="true"
	>
		<path
			d="M3 5a5 5 0 0 1 10 0v6a5 5 0 0 1-10 0zm5.5-1.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0z"
		/>
	</svg>
	<p class="hint">Scroll down to start</p>
</div>
<section class="prose">
	<h2>This is your brain</h2>

	<figure id="fig-neuron">
		<img
			src={neuronFigure}
			alt="Schematic representation of a biological neuron."
		/>
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
	<figure id="fig-perceptron">
		<img
			src={perceptronFigure}
			alt="Schematic representation of a perceptron with 3 inputs"
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
		margin: auto;
	}

	#fig-neuron {
		max-width: 450px;
	}
	#fig-perceptron {
		max-width: 500px;
	}

	figure img {
		box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
	}

	figure > figcaption {
		font-size: 1rem;
		margin-top: 5px;
	}

	h1,
	p.lead {
		backdrop-filter: blur(1px);
		padding: 10px;
		margin: 0;
	}

	h1 {
		font-size: 3rem;
	}

	p.lead {
		/* font-weight: 600; */
		font-size: 2rem;
		text-transform: uppercase;
	}

	.bi.bi-mouse-fill {
		animation-duration: 3000ms;
		animation-name: move, fade;
		animation-iteration-count: infinite;
	}

	@keyframes move {
		0% {
			translate: 0 0;
		}

		35% {
			translate: 0 4vh;
		}

		100% {
			translate: 0 0;
		}
	}

	@keyframes fade {
		0% {
			opacity: 1;
		}

		35% {
			opacity: 0.2;
		}

		100% {
			opacity: 1;
		}
	}

	.hint {
		font-size: smaller;
		animation: 3000ms fade infinite;
	}

	.hero > header {
		height: 80vh;
		display: flex;
		place-items: center;
		flex-direction: column;
		justify-content: center;
	}
</style>
