<script>
	import neuronFigure from '../assets/512px-Neuron-figure.svg.png';
	import perceptronFigure from '../assets/perceptron.svg';
	import titlePageFigure from '../assets/title_page.png';
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

	<p>
		Neurons are the <strong>basic unit of the brain</strong>. The main adaptive
		function of neurons is <strong>sending electrical signals</strong>
		over short and long distances in the body. While this function is translated
		in a variety of adaptations unique to them,
		<strong>neurons are still cells</strong>: they have all the basic features
		of a typical mammalian cell, they contain all organelles present in other
		types of cells and perform normal cellular functions like protein synthesis,
		packaging of molecules, cellular respiration <i>et cetera</i>.
	</p>

	<figure id="fig-neuron">
		<img
			src={neuronFigure}
			alt="Schematic representation of a typical biological neuron."
		/>
		<figcaption>
			<p>
				A typical biological neuron. <strong>Dendrites</strong>
				branch from the <strong>cell body</strong>, where the nucleus and other
				organelles are located. The <strong>axon</strong> extends out from the body
				and ends with branching terminals which relay the electrical signal to other
				cells.
			</p>
			<p>
				<a href="https://commons.wikimedia.org/wiki/File:Neuron-figure.svg"
					>Nicolas.Rougier</a
				>,
				<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a
				>, via Wikimedia Commons
			</p>
		</figcaption>
	</figure>
	<p>
		The typical neuron consist of <strong>dendrites</strong>,
		<strong>cell body</strong>, and <strong>axon</strong>.
	</p>
	<p>
		<strong>Dendrites</strong> branch from the body in a tree-like fashion (hence
		the name) and are the main target of signals incoming from other neurons.
	</p>
	<p>
		In the <strong>cell body</strong>, all incoming signals are weighted and
		added together, and, if the resulting potential exceeds a certain threshold,
		the neuron fires an electrical signal. Incoming signal can either be
		<strong>excitatory</strong>, in which case they make the firing more likely,
		or <strong>inhibitory</strong>, in which case they make the firing less
		likely. The relative strengths of the incoming connections is not fixed.
		This <strong>plasticity</strong> is one of the main mechanisms through which
		the brain is
		<strong>capable of updating itself on the basis of experience</strong>. The
		summation of incoming signals is no simple arithmetic operation either: in
		particular, the <strong>timing and frequency</strong> with which signals are
		received is critical in determining if the neuron will fire or not.
	</p>
	<p>
		The neuron firing is an all or nothing event: once the critical threshold is
		crossed, the cell is flooded with positive ions, which makes the cell
		membrane potential suddenly shift to positive. This event is called the <strong
			>action potential</strong
		>
		or <strong>spike</strong>. Immediately after, positive ions are pumped out
		of the cell, restoring its resting negative potential.
	</p>
	<p>
		The <strong>axon</strong> is responsible for transmitting the action
		potential to other cells. When the action potential reaches an axon
		terminal, the electric signal is converted into a chemical signal through
		the release of specialized chemicals (<strong>neurotransmitters</strong>)
		into the empty space between the firing neuron and its target cell.
	</p>
	<p>
		The <strong>neurotransmitters</strong> bind to particular
		<strong>receptors</strong> in the receiving neuron. Depending on whether the
		sending neuron is excitatory or inibitory, the released chemicals make the receiving
		neuron more or less likely to fire and the cycle continues.
	</p>
