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
        pigId: _id,
      }, null, 2),
    });
		if (res.ok) {
      const body = await res.json();

    //   console.log(body);

      return {
        props: { pig: body.pig, },
      };
    }
	}
</script>

<script lang="ts">
import { page } from '$app/stores';
import { goto } from '$app/navigation';

import type { Pig } from '$lib/types';

export let pig: Pig;

let name: string = pig.name;
let description: string = pig.description;
let breed: string = pig.breed;
console.log(pig.birthDate.split('Z')[0]);
let dob: string = new Date(pig.birthDate.split('Z')[0]).toLocaleDateString('en-CA');
let errorMessage = '';


async function editPig(e) {
  e.preventDefault();

  const res = await fetch(
    '/pigs/editPig',
    {
      method: 'POST',
      body: JSON.stringify({
	_id: $page.params.id,
	name,
	description,
	breed,
	dob
      }),
    },
  );

  // console.log(res);

  if (res.ok) {
    const body = await res.json();
    //   console.log(body);

    await goto(`/pigs/${$page.params.id}`);
  } else {
    const body = await res.json();
    console.log('ERROR!');
    errorMessage = body.message;
  }
}
</script>

<svelte:head>
	<title>Edit Pig</title>
</svelte:head>

<h1>Edit Pig</h1>

<section>
	{#if errorMessage.length > 0}
	<div class="alert alert-danger py-2" role="alert">
		{errorMessage}
	</div>
	{/if}
	<form>
		<div class="form-group">
			<label for="name">Pig Name</label><br />
			<input bind:value={name} type="text" class="form-control" name="name" id="name" placeholder="Wilbur" /><br />
		</div>
		<div class="form-group">
			<label for="description">Description</label>
			<textarea
				bind:value={description} 
				class="form-control"
				name="description"
				id="description"
				cols="30"
				rows="3"
				placeholder="spot below left ear"
			/><br />
		</div>
		<div class="form-group">
			<label for="breed">Breed</label>
			<input bind:value={breed} type="text" class="form-control" name="breed" id="breed"/><br>
		</div>
		<div class="form-group">
			<label for="dob"> Aproximate Date of Birth</label>
			<input bind:value={dob} type="date" class="form-control" name="dob" id="dob"/><br />
		</div>
		<button type="submit" class="btn btn-primary" on:click="{editPig}">Edit Pig</button>
	</form>
</section>
