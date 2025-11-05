<script>
	export let disableInput;
	export let network;
	export let currentNetwork;
</script>

<div>
	{#each network[currentNetwork].links as link}
		<input
			type="number"
			name=""
			id=""
			bind:value={link.weight}
			disabled={disableInput}
		/>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
	}
	input {
		width: 70px;
	}
</style>
