<div class="backmatter">
	<div class="methodology">
		<section>
			<h2>Data and methodology</h2>
			<p>
				For digit classification, a multilayer perceptron with two non-linear
				hidden layers (RELU) of 16 nodes each was fitted for 47 epochs on 75% of
				the test set of the UCI ML hand-written digits datasets (Alpaydin &
				Kaynak, 1998). The classifier was tested on the remaining 25% of the
				dataset, obtaining an accuracy score of 0.88. All code for the
				classifier is available on <a
					href="https://github.com/g-fabiani4-unipi/nn_intro_data/blob/main/src/digits.ipynb"
					>GitHub</a
				>.
			</p>
		</section>
		<section>
			<h2>Resources</h2>
			<ul class="bibliography">
				<li>
					<span class="author">Alpaydin, E. & Kaynak, C.</span> (1998).
					<span class="title">Optical Recognition of Handwritten Digits</span>
					[Dataset]. UCI Machine Learning Repository.
					<a href="https://doi.org/10.24432/C50P49"
						>https://doi.org/10.24432/C50P49</a
					>.
				</li>
				<li>
					<span class="author">Hedges, V.</span> (2022).
					<span class="title">Introduction to Neuroscience</span>. Michigan
					State University Libraries.
					<a href="https://openbooks.lib.msu.edu/introneuroscience1/"
						>https://openbooks.lib.msu.edu/introneuroscience1/</a
					>
				</li>
				<li>
					<span class="author">Lefkowitz, M.</span> (2019, September 25).
					<span class="title"
						>Professor’s perceptron paved the way for AI – 60 years too soon</span
					>. Cornell Chronicle.
					<a
						href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
						>https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon</a
					>
				</li>
				<li>
					<span class="author">Nielsen, M. A.</span> (2015).
					<span class="title">Neural Networks and Deep Learning</span>.
					Determination Press.
					<a href="http://neuralnetworksanddeeplearning.com"
						>http://neuralnetworksanddeeplearning.com</a
					>
				</li>
				<li>
					<span class="author">Rosenblatt, F.</span> (1957).
					<span class="title"
						>The Perceptron: A Perceiving and Recognizing Automaton (project
						PARA)</span
					>
					(Nos. 85-460-1). Cornell Aeronautical Laboratory.
					<a
						href="https://bpb-us-e2.wpmucdn.com/websites.umass.edu/dist/a/27637/files/2016/03/rosenblatt-1957.pdf"
						>https://bpb-us-e2.wpmucdn.com/websites.umass.edu/dist/a/27637/files/2016/03/rosenblatt-1957.pdf</a
					>
				</li>
				<li>
					<span class="author">Rosenblatt, F.</span> (1960).
					<span class="title">Perceptron Simulation Experiments</span>.
					Proceedings of the IRE, 48(3), 301–309.
					<a href="https://doi.org/10.1109/JRPROC.1960.287598"
						>https://doi.org/10.1109/JRPROC.1960.287598</a
					>
				</li>
			</ul>
		</section>
	</div>
	<div class="footer">
		<p>
			<a href="https://g-fabiani4-unipi.github.io/nn_intro/">The Perceptron</a>
			© 2025 by
			<a href="https://github.com/g-fabiani4-unipi">Giulia Fabiani</a>
			is licensed under
			<a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a
			><img
				src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
				alt=""
				style="max-width: 1em;max-height:1em;margin-left: .2em;"
			/><img
				src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
				alt=""
				style="max-width: 1em;max-height:1em;margin-left: .2em;"
			/><img
				src="https://mirrors.creativecommons.org/presskit/icons/sa.svg"
				alt=""
				style="max-width: 1em;max-height:1em;margin-left: .2em;"
			/>
		</p>
		<p>
			Code is available on <a
				href="https://github.com/g-fabiani4-unipi/nn_intro/">GitHub</a
			>
		</p>
	</div>
</div>

<style>
	.methodology > section {
		backdrop-filter: blur(3px);
		max-width: 65ch;
		padding: 10px 20px;
	}

	ul.bibliography {
		list-style: none;
	}

	ul.bibliography > li {
		margin-top: 1rem;
	}

	.title {
		font-style: italic;
	}

	.author {
		font-weight: bolder;
		font-variant: small-caps;
	}
</style>
