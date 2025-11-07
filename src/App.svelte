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
	let currentStep;
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
	$: if (steps && data && currentStep >= 0) {
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
		if (steps[currentStep].name == 'perceptron_rule_9') {
			highlightExample(4);
			setParams([3, 5, -1]);
		}
		if (steps[currentStep].name == 'perceptron_rule_end') {
			setParams([5, 3, -3]);
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

<section class="hero">
	<h1>The perceptron</h1>
</section>
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
		<div class="sticky main-part">
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

				<div class="graph-container">
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
				</div>
			</div>
			<div class="column-network">
				<Network
					network={network}
					showNetwork={showNetwork}
					currentNetwork={currentNetwork}
				/>
			</div>
		</div>
	{/if}
</section>
<section class="hero">Some more content here</section>

<style>
	.graph-container {
		position: relative;
		height: 340px;
		float: left;
		margin-top: 10px;
	}

	.column-network {
		width: 100%;
	}

	.column-params {
		width: 300px;
	}

	.main-part {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 30px;
		padding-top: 2px;
		min-height: 500px;
	}

	.column-output {
		width: 340px;
	}

	.column-data > div,
	.column-params > div {
		padding-top: 20px;
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
