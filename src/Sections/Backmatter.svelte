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
					Alpaydin, E. & Kaynak, C. (1998). <em
						>Optical Recognition of Handwritten Digits</em
					>
					[Dataset]. UCI Machine Learning Repository.
					<a href="https://doi.org/10.24432/C50P49"
						>https://doi.org/10.24432/C50P49</a
					>.
				</li>
			</ul>
		</section>
	</div>
	<div class="footer">
		<p>
			<a href="https://g-fabiani4-unipi.github.io/nn_intro/"
				>Introduction to Neural Networks</a
			>
			© 2025 by
			<a href="https://github.com/g-fabiani4-unipi">Giulia Fabiani</a>
			is licensed under
			<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a><img
				src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
				alt=""
				style="max-width: 1em;max-height:1em;margin-left: .2em;"
			/><img
				src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
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
</style>
