<script>
	export let params;
	export let disableInput;
</script>

<ul>
	{#each params as param}
		<li>
			<input
				type="number"
				name=""
				id=""
				bind:value={param}
				disabled={disableInput}
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
