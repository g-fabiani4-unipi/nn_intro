export const positiveColor = '#7FBC41';
export const negativeColor = '#C51B7D';

export const paramNames = {
  'perceptron': [
    'w<sub>1</sub>',
    'w<sub>2</sub>',
    'w<sub>0</sub>',
  ],
  'ml_perceptron': [
    'w<sub>11</sub>',
    'w<sub>21</sub>',
    'w<sub>01</sub>',
    'w<sub>12</sub>',
    'w<sub>22</sub>',
    'w<sub>02</sub>',
    'w<sub>1y</sub>',
    'w<sub>2y</sub>',
    'w<sub>0y</sub>',
  ]
}

export const allSteps = {
  perceptron: [
    {
      name: 'start',
      text: "<p>This is a dynamic, responsive scatterplot that uses Russell Goldenberg's <a href='	https://twitter.com/codenberg/status/1432774653139984387' target='_blank'><code>Scrolly</code></a> to update its points' values on scroll.</p>"
    },
    {
      name: 'enter_network',
      text: '<p>This is working by chance and it is not reponsive.</p>'
    },
    {
      name: 'enter_data',
      text: "<p>Try resizing me to see the 'side-by-side' version, compared to the 'text-on-top' version that appears on small screens.</p><p>Want it to always appear 'text-on-top'? Just comment out the media query at the bottom of our styles (as in, leave the styles but comment out the surrounding <code>media</code> query).</p>"
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
      text: '<p>Introducing the XOR problem. No one bothered to animate this one</p>'
    },
    {
      name: 'ml_perceptron_start',
      text: '<p>Enter the multilayer perceptron</p>'
    },
    {
      name: 'ml_perceptron_2',
      text: "<p>Write something here</p>"
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
    }
  ]

};