<script context="module">
	export async function load({ page, fetch }) {
		const _id = page.params.id;
		const res = await fetch('/pigs/getpig', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				pigId: _id
      })
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
	import type { Pig as PigType } from '$lib/types';
	import type { PigSnapshot } from '$lib/types';

  import { imageToBase64 } from '$lib/imageToBase64';

 //  import { page } from '$app/stores';
	// import { goto } from '$app/navigation';

	let name: string;
	let description: string;
	let notes: string;
	let timestamp: Date;
	// let image: File;
  export let pig: PigType;
  export let pigSnapshot: PigSnapshot[];
  let today = new Date()
  let month = today.getMonth();
  let day = today.getDay();
  let year = today.getFullYear();
  let date = today.toLocaleDateString('en-CA');
  let yearFirst = ` ${year}-${month}-${day} `;
  let dateFormatted =`${day}/${month}/${year} `
   
  async function addPigSnapshot(e: MouseEvent) {
		e.preventDefault();
		console.log("adding snapshot");
		

    const imageEl = document.querySelector('#image') as HTMLInputElement;
    const imageString = imageEl.files.length > 0
      ? await imageToBase64(imageEl.files[0])
      : '';

		const result = await fetch(`/pigs/addSnapshot`, {
				method: 'post',
				headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
				},
				body: JSON.stringify({
					pig:              pig._id,
					img:              imageString,
					// isSwelling:       isSwelling       || false,
					// presumedPregnant: presumedPregnant || false,
					notes:            notes,
					timestamp:        date,
				}),
		});

		if (result.ok) {
				const data = await result.json();
				console.log("data");
		}
  }
    
	
</script>

<svelte:head>
	<title>{pig.name} {date}</title>
</svelte:head>

<h1> { date }</h1>

<form>
    
    <div class="form-group">
        <label for="image">Image</label>
        <input type="file" class="form-control" name="image" id="image"/><br>
    </div> 

    <div class="form-group">
        <label for="timestamp"> Date of snapshot</label>
        <input bind:value={date} type="date" class="form-control" name="timestamp" id="timestamp"/><br />
    </div>

    <div class="form-group">
        <label for="notes">Notes</label>
        <input bind:value={notes} type="text" class="form-control" name="notes" id="notes"/><br>
    </div>

		<button class="btn btn-primary" on:click={addPigSnapshot}>Save Snapshot</button>
    
</form>


