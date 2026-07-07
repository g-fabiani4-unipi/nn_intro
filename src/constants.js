import { text } from "d3";

export const positiveColor = '#7FBC41';
export const negativeColor = '#C51B7D';
export const blackOlive = '#36382eff';
export const gray = '#eeefebff';

export const allSteps = {
	perceptron: [
		{
			name: 'start',
			text: '<p>Suppose we want the perceptron to model the function <strong>x<sub>1</sub> OR x<sub>2</sub></strong>.</p>\
      <p>Since this is a fairly simple problem, we can show all relevant examples in a <strong>truth table.</strong></p>',
		},
		{
			name: 'enter_network',
			text: '<p>And now we have our perceptron. It has <strong>two input units</strong> (x<sub>1</sub> and x<sub>2</sub>) in order to model the fact that the OR function takes two arguments.</p>\
      <p>Notice that the <strong>input units</strong> are linked to the <strong>output unit</strong> by weighted edges.\
      These weights are usually called the perceptron <strong>parameters</strong>.</p>',
		},
		{
			name: 'enter_network_2',
			text: '<p>The <strong>output unit</strong> performs a weighted sum of the inputs and then passes the result of the sum through an <strong>activation function</strong>,\
      which returns <strong>-1</strong> if the sum is negative and <strong>1</strong> if the sum is 0 or positive.</p>',
		},

		{
			name: 'enter_data',
			text: "<p>As we have seen, the perceptron can only handle numbers, so we need to convert our <span class='example'>examples</span> into numbers, somehow.\
      Here we chose to use <strong>1</strong> for <strong>True</strong> and <strong>-1</strong> for <strong>False</strong>.</p>",
		},
		{
			name: 'enter_data_2',
			text: "<p>Now it is possible to draw all examples from the truth table on a cartesian coordinate system:\
      we filled <span class='positive'>positive examples</span> in green and <span class='negative'>negative examples</span> in pink.</p>\
      <p class='note'>Notice that you can hover over an <span class='example'>example</span> in the table in order to highlight it on the graph and the other way around.</p>",
		},
		{
			name: 'enter_output',
			text: "<p>On the cartesian coordinate system we also show for which values of <strong>x<sub>1</sub></strong> and <strong>x<sub>2</sub></strong> the ouput of the perceptron\
      is <span class='positive'>1</span> or <span class='negative'>-1</span> with the current configuration of parameters.</p>\
      <p>We call the line between these two regions the <strong>decision boundary</strong> of the perceptron.\
      Notice that manipulating the <strong>perceptron parameters</strong> controls the <strong>slope</strong> of the decision boundary.</p>",
		},
		{
			name: 'or_exercise',
			text: "<p>Can you find a parameter configuration that makes all and only <span class='positive'>positive</span> examples fall on the\
       <span class='positive'>positive side</span> of the decision boundary?</p>\
       <p class='note'>Notice that if the decision boundary is intersecting an example, that example is classified as <span class='positive'>positive</span>.\
       You may want to confirm this by computing the output of the perceptron yourself.\
       Putting together the weighted sum and the activation function, the output of the perceptron is positive when\
       	<math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
		display='inline'\
        >\
		<msub><mi>w</mi><mn>1</mn></msub>\
		<msub><mi>x</mi><mn>1</mn></msub>\
		<mo>+</mo>\
		<msub><mi>w</mi><mn>2</mn></msub>\
		<msub><mi>x</mi><mn>2</mn></msub>\
		<mo>&GreaterEqual;</mo>\
		<mn>0</mn>\
		<mo>.</mo>\
	</math></p>",
		},
		{
			name: 'or_end',
			text: "<p>That wasn't so bad!</p>",
		},
		{
			name: 'and_start',
			text: "<p>What about modeling <strong>x<sub>1</sub> AND x<sub>2</sub></strong>?\
      Do you think that you can find a configuration of parameters that solves this problem?</p>\
      <p class='note'>Remember that examples that are intersected by the decision boundary are classified as <span class='positive'>positive</span>.</p>",
		},
		{
			name: 'and_2',
			text: '<p>Here we encounter an issue! At the moment our perceptron can only draw <strong>decision boundaries</strong> that pass through the <strong>origin</strong> of the coordinate system.</p>',
		},
		{
			name: 'enter_bias',
			text: '<p>In order to solve this issue, we introduce a new type of unit: the <strong>bias unit</strong>.</p>\
      <p>The value held by the bias unit is <strong>always 1</strong> (because it is not associated with any part of the input).\
      Notice how changing the bias parameter controls the <strong>intercept</strong> of the decision boundary.</p>',
		},
		{
			name: 'and_exercise',
			text: '<p>You should now be able to find a configuration of parameters that allows you to model <strong>x<sub>1</sub> AND x<sub>2</sub></strong>.</p>',
		},
		{
			name: 'perceptron_rule_intro',
			text: "<p>The perceptron is able to set its own parameters by correcting the <strong>classification error</strong> on a training set.</p>\
      <p>After presenting the perceptron a training example, the classification error is computed as the <strong>difference between the\
      expected ouput and the actual output</strong> of the perceptron for the current example\
      <math\
          xmlns = 'http://www.w3.org/1998/Math/MathML'\
      display='block' class='math-block'\
        >\
		<mi>E</mi>\
    <mo>=</mo>\
    <mi>t</mi><mo>−</mo><mi>y</mi>\
	</math >\
      </p>",
		},
		{
			name: 'perceptron_rule_intro_2',
			text: "<p>The update to each parameter is computed using the <strong>perceptron learning rule</strong>:\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
    class='math-block'\
		display='block'\
        >\
		<mi>Δ</mi><msub><mi>w</mi><mi>i</mi></msub>\
    <mo>=</mo>\
    <mi>η</mi><mi>E</mi>\
    <msub><mi>x</mi><mi>i</mi></msub>\
	</math >\
  where\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
		display='inline'><mi>η</mi><mo>&gt;</mo><mn>0</mn>\
	</math >\
  is the <strong>learning rate</strong> and controls how great of a step we take in the right direction.\
  </p >\
",
		},
		{
			name: 'perceptron_rule_start',
			text: '<p>We start with random parameters.</p>\
      <p><span class="example">Example 1</span> is classified correctly, so no change is necessary.</p>',
		},
		{
			name: 'perceptron_rule_2',
			text: "<p><span class='example'>Example&nbsp;2</span> is in fact misclassified. This example falls on the <span class='positive'>positive</span>\
      side of the boundary even though it is <span class='negative'>negative</span>.</p>\
      <p>We compute the classification error as\
    <math\
          xmlns = 'http://www.w3.org/1998/Math/MathML'\
      display='block' class='math-block'\
        >\
		<mi>E</mi>\
    <mo>=</mo>\
    <mi>t</mi><mo>−</mo><mi>y</mi>\
    <mo>=</mo><mo>−</mo><mn>2</mn>\
	</math >\
      </p>",
		},
		{
			name: 'perceptron_rule_3',
			text: "<p>Plugging the error in the <strong>perceptron learning rule</strong>, we obtain the following updates:\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
    class='math-block'\
		display='block'\
        >\
		<mi>Δ</mi><msub><mi>w</mi><mi>1</mi></msub>\
    <mo>=</mo>\
        <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
    <mn>1</mn>\
        <mo>=</mo><mo>−</mo><mn>2</mn>\
	</math >\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
    class='math-block'\
		display='block'\
        >\
		<mi>Δ</mi><msub><mi>w</mi><mi>2</mi></msub>\
    <mo>=</mo>\
        <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
        <mo>(</mo><mo>−</mo><mn>1</mn><mo>)</mo>\
    <mo>=</mo><mn>2</mn>\
	</math >\
<math\
  xmlns='http://www.w3.org/1998/Math/MathML'\
  class='math-block'\
  display='block'\
>\
    <mi>Δ</mi><msub><mi>w</mi><mi>0</mi></msub>\
    <mo>=</mo>\
    <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
    <mn>1</mn>\
    <mo>=</mo><mo>−</mo><mn>2</mn>\
</math >\
      </p >\
    <p class='note'>Note that for convenience we are using <strong>learning rate</strong> of\
    <math\
          xmlns = 'http://www.w3.org/1998/Math/MathML'\
      display='inline'>\
		<mi>η</mi>\
    <mo>=</mo>\
    <mn>1</mn>\
	</math >,\
  while in a real application the learning rate would be much lower.</p> ",
		},
		{
			name: 'perceptron_rule_4',
			text: '<p><span class="example">Example 3</span> is classified correctly, so no change is necessary.</p>',
		},
		{
			name: 'perceptron_rule_5',
			text: "<p><span class='example'>Example 4</span>, however, is misclassified.\
      We compute the classification error as\
        <math\
          xmlns = 'http://www.w3.org/1998/Math/MathML'\
      display='block' class='math-block'\
        >\
		<mi>E</mi>\
    <mo>=</mo>\
    <mi>t</mi><mo>−</mo><mi>y</mi>\
    <mo>=</mo><mo>−</mo><mn>2</mn>\
	</math >\
      </p>",
		},
		{
			name: 'perceptron_rule_6',
			text: "<p>And the following updates to the parameters\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
    class='math-block'\
		display='block'\
        >\
		<mi>Δ</mi><msub><mi>w</mi><mi>1</mi></msub>\
    <mo>=</mo>\
        <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
        <mo>(</mo><mo>−</mo><mn>1</mn><mo>)</mo>\
    <mo>=</mo><mn>2</mn>\
	</math >\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
    class='math-block'\
		display='block'\
        >\
		<mi>Δ</mi><msub><mi>w</mi><mi>2</mi></msub>\
    <mo>=</mo>\
        <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
    <mn>1</mn>\
        <mo>=</mo><mo>−</mo><mn>2</mn>\
	</math >\
<math\
  xmlns='http://www.w3.org/1998/Math/MathML'\
  class='math-block'\
  display='block'\
>\
    <mi>Δ</mi><msub><mi>w</mi><mi>0</mi></msub>\
    <mo>=</mo>\
    <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
    <mn>1</mn>\
    <mo>=</mo><mo>−</mo><mn>2</mn>\
</math >\
      which concludes the first <strong>epoch</strong> of training, since we presented the perceptron all training examples.</p>",
		},
		{
			name: 'perceptron_rule_7',
			text: "<p>We now start the second <strong>epoch</strong> of training.</p>\
      <p><span class='example'>Examples 1, 2 and 3</span> are all classified correctly, so no change is necessary.</p>",
		},
		{
			name: 'perceptron_rule_8',
			text: "<p><span class='example'>Example  4</span> is still misclassified, so we apply the same updates as before:\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
    class='math-block'\
		display='block'\
        >\
		<mi>Δ</mi><msub><mi>w</mi><mi>1</mi></msub>\
    <mo>=</mo>\
        <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
        <mo>(</mo><mo>−</mo><mn>1</mn><mo>)</mo>\
    <mo>=</mo><mn>2</mn>\
	</math >\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
    class='math-block'\
		display='block'\
        >\
		<mi>Δ</mi><msub><mi>w</mi><mi>2</mi></msub>\
    <mo>=</mo>\
        <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
    <mn>1</mn>\
        <mo>=</mo><mo>−</mo><mn>2</mn>\
	</math >\
<math\
  xmlns='http://www.w3.org/1998/Math/MathML'\
  class='math-block'\
  display='block'\
>\
    <mi>Δ</mi><msub><mi>w</mi><mi>0</mi></msub>\
    <mo>=</mo>\
    <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
    <mn>1</mn>\
    <mo>=</mo><mo>−</mo><mn>2</mn>\
</math >\
      </p>",
		},
		{
			name: 'perceptron_rule_9',
			text: "<p>We are now at the third <strong>epoch</strong> of training and <span class='example'>example 4</span>\
      is still misclassified, so we apply the same updates as before.</p>",
		},
		{
			name: 'perceptron_rule_10',
			text: "<p>Notice that applying the correction for <span class='example'>example 4</span>, we caused <span class='example'>example 2</span> to be misclassified:\
      we will fix that in the next <strong>epoch</strong>.</p>",
		},
		{
			name: 'perceptron_rule_11',
			text: "<p>Finally, we apply the following updates for <span class='example'>example 2</span>:\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
    class='math-block'\
		display='block'\
        >\
		<mi>Δ</mi><msub><mi>w</mi><mi>1</mi></msub>\
    <mo>=</mo>\
        <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
    <mn>1</mn>\
        <mo>=</mo><mo>−</mo><mn>2</mn>\
	</math >\
  <math\
		xmlns='http://www.w3.org/1998/Math/MathML'\
    class='math-block'\
		display='block'\
        >\
		<mi>Δ</mi><msub><mi>w</mi><mi>2</mi></msub>\
    <mo>=</mo>\
        <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
        <mo>(</mo><mo>−</mo><mn>1</mn><mo>)</mo>\
    <mo>=</mo><mn>2</mn>\
	</math >\
<math\
  xmlns='http://www.w3.org/1998/Math/MathML'\
  class='math-block'\
  display='block'\
>\
    <mi>Δ</mi><msub><mi>w</mi><mi>0</mi></msub>\
    <mo>=</mo>\
    <mi>η</mi><mo>(</mo><mo>−</mo><mn>2</mn><mo>)</mo>\
    <mn>1</mn>\
    <mo>=</mo><mo>−</mo><mn>2</mn>\
</math >\
      </p>",
		},
		{
			name: 'perceptron_rule_end',
			text: '<p>All examples are classified correctly, thus the algorithm terminates.</p>',
		},
		{
			name: 'perceptron_rule_exercise',
			text: `<p>We encourage you to try out the perceptron learning rule in order to find a solution for the <strong>AND function</strong>.
      From the present configuration of parameters  and with
      <math\
      xmlns = 'http://www.w3.org/1998/Math/MathML'\
        display='inline'>\
      <mi>η</mi>\
      <mo>=</mo>\
      <mn>1</mn>\
    </math > it should only take you three updates.</p>`,
		},
		{
			name: 'xor_start',
			text: '<p>We now model the function <strong>x<sub>1</sub> XOR x<sub>2</sub></strong> (exclusive or).\
      You can read this as <em>Either x<sub>1</sub> is true or x<sub>2</sub> is true, but not both </em>&mdash;\
      or in slightly more formal terms (<strong>x<sub>1</sub> OR x<sub>2</sub>) AND NOT(x<sub>1</sub> AND x<sub>2</sub>)</strong>.</p>\
      <p>Are you able to find a configuration of parameters that solves this problem?</p>',
		},
		{
			name: 'xor_2',
			text: "<p>It turns out that it is <strong>not possible</strong> to build a perceptron to compute logical XOR!</p>\
      <p>There is simply <strong>no way</strong> to draw a line that separates the <span class='positive'>positive</span> cases of XOR from the <span class='negative'>negative</span> ones.\
      So we say that XOR is not a <strong>linearly separable</strong> function</p>",
		},
		{
			name: 'ml_perceptron_start',
			text: '<p>Enter the <strong>multi-layer perceptron</strong>.</p>\
      <p>In addition to <strong>input and output units</strong>, the multi-layer perceptron has one or more layers of <strong>hidden units</strong> (here h<sub>1</sub> and h<sub>2</sub>).</p>',
		},
		{
			name: 'ml_perceptron_2',
			text: `<p>Because of the presence of hidden layers, the multi-layer perceptron can\
      <strong>solve problems that are not linearly separable</strong>.</p>\
      <p>Can you now find a configuration of parameters that solves the XOR problem?</p>\
      <p class="note">Note that  you can inspect the decision boundary of each hidden unit by clicking on them.</p>`,
		},
		{
			name: 'ml_perceptron_3',
			text: '<p>Here we show a configuration of parameters that solves the XOR problem (your solution may differ).</p>',
		},
		{
			name: 'ml_perceptron_4',
			text: '<p>Notice that the decision boundary created by unit h<sub>1</sub> models <strong>x<sub>1</sub> OR x<sub>2</sub></strong>…</p>',
		},
		{
			name: 'ml_perceptron_5',
			text: '<p>while unit h<sub>2</sub> models <strong>NOT(x<sub>1</sub> AND x<sub>2</sub>)</strong>…</p>',
		},

		{
			name: 'ml_perceptron_end',
			text: '<p>and together the hidden units <strong>create a projection</strong> of the input data in a space where the problem is linearly separable.</p>',
		},
	],

	mnist: [
		{
			name: 'start',
			text: '<p>Multi-layer perceptrons can be trained to solve also more interesting problems, as for example to <strong>classify handwritten digits</strong>.</p>',
		},
		{
			name: 'enter_examples',
			text: "<p>For this task we would need a great number of examples of handwritten digits, each correctly <strong>labelled</strong> as a digit from 0 to 9 by a <strong>human annotator</strong>.</p>\
      <p class='note'>Here we show only 100, but normally we would use several thousands of examples.</p>",
		},
		{
			name: 'train_test_split',
			text: `<p>We reserve some examples for the evaluation of the model. This means that we won't submit these examples to the perceptron during training.</p>
      <p>This is done to verify that the model is really <strong>generalizing</strong> from the data instead of simply <strong>memorizing</strong> them.</p>`,
		},
		{
			name: 'magnify',
			text: '<p>Each example is an image with resolution <strong>8x8 pixels</strong>.</p>',
		},
		{
			name: 'decompose_input',
			text: '<p>We represent the grid as a list of <strong>64 numbers</strong>. Each number represent how dark the corresponding pixel is.</p>',
		},
		{
			name: 'enter_input_nodes',
			text: '<p>And now we can build our perceptron: we have <strong>64 input units</strong>…</p>',
		},
		{
			name: 'enter_output_nodes',
			text: '<p>and one output unit for each digit: so <strong>10 output units</strong></p>',
		},
		{
			name: 'enter_hidden_nodes',
			text: `<p>And <strong>two hidden layers</strong> with <strong>16 units</strong> each.</p>
      <p class="note">While the number of input and output units is strictly dependent from the <strong>shape of the input data</strong> and the <strong>number of classes</strong>,
      the number of hidden layers and their size is a matter of choice that requires balancing model complexity, training efficiency and generalization.</p>`,
		},
		{
			name: 'enter_links',
			text: '<p>Can you compute how many <strong>parameters</strong> should the perceptron have?</p>',
		},
		{
			name: 'enter_links_2',
			text: `<p>Since each layer is <strong>fully connected</strong> to the next, we have
        <math\
      xmlns='http://www.w3.org/1998/Math/MathML'\
      display='inline'\
          >\
      <mn>64</mn>
      <mo>×</mo>\
      <mn>16</mn>\
      <mo>=</mo>
      <mn>1024</mn>
    </math>
    parameters connecting the input layer to the first hidden layer, plus
    <math\
      xmlns='http://www.w3.org/1998/Math/MathML'\
      display='inline'\
          >\
      <mn>16</mn>
      <mo>×</mo>\
      <mn>16</mn>\
      <mo>=</mo>
      <mn>256</mn>
    </math>
    parameters connecting the two hidden layers, plus
        <math\
      xmlns='http://www.w3.org/1998/Math/MathML'\
      display='inline'\
          >\
      <mn>16</mn>
      <mo>×</mo>\
      <mn>10</mn>\
      <mo>=</mo>
      <mn>160</mn>
    </math>
    parameters from the last hidden layer to the output layer.</p>`,
		},
    {
      name: 'enter_links_3',
      text: `<p> We should also add
      <math\
      xmlns='http://www.w3.org/1998/Math/MathML'\
      display='inline'\
          >\
      <mn>16</mn>
      <mo>+</mo>\
      <mn>16</mn>\
      <mo>+</mo>\
      <mn>10</mn>
      <mo>=</mo>
      <mn>42</mn>
    </math> parameters <strong>connecting the bias units to each non input unit</strong> (not shown),
    for a total of 1482 parameters.
      </p>`
    },
		{
			name: 'train',
			text: `<p>During &ldquo;training&rdquo; the parameters of the perceptron are updated in order to <strong>reduce the error</strong> on the training examples.</p>
      <p>In order to <strong>evaluate</strong> the performance of the perceptron, we use the data we <strong>set apart</strong> previously.</p>`,
		},
		{
			name: 'test',
			text: `<p>This <span class="example">example</span> has been correctly classified as a&nbsp;<strong>5</strong>.</p>
      <p>Notice that for a <strong>multiclass</strong> classification task as this, the raw output
      of the perceptron is converted to a <strong>probability distribution</strong> over the possible outcomes.</p>`,
		},
		{
			name: 'test_2',
			text: '<p>This second test <span class="example">example</span> is also classified correctly.</p>',
		},
		{
			name: 'test_3',
			text: '<p>But the third test <span class="example">example</span> is <strong>misclassified</strong>. As a matter of fact, this perceptron gives a wrong output for little more than <strong>one in ten</strong> examples of the test set.</p>',
		},
    {
      name: 'test_4',
      text: `<p>This may seem acceptable, but imagine you are using this perceptron in order to <strong>sort mail by ZIP codes</strong>.
      Since the overall accuracy of the classifier is 88%, assuming 5-digits ZIP codes, the probability of reading a ZIP code without errors is around 53%.
      </p>
      <p>Doesn't look so good when half your mail goes to the wrong place? Does it?</p>`
    },
    {
      name: 'test_5',
      text: `<p><strong>Errors</strong> are an inescapable fact in <strong>machine learning</strong>.
      They can be sometimes mitigated by using a <strong>more complex</strong> or a
      <strong>less complex</strong> model, <strong>more data</strong> or data <strong>better</strong>
      suited to the task.</p>
      <p>Some other times, <strong>the task should not be automated at all</strong>.</p>`
    }
	],
};