</section>
<section class="prose">
	<h2>This is your brain at Cornell</h2>
	<p>
		In January 1957 <strong>Frank Rosenblatt</strong>, a researcher from the
		<strong>Cornell Aeronautical Laboratory</strong>, submitted a proposal for
		funding, ambitiously titled
		<em>The Perceptron: a Perceiving and Recognizing Automaton</em>. In it,
		Rosenblatt requested funds for the design and construction of an electronic
		or electromechanical
		<strong>machine</strong> which he characterized as an &ldquo;electronic brain
		model&rdquo;, claiming
	</p>
	<blockquote>
		Devices of this sort are expected ultimately to be capable of concept
		formation, language translation, collation of military intelligence, and the
		solution of problems through inductive logic.
	</blockquote>

	<p>
		According to Rosenblatt, the construction of the pilot device would require
		the work of three people and a digital computer for eighteen months.
	</p>
	<figure id="fig-title-page">
		<img
			src={titlePageFigure}
			alt="Title page of Rosenblatt's 1957 proposal for funding."
		/>
		<figcaption>
			Title page of Rosenblatt's 1957 proposal for funding.
		</figcaption>
	</figure>
	<p>
		Surely enough, in July 1958 the <strong
			>U.S. office of Naval Research</strong
		>
		unveiled the <strong>Mark I Perceptron</strong>. In the demonstration that
		followed, Rosenblatt's device &mdash; a <strong>5-ton</strong> IBM computer the
		size of a room &mdash; was fed a series of punch cards until it eventually performed
		satisfactorily in distinguishing cards which presented a marking on the left
		from cards marked on the right.
	</p>
	<p>
		In the following months experiments were conducted on the perceptron to see
		if it could be made to handle other <strong>binary classification</strong>
		problems, of which the most challenging was telling apart the letters E and F.
		The device did that with 80% accuracy.
	</p>
	<p>
		By the onset of the <strong>1970s</strong>, interest in the perceptron, and
		for biologically inspired computational systems in general, had waned. The
		field had something of a resurgence in the <strong>1980s</strong>, when some
		fundamental flaws of the perceptron were corrected by
		<strong>stacking multiple layers of units</strong>
		on top of each other. It was at this point in time that the technique was rebranded
		as
		<strong>Deep Learning</strong>, which stands for &ldquo;using <em>deep</em>
		artificial neural networks for machine <em>learning</em>.&rdquo; But it
		wasn't until <strong>around 2010</strong>, once computational power had
		dramatically increased and so had the availability of data, that
		<strong>deep artificial neural networks</strong> became a commercially feasible
		enterprise.
	</p>
	<p>
		At its core, the <strong>perceptron</strong> is a very crude computational
		model of a biological neuron &mdash; or, more precisely, of a
		<strong>1940s</strong> understanding of how neurons work in the human brain.
	</p>
	<figure id="fig-perceptron">
		<img
			src={perceptronFigure}
			alt="Schematic representation of a perceptron with 3 inputs"
		/>
		<figcaption>
			Perceptron with three inputs. The <strong>output unit</strong> receives
			connections from its <strong>input units</strong> (
			<math
				xmlns="http://www.w3.org/1998/Math/MathML"
				display="inline"
			>
				<msub><mi>x</mi><mn>1</mn></msub>,
				<msub><mi>x</mi><mn>2</mn></msub>,
				<msub><mi>x</mi><mn>3</mn></msub>
			</math>) by
			<strong>weighted links</strong> (
			<math
				xmlns="http://www.w3.org/1998/Math/MathML"
				display="inline"
			>
				<msub><mi>w</mi><mn>1</mn></msub>,
				<msub><mi>w</mi><mn>2</mn></msub>,
				<msub><mi>w</mi><mn>3</mn></msub>
			</math>). The output unit also receives a weighted connection (<math
				xmlns="http://www.w3.org/1998/Math/MathML"
				display="inline"
			>
				<msub><mi>w</mi><mn>0</mn></msub>
			</math>) from an additional unit whose value is fixed, called the
			<strong>bias</strong>. The perceptron performs a
			<strong>weighted sum</strong>
			of its inputs and then passes the result to an
			<strong>activation function</strong>.
		</figcaption>
	</figure>
	<p>
		Removed from the weak biological analogy, the perceptron is a very simple <strong
			>binary classifier</strong
		>: it receives in <strong>input</strong> some
		<strong>numeric representation</strong>
		of that which we want to classify and outputs either <strong>1</strong>,
		meaning that the feature is present, or <strong>-1</strong>, meaning that
		the feature is not present. If, for example, we wanted to use the perceptron
		to determine whether a specific image is the picture of a cat, we would pass
		it numbers representing pixels of the image and it would return us 1
		(&ldquo;it' a cat!&rdquo;) or -1 (&ldquo;not a cat&rdquo;). If the
		<strong>weights</strong> which connect the inputs to the output unit are set
		up correctly, the answer could very well be right!
	</p>

	<p>
		It may surprise you that the perceptron only performs two operations. First
		it computes a <strong>weighted sum of the inputs</strong> (plus the bias term,
		whose function we will explain shortly).
	</p>
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
		And then it passes the otuput of the previous operation into an <strong
			>activation function
		</strong>
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
	<p>So, how does it work?</p>
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
	#fig-title-page {
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
