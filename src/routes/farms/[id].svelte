<script context="module" lang="ts">
  let show = false;
  
  export async function load({ fetch, page }) {
    const _id = page.params.id;

    const res = await fetch('/pigs/getpigs', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        farmId: _id,
      }, null, 2),
    });
    
    if (res.ok) {
      const body = await res.json();

      console.log(body);

      return {
        props: { pigs: body.pigs, },
      };
    }
  };

  
</script>

<script lang="ts">
  import { page } from '$app/stores';
	import { goto } from '$app/navigation';
  import type { Pig } from '$lib/types';
  import PigList from '$lib/components/PigList.svelte';
  import Modal from '$lib/components/Modal.svelte';

  export let pigs: Pig[];
  let show = false;
  let pigId;
  let errorMessage = '';
  
  async function deletePig(pigId) {
    const res = await fetch(
			'/pigs/deletePig',
			{
				method: 'POST',
				body: JSON.stringify({
					_id: pigId
				}),
			},
		);

    console.log(res);

		if (res.ok) {
			// const body = await res.json();
      // console.log(body);

			await goto(`/farms/${$page.params.id}`);
		} else {
			const body = await res.json();
      console.log('ERROR!');
			errorMessage = body.message;
		}
  }
</script>

<svelte:head>
  <title>My Farm</title>
</svelte:head>

<h1 class="mx-auto my-3">My Farm</h1>

<a class="btn btn-primary btn-sm p-1 mx-auto my-3" href="/pigs/new/{$page.params.id}">Add New Pig</a>

<PigList {pigs} bind:showModal={show} bind:pigId = {pigId}/>

{#if show}
  <Modal>
    <h1 slot="header">Deleting Pig</h1>
    <div slot="content" class="pt-4">
      <p>Are you sure you would like to delete you pig?</p>
      <button class="btn btn-primary btn-sm p-1" on:click={(e) => {e.preventDefault(); show = false;}}>Cancel</button>
      <button class="btn btn-primary btn-sm p-1" on:click="{() => deletePig(pigId)}">Delete Pig</button>
    </div>
  </Modal>
{/if}

<style>
  a {
    width: 120px;
  }
</style>
