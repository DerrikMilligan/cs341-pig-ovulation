<script context="module">
	export async function load({ page, fetch }) {
		const _id = page.params.id;
		const res = await fetch('/pigs/getpig', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				{
					pigId: _id
				},
				null,
				2
			)
		});
		if (res.ok) {
			const body = await res.json();

			//   console.log(body);

			return {
				props: { pig: body.pig }
			};
		}
	}
</script>

<script lang="ts">
	import type { Pig } from '$lib/types';
	import type { PigSnapshot } from '$lib/types';
    // import "bootstrap/js/dist/carousel.js";

    import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let name: string;
	let description: string;
	let notes: string;
	let timestamp: Date;
	// let image: File;
    export let pig: Pig[];
    export let pigSnapshot: PigSnapshot[];
    let today = new Date()
    let month = today.getMonth();
    let day = today.getDay();
    let year = today.getFullYear();
    let date = today.toLocaleDateString('en-CA');
    let yearFirst = ` ${year}-${month}-${day} `;
    let dateFormatted =`${day}/${month}/${year} `
   
    
	
</script>

<svelte:head>
	<title>{pig.name} {yearFirst}</title>
</svelte:head>

<h1> { dateFormatted }</h1>

<form action="">
    
  
    <div class="form-group">
        <label for="image">Image</label>
        <input type="file" class="form-control" name="image" id="image"/><br>
    </div> 
    <div class="form-group">
        <label for="timestamp"> Date of snapshot</label>
        <input   bind:value={date} type="date" class="form-control" name="timestamp" id="timestamp"/><br />
    </div>
     <div class="form-group">
        <label for="notes">Notes</label>
        <input bind:value={notes} type="text" class="form-control" name="notes" id="notes"/><br>
    </div>
    
    
</form>


