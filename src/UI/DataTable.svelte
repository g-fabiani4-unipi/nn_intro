<script>
	import { fade } from 'svelte/transition';
	export let data;
	export let targetFunc;
	export let highlightExample;
	export let removeHighlight;
	export let showData;
</script>

<table>
	<caption>
		{targetFunc.toUpperCase()} Logic Gate
	</caption>
	<thead>
		<tr>
			<th>Example</th>
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
				{#if showData}
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
		width: 250px;
		margin: 10px auto;
		border-collapse: collapse;
		border-top: 1px solid #999;
		border-bottom: 1px solid #999;
	}

	th,
	td {
		vertical-align: top;
		padding: 0.3em;
	}

	tr {
		text-align: end;
	}

	tr :nth-child(1) {
		text-align: start;
	}

	tbody tr:nth-child(odd) {
		background-color: #eee;
	}

	tbody tr.highlighted {
		background-color: var(--hunyadi-yellow);
		transition: all 300ms;
	}

	caption {
		padding: 1em;
		font-style: italic;
		caption-side: bottom;
		letter-spacing: 1px;
	}
</style>
