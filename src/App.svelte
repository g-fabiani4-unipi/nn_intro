<script>
	import OutputGraph from './Graphs/OutputGraph.svelte';
	import Network from './Graphs/Network.svelte';
	import ParamInputs from './UI/ParamInputs.svelte';
	import DataTable from './UI/DataTable.svelte';
	import { steps } from './constants';
	import { json } from 'd3';
	import Scrolly from './Scrolly.svelte';

	let data;
	let network;
	let currentStep = 0;
	let targetFunc = 'and';
	let showData = false;
	let showCanvas = false;
	let showNetwork = false;
	let disableInput = false;
	let currentNetwork = 'ml_perceptron';

	function setParams(paramList) {
		paramList.forEach((param, i) => {
			network[currentNetwork].links[i].weight = param;
		});
	}

	// Handle scrollytelling steps
	$: if (steps && data) {
		if (currentStep >= steps.findIndex((s) => s.name == 'enter_network')) {
			showCanvas = true;
			showNetwork = true;
		} else {
			showCanvas = false;
			showNetwork = false;
		}

		showData = currentStep >= steps.findIndex((s) => s.name == 'enter_data');
		disableInput =
			currentStep >=
				steps.findIndex((s) => s.name == 'perceptron_rule_start') &&
			currentStep <= steps.findIndex((s) => s.name == 'perceptron_rule_end');
		targetFunc =
			currentStep < steps.findIndex((s) => s.name == 'xor_start')
				? 'and'
				: 'xor';
		currentNetwork =
			currentStep >= steps.findIndex((s) => s.name == 'ml_perceptron_start')
				? 'ml_perceptron'
				: 'perceptron';
		if (steps[currentStep].name == 'ml_perceptron_start') {
			console.log('adding parameters');
			// params = network[currentNetwork].links.map((link) => link.weight);
			disableInput = true;
		}

		// Perceptron rule parameters update
		if (steps[currentStep].name == 'perceptron_rule_start') {
			highlightExample(1);
			setParams([1, 7, 7]);
		}
		if (steps[currentStep].name == 'perceptron_rule_2') {
			highlightExample(2);
		}
		if (steps[currentStep].name == 'perceptron_rule_3') {
			setParams([-1, 9, 5]);
		}
		if (steps[currentStep].name == 'perceptron_rule_4') {
			highlightExample(3);
		}
		if (steps[currentStep].name == 'perceptron_rule_5') {
			highlightExample(4);
		}
		if (steps[currentStep].name == 'perceptron_rule_6') {
			highlightExample(4);
			setParams([1, 7, 3]);
		}
		if (steps[currentStep].name == 'perceptron_rule_7') {
			highlightExample(4);
			setParams([3, 5, 1]);
		}
		if (steps[currentStep].name == 'perceptron_rule_8') {
			highlightExample(2);
			setParams([5, 3, 1]);
		}
		if (steps[currentStep].name == 'perceptron_rule_end') {
			setParams([3, 1, -3]);
		}
	}

	json('./data/data.json').then((result) => (data = result));
	json('./data/network.json').then((result) => (network = result));

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
	{#if !(data && network)}
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

			<div class="column-output">
				<h3>Output</h3>

				<div class="container">
					<OutputGraph
						network={network}
						currentNetwork={currentNetwork}
						bind:data={data}
						targetFunc={targetFunc}
						highlightExample={highlightExample}
						removeHighlight={removeHighlight}
						showData={showData}
						showCanvas={showCanvas}
					/>
				</div>
			</div>
			<div class="column-params">
				<h3>Params</h3>
				<div>
					<ParamInputs
						bind:network={network}
						currentNetwork={currentNetwork}
						disableInput={disableInput}
					/>
					<Network
						network={network}
						showNetwork={showNetwork}
						currentNetwork={currentNetwork}
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
		top: 0;
		flex: 1 1 70%;
		width: 70%;
	}

	.section-container {
		margin-top: 1em;
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
		color: var(--black-olive);
	}

	.steps-container,
	.sticky {
		height: 100%;
	}

	.steps-container {
		flex: 1 1 30%;
		z-index: 10;
	}

	.main-part {
		flex-wrap: wrap;
	}

	.column-params {
		width: 75%;
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
