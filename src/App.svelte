<script>
	import OutputGraph from './Graphs/OutputGraph.svelte';
	import ParamInputs from './UI/ParamInputs.svelte';
	import DataTable from './UI/DataTable.svelte';
	import { steps } from './constants';

	import { json } from 'd3';
	import Scrolly from './Scrolly.svelte';

	let params = [1, 7, 7];
	let data;
	let currentStep = 0;
	let targetFunc = 'and';
	let showData = false;
	let showCanvas = false;
	let disableInput = false;

	$: if (steps && currentStep && data) {
		if (steps[currentStep].name == 'perceptron_rule_start') {
			highlightExample(1);
			params = [1, 7, 7];
		}
		if (steps[currentStep].name == 'perceptron_rule_2') {
			highlightExample(2);
		}
		if (steps[currentStep].name == 'perceptron_rule_3') {
			params = [-1, 9, 5];
		}
		if (steps[currentStep].name == 'perceptron_rule_4') {
			highlightExample(3);
		}
		if (steps[currentStep].name == 'perceptron_rule_5') {
			highlightExample(4);
		}
		if (steps[currentStep].name == 'perceptron_rule_6') {
			highlightExample(4);
			params = [1, 7, 3];
		}
		if (steps[currentStep].name == 'perceptron_rule_7') {
			highlightExample(4);
			params = [3, 5, 1];
		}
		if (steps[currentStep].name == 'perceptron_rule_8') {
			highlightExample(2);
			params = [5, 3, 1];
		}
		if (steps[currentStep].name == 'perceptron_rule_end') {
			params = [3, 1, -3];
		}
		if (currentStep < steps.findIndex((s) => s.name == 'xor_start')) {
			targetFunc = 'and';
		} else {
			targetFunc = 'xor';
		}
		if (currentStep >= steps.findIndex((s) => s.name == 'enter_data')) {
			showData = true;
		} else {
			showData = false;
		}
		if (
			currentStep >=
				steps.findIndex((s) => s.name == 'perceptron_rule_start') &&
			currentStep <= steps.findIndex((s) => s.name == 'perceptron_rule_end')
		) {
			disableInput = true;
		} else {
			disableInput = false;
		}
	}

	$: console.log(
		'current step',
		currentStep,
		steps[currentStep].name,
		showCanvas,
	);

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

<section class="section-container">
	<div class="steps-container">
		<Scrolly bind:value={currentStep}>
			{#each steps as { text }, i}
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
						showData={showData}
					/>
				</div>
			</div>
			<div class="column-params">
				<h3>Params</h3>
				<div>
					<ParamInputs
						bind:params={params}
						disableInput={disableInput}
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
						showData={showData}
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
