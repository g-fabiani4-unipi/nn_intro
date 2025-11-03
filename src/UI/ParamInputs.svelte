<script>
	export let params;
	export let currentStep;
</script>

<ul>
	{#each params as param}
		<li>
			<input
				type="number"
				name=""
				id=""
				bind:value={param}
				disabled={currentStep >= 3 && currentStep < 12}
			/>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul > li {
		padding-top: 10px;
	}

	input {
		width: 70px;
	}
</style>
