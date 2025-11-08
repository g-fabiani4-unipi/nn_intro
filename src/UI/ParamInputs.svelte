<script>
	import { paramNames } from '../constants';
	export let disableInput;
	export let network;
	export let currentNetwork;
</script>

<div>
	{#each network[currentNetwork].links as link, i}
		<label>
			{@html paramNames[currentNetwork][i]}

			<input
				type="number"
				name=""
				id=""
				bind:value={link.weight}
				disabled={disableInput}
			/>
		</label>
	{/each}
</div>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	input {
		width: 70px;
	}
</style>
