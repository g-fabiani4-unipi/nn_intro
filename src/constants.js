import { text } from "d3";

export const positiveColor = '#7FBC41';
export const negativeColor = '#C51B7D';

export const allSteps = {
  perceptron: [
    {
      name: 'start',
      text: "<p>Suppose we want the perceptron to model the function <strong>x<sub>1</sub> AND x<sub>2</sub></strong>.</p>\
      <p>Since this is a fairly simple problem, we can show all relevant examples in a <strong>truth table.</strong></p>"
    },
    {
      name: 'enter_network',
      text: `<p>And now we have our perceptron. It has <strong>two input units</strong> (x<sub>1</sub> and x<sub>2</sub>) in order to model the fact that the AND function takes two arguments.</p>`

    },
    {
      name: 'math',
      text: `<p>The perceptron equation for a perceptron with two inputs is the equation of a line</p>
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
			<msub><mi>w</mi><mn>0</mn></msub>
			<mo>=</mo>
			<mn>0</mn>
		</math>
    <p>which in explicit form would be</p>
	<math
		xmlns="http://www.w3.org/1998/Math/MathML"
		display="block"
		class="math-block"
	>
		<msub><mi>x</mi><mn>2</mn></msub><mo>=</mo>
		<mo>-</mo>
		<mfrac>
			<mrow> <msub><mi>w</mi><mn>1</mn></msub> </mrow>
			<mrow> <msub><mi>w</mi><mn>2</mn></msub> </mrow>
		</mfrac>
		<msub><mi>x</mi><mn>1</mn></msub>
		<mo>-</mo>
		<mfrac>
			<mrow> <msub><mi>w</mi><mn>0</mn></msub> </mrow>
			<mrow> <msub><mi>w</mi><mn>2</mn></msub> </mrow>
		</mfrac>
	</math>
  <p>where 	<math
		xmlns="http://www.w3.org/1998/Math/MathML"
		display="inline"
	>
		<mo>-</mo>
		<mfrac>
			<mrow> <msub><mi>w</mi><mn>1</mn></msub> </mrow>
			<mrow> <msub><mi>w</mi><mn>2</mn></msub> </mrow>
		</mfrac>
	</math> is the slope and
  <math
		xmlns="http://www.w3.org/1998/Math/MathML"
		display="inline"
	>
		<mo>-</mo>
		<mfrac>
			<mrow> <msub><mi>w</mi><mn>0</mn></msub> </mrow>
			<mrow> <msub><mi>w</mi><mn>2</mn></msub> </mrow>
		</mfrac>
	</math>
  is the intercept.
  </p>`
    },
    {
      name: 'enter_data',
      text: "<p>As we have seen, the perceptron can only handle numbers, so we need to convert our <span class='example'>examples</span> into numbers, somehow.\
      Here we chose to use <strong>1</strong> for <strong>True</strong> and <strong>-1</strong> for <strong>False</strong>.</p>"
    },
    {
      name: "enter_data_2",
      text: "<p>Now it is possible to draw all examples from the truth table on a cartesian coordinate system:\
      we filled <span class='positive'>positive examples</span> in green and <span class='negative'>negative examples</span> in pink.</p>"
    },
    {
      name: "enter_data_3",
      text: "<p>Can you find a parameter configuration that makes all and only <span class='positive'>positive</span> examples fall on the\
       <span class='positive'>positive side</span> of the decision boundary?</p>"
    },
    {
      name: 'perceptron_rule_start',
      text: '<p>The perceptron is able to set its own parameters by correcting the classification error on a training set.</p>\
      <p><span>Example 1</span> is classified correctly, so no change is necessary.</p>'
    },
    {
      name: 'perceptron_rule_2',
      text: '<p>This example is in fact misclassified. <span class="example">Example&nbsp;2</span> falls on the <span class="positive">positive</span> side of the boundary even though it is <span class="negative">negative</span></p>'
    },
    {
      name: 'perceptron_rule_3',
      text: '<p>Update the parameters.</p>'
    },
    {
      name: 'perceptron_rule_4',
      text: '<p>This example is okay.</p>'
    },
    {
      name: 'perceptron_rule_5',
      text: '<p>This, however, is not</p>'
    },
    {
      name: 'perceptron_rule_6',
      text: '<p>Applying change.</p>'
    },
    {
      name: 'perceptron_rule_7',
      text: '<p>Applying change.</p>'
    },
    {
      name: 'perceptron_rule_8',
      text: '<p>Now <span class="example">example 2</span> is misclassified.</p>'
    },
    {
      name: 'perceptron_rule_9',
      text: '<p>Applying change. Now <span class="example">example 4</span> is misclassified.</p>'
    },
    {
      name: 'perceptron_rule_end',
      text: '<p>Applying change. All examples are classified correctly, thus the algorithm terminates.</p>'
    },
    {
      name: 'xor_start',
      text: "<p>We now model the function <strong>x<sub>1</sub> XOR x<sub>2</sub></strong> (exclusive or).\
      You can read this as <em>Either x<sub>1</sub> is true or x<sub>2</sub> is true, but not both </em>&mdash;\
      or in slightly more formal terms (<strong>x<sub>1</sub> OR x<sub>2</sub>) AND NOT(x<sub>1</sub> AND x<sub>2</sub>)</strong>.</p>\
      <p>Are you able to find a configuration of parameters that solves this problem?</p>"
    },
    {
      name: 'xor_2',
      text: "<p>It turns out that it is <strong>not possible</strong> to build a perceptron to compute logical XOR!</p>\
      <p>As we have seen, the perceptron equation is the equation of a line that acts as a decision boundary:\
      that assigns output <span class='negative'>-1</span> to all point lying on one side of the line and <span class='positive'>+1</span> to all points lying on the other side.</p>\
      <p>There is simply <strong>no way</strong> to daw a line that separates the <span class='positive'>positive</span> cases of XOR from the <span class='negative'>negative</span> ones.\
      So we say that XOR is not a <strong>linearly separable</strong> function</p>"
    },
    {
      name: 'ml_perceptron_start',
      text: '<p>Enter the <strong>multilayer perceptron</strong>.</p>\
      <p>In addition to <strong>input and output units</strong>, the multilayer perceptron has one or more layers of <strong>hidden units</strong> (here h<sub>1</sub> and h<sub>2</sub>).</p>'
    },
    {
      name: 'ml_perceptron_2',
      text: "<p>Because of the presence of hidden layers, the multilayer perceptron can solve problems that are not linearly separable.</p>\
      <p>Can you find a configuration of parameters that solves the XOR problem?</p>"
    },
    {
      name: 'ml_perceptron_3',
      text: "<p>Here we show a configuration of parameters that solves the XOR problem. You can inspect the decision boundary of each hidden node by clicking on them.</p>"
    },
    {
      name: 'ml_perceptron_end',
      text: "<p>Here you can see that the hidden nodes create a representation of the input data where the problem is linearly separable.</p>"
    }
  ],

  mnist: [
    {
      name: 'start',
      text: "<p>Multilayer perceptrons can be trained to solve also more interesting problems, as for example to <strong>classify handwritten digits</strong></p>\
      <p>In this example we represent each digit as a <strong>8x8 grid of pixels</strong>.</p>"
    },
    {
      name: 'decompose_input',
      text: "<p>We represent the grid as a vector of 64 numbers. Each number represent how dark the corresponding pixel is.</p>"
    },
    {
      name: 'enter_input_nodes',
      text: '<p>And now we can build our perceptron: we have 64 input units.</p>'
    },
    {
      name: 'enter_output_nodes',
      text: '<p>And one output node for each digit: so 10 output nodes</p>'
    },
    {
      name: 'enter_hidden_nodes',
      text: '<p>And two hidden layers with 16 nodes each</p>'
    },
    {
      name: 'enter_links',
      text: '<p>Can you compute how many <strong>parameters</strong> should the perceptron have?</p>'
    },

    {
      name: 'end',
      text: '<p>The perceptron has already been trained. Click on the test <span class="example">examples</span> to see the model output</p>'
    }
  ],
  skipgram: [
    {
      name: 'start',
      text: '<p>Here we show only the forward pass for SkipGram</p>'
    },
    {
      name: 'activate_input',
      text: '<p>Suppose we encounter the word <em>dog</em>.</p>'
    },
    {
      name: 'activate_output_1',
      text: '<p>Compute the activation for output <em>dog</em></p>'
    },
    {
      name: 'activate_output_2',
      text: '<p>Compute the activation for output <em>cat</em></p>'

    },
    {
      name: 'activate_output_3',
      text: '<p>Compute the activation for output <em>eat</em></p>'

    },
    {
      name: 'activate_output_4',
      text: '<p>Compute the activation for output <em>bark</em></p>'
    },
    {
      name: 'softmax',
      text: '<p>The activations of the output units are passed into a <em>softmax</em> in order to output probabilities.</p>'
    }
  ]
};