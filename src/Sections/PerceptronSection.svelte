<script>
	import OutputGraph from '../Graphs/OutputGraph.svelte';
	import Network from '../Graphs/Network.svelte';
	import DataTable from '../UI/DataTable.svelte';
	import { allSteps } from '../constants';
	import { json } from 'd3';
	import Scrolly from '../UI/Scrolly.svelte';
	import { params } from '../stores';

	export let network;

	const steps = allSteps['perceptron'];

	let data;
	let currentStep;
	let targetFunc = 'and';
	let showData = false;
	let showCanvas = false;
	let showNetwork = false;
	let disableInput = false;
	let currentNetwork = 'ml_perceptron';

	function setParams(paramList) {
		const newParams = $params;
		paramList.forEach((param, i) => {
			newParams[i] = param;
		});
		params.set(newParams);
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
			params.set(network[currentNetwork].links.map((link) => link.weight));
		}

		// Perceptron rule parameters update
		if (steps[currentStep].name == 'enter_network') {
			params.set(network[currentNetwork].links.map((link) => link.weight));
		}
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
		<div class="sticky main-part">
			<div class="column-network">
				<Network
					bind:network={network}
					showNetwork={showNetwork}
					currentNetwork={currentNetwork}
					disableInput={disableInput}
				/>
			</div>
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
		</div>
	{/if}
</section>

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

	.main-part {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 30px;
		padding-top: 2px;
	}

	.column-output {
		width: 320px;
	}

	.column-data > div {
		padding-top: 20px;
	}
</style>
