<section class="prose">
	<p>
		As we have seen, <strong>multi-layer perceptrons</strong> have much more
		<strong>expressive power</strong> than single-layer perceptrons, but this power
		comes with a cost. As a matter of fact, it is not possible to update the weights
		for the hidden layers using the perceptron learning rule.
	</p>
	<p>
		For the &ldquo;training&rdquo; of multi-layer perceptrons, we use an
		algorithm called <strong>Backpropagation</strong>: first, the error of the
		perceptron is computed on the whole training set, then all parameters are
		adjusted, propagating the adjustments backwards into the perceptron.
	</p>
	<p>
		Since this requires some more complex mathematics, a detailed explanation of
		how backpropagation works is out of the scope of this introduction.
	</p>
</section>

<style>
	section {
		margin: 0 auto;
	}
</style>
