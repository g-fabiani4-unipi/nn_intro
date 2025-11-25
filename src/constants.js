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
      text: `<p>And now we have our perceptron. It has <strong>two input units</strong> in order to model the fact that the AND function takes two arguments.</p>`
    },
    {
      name: 'enter_data',
      text: "<p>As we have seen, the perceptron can only handle numbers, so we need to convert our <span class='example'>examples</span> into numbers, somehow.\
      Here we chose to use <strong>1</strong> for <strong>True</strong> and <strong>-1</strong> for <strong>False</strong>.</p>\
      <p>Now it is possible to draw all examples from the truth table on a cartesian coordinate system:\
      we filled <span class='positive'>positive examples</span> in green and <span class='negative'>negative examples</span> in pink.</p>\
      <p>Can you find a parameter configuration that makes all and only <span class='positive'>positive</span> examples fall on the\
       <span class='positive'>positive side</span> of the decision boundary?</p>"
    },
    {
      name: 'perceptron_rule_start',
      text: '<p>Show the perceptron learning rule.</p><p>I am resetting the parameters, but notice that this is somewhat hacky and prevents changing the params in the current step. You should also disable the inputs</p>'
    },
    {
      name: 'perceptron_rule_2',
      text: '<p>This example is in fact misclassified. <span class="example">Example&nbsp;2</span> falls on the <span class="positive">positive</span> side of the boundary even though it is <span class="negative">negative</span></p>'
    },
    {
      name: 'perceptron_rule_3',
      text: '<p>Hardcoded the parameters update</p>'
    },
    {
      name: 'perceptron_rule_4',
      text: '<p>This example is okay</p>'
    },
    {
      name: 'perceptron_rule_5',
      text: '<p>This is not</p>'
    },
    {
      name: 'perceptron_rule_6',
      text: '<p>Applying change</p>'
    },
    {
      name: 'perceptron_rule_7',
      text: '<p>Applying change</p>'
    },
    {
      name: 'perceptron_rule_8',
      text: '<p>Sh#t, now 2 is misclassified</p>'
    },
    {
      name: 'perceptron_rule_9',
      text: '<p>This is the correct step here (and now 4 is misclassified)</p>'
    },
    {
      name: 'perceptron_rule_end',
      text: '<p>Solved.</p>'
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
      text: '<p>Enter the multilayer perceptron</p>'
    },
    {
      name: 'ml_perceptron_2',
      text: "<p>Write something here</p>"
    },
    {
      name: 'ml_perceptron_3',
      text: "<p>A configuration of parameters that solves the XOR problem. You can inspect the decision boundary of each hidden node by clicking on them.</p>"
    },
    {
      name: 'ml_perceptron_end',
      text: "<p>Here you can see that the hidden nodes create a representation of the input data where the problem is linearly separable.</p>"
    }
  ],

  mnist: [
    {
      name: 'start',
      text: "<p>This is the first step in the mnist section</p>"
    },
    {
      name: 'decompose_input',
      text: "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.Aliquid doloremque, enim dolores nam aliquam tenetur dignissimos ullam itaque odit ipsum consequuntur officiis, dolorum minima vel ipsa facilis vero architecto.Deleniti.</p>"
    },
    {
      name: 'enter_input_nodes',
      text: '<p>So we can build our perceptron: we have 64 Input nodes</p>'
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
      text: '<p>Una botta di calcoli</p>'
    },

    {
      name: 'end',
      text: '<p>Click on the test <span class="example">examples</span> to see the model output</p>'
    }
  ],
  skipgram: [
    {
      name: 'start',
      text: '<p>Here starts the skipgram section</p>'
    },
    {
      name: 'activate_input',
      text: '<p>Activate node</p>'
    },
    {
      name: 'activate_output_1',
      text: '<p>Activate output 1</p>'
    },
    {
      name: 'activate_output_2',
      text: '<p>Activate output 2</p>'
    },
    {
      name: 'activate_output_3',
      text: '<p>Activate output 3</p>'
    },
    {
      name: 'activate_output_4',
      text: '<p>Activate output 4</p>'
    },
    {
      name: 'softmax',
      text: '<p>Pass network outputs in softmax</p>'
    }
  ]
};