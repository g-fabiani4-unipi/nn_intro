<script>
	export let data;
	export let targetFunc;
	export let highlightExample;
	export let removeHighlight;
	export let transformData;
</script>

<table>
	<caption>
		{targetFunc.toUpperCase()} Logic Gate
	</caption>
	<thead>
		<tr>
			<th>Example</th>
			<th colspan="2">Input</th>
			<th>Target</th>
		</tr>
		<tr>
			<th></th>
			<th>x<sub>1</sub></th>
			<th>x<sub>2</sub></th>
			<th>y</th>
		</tr>
	</thead>
	<tbody>
		{#each data[targetFunc] as row, i}
			<tr
				class={row.highlighted ? 'highlighted' : ''}
				on:mouseenter={() => highlightExample(row.example)}
				on:mouseleave={removeHighlight}
			>
				<th>{row.example}</th>
				{#if transformData}
					<td>{row.x1}</td>
					<td>{row.x2}</td>
					<td>{row.y}</td>
				{:else}
					<td>{row.x1 === 1 ? 'T' : 'F'}</td>
					<td>{row.x2 === 1 ? 'T' : 'F'}</td>
					<td>{row.y === 1 ? 'T' : 'F'}</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		table-layout: fixed;
		width: 75%;
		margin: 10px auto;
		border-collapse: collapse;
		border-top: 1px solid var(--black-olive);
		border-bottom: 1px solid var(--black-olive);
		font-size: 1.2rem;
	}

	thead {
		border-bottom: 1px solid var(--black-olive);
	}

	th,
	td {
		vertical-align: top;
		padding: 0.3em;
	}

	tr {
		text-align: center;
	}

	tr :nth-child(1) {
		text-align: start;
	}

	tbody tr td:last-child {
		background-color: var(--gray);
	}

	tbody tr.highlighted {
		background-color: color-mix(
			in srgb,
			var(--hunyadi-yellow),
			transparent 30%
		);
		transition: all 300ms;
	}

	tbody tr.highlighted td:last-child {
		background-color: color-mix(
			in srgb,
			var(--hunyadi-yellow),
			transparent 80%
		);
		transition: all 300ms;
	}

	caption {
		padding: 1em;
		font-style: italic;
		caption-side: bottom;
		letter-spacing: 1px;
	}
</style>
