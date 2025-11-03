<script>
	import OutputGraph from './Graphs/OutputGraph.svelte';
	import ParamInputs from './UI/ParamInputs.svelte';
	import DataTable from './UI/DataTable.svelte';

	import { json } from 'd3';
	import Scrolly from './Scrolly.svelte';

	let params = [1, 7, 7];
	let data;
	let visible = false;
	let currentStep;
	let targetFunc;

	const steps = [
		"<p>This is a dynamic, responsive scatterplot that uses Russell Goldenberg's <a href='	https://twitter.com/codenberg/status/1432774653139984387' target='_blank'><code>Scrolly</code></a> to update its points' values on scroll.</p>",
		'<p>This is working by chance and it is not reponsive.</p>',
		"<p>Try resizing me to see the 'side-by-side' version, compared to the 'text-on-top' version that appears on small screens.</p><p>Want it to always appear 'text-on-top'? Just comment out the media query at the bottom of our styles (as in, leave the styles but comment out the surrounding <code>media</code> query).</p>",
		'<p>Show the perceptron learning rule.</p><p>I am resetting the parameters, but notice that this is somewhat hacky and prevents changing the params in the current step. You should also disable the inputs</p>',
		'<p>This example is in fact misclassified</p>',
		'<p>Hardcoded the parameters update</p>',
		'<p>This example is okay</p>',
		'<p>This is not</p>',
		'<p>Applying change</p>',
		'<p>Applying change</p>',
		'<p>Sh#t, now 2 is misclassified</p>',
		'<p>Solved.</p>',
		'<p>Introducing the XOR problem. No one bothered to animate this one</p>',
	];

	$: switch (true) {
		case currentStep === 3:
			params = [1, 7, 7];
			highlightExample(1);
			targetFunc = 'and';
			break;
		case currentStep === 4:
			highlightExample(2);
			targetFunc = 'and';
			break;
		case currentStep === 5:
			params = [-1, 9, 5];
			break;
		case currentStep === 6:
			highlightExample(3);
			targetFunc = 'and';
			break;
		case currentStep === 7:
			highlightExample(4);
			targetFunc = 'and';
			break;
		case currentStep === 8:
			params = [1, 7, 3];
			targetFunc = 'and';

			break;
		case currentStep === 9:
			params = [3, 5, 1];
			targetFunc = 'and';

			break;
		case currentStep === 10:
			highlightExample(2);
			params = [5, 3, -1];
			targetFunc = 'and';

			break;
		case currentStep === 11:
			params = [3, 1, -3];
			targetFunc = 'and';

			break;
		case currentStep > 11:
			targetFunc = 'xor';
			break;
		default:
			targetFunc = 'and';
			break;
	}

	json('./data/data.json').then((result) => (data = result));

	function highlightExample(example) {
		data = {
			...data,
			[targetFunc]: data[targetFunc].map((row) => ({
				...row,
				highlighted: row.example === example,
			})),
		};
	}

	function removeHighlight() {
		data = {
			...data,
			[targetFunc]: data[targetFunc].map((row) => ({
				...row,
				highlighted: false,
			})),
		};
	}
</script>

<svelte:window on:click={() => (visible = !visible)} />

<section class="section-container">
	<div class="steps-container">
		<Scrolly bind:value={currentStep}>
			{#each steps as text, i}
				<div
					class="step"
					class:active={currentStep === i}
				>
					<div class="step-content">{@html text}</div>
				</div>
			{/each}
		</Scrolly>
	</div>
	{#if !data}
		<div class="loading">loading...</div>
	{:else}
		<div class="main-part sticky">
			<div class="column-data">
				<h3>Data</h3>
				<div>
					<DataTable
						data={data}
						targetFunc={targetFunc}
						highlightExample={highlightExample}
						removeHighlight={removeHighlight}
						currentStep={currentStep}
					/>
				</div>
			</div>
			<div class="column-params">
				<h3>Params</h3>
				<div>
					<ParamInputs
						bind:params={params}
						currentStep={currentStep}
					/>
				</div>
			</div>
			<div class="column-output">
				<h3>Output</h3>

				<div class="container">
					<OutputGraph
						params={params}
						bind:data={data}
						targetFunc={targetFunc}
						highlightExample={highlightExample}
						removeHighlight={removeHighlight}
						currentStep={currentStep}
					/>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.container {
		position: relative;
		height: 340px;
	}

	.sticky {
		position: sticky;
		top: 10%;
		flex: 1 1 60%;
		width: 60%;
	}

	.section-container {
		margin-top: 1em;
		text-align: center;
		transition: background 100ms;
		display: flex;
	}

	.step {
		height: 80vh;
		display: flex;
		place-items: center;
		justify-content: center;
	}

	.step-content {
		font-size: 1.2rem;
		background: whitesmoke;
		color: #ccc;
		border-radius: 5px;
		padding: 0.5rem 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		transition: background 500ms ease;
		box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
		text-align: left;
		width: 75%;
		margin: auto;
		max-width: 500px;
	}

	.step.active .step-content {
		background: white;
		color: black;
	}

	.steps-container,
	.sticky {
		height: 100%;
	}

	.steps-container {
		flex: 1 1 40%;
		z-index: 10;
	}

	/* Comment out the following line to always make it 'text-on-top' */
	@media screen and (max-width: 768px) {
		.section-container {
			flex-direction: column-reverse;
		}
		.sticky {
			width: 95%;
			margin: auto;
		}
	}
</style>
