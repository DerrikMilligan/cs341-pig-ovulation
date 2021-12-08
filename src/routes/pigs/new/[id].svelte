<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import { imageToBase64 } from '$lib/imageToBase64';

  let name: string;
  let description: string;
  let breed: string;
  let dob: string;
  // let image: File;
  let errorMessage = '';


  async function registerPig(e: MouseEvent) {
    // Make sure we don't submit the form with HTML. We want to manually submit it
    e.preventDefault();

    const imageEl = document.querySelector('#image') as HTMLInputElement;
    const imageString = imageEl.files.length > 0
      ? await imageToBase64(imageEl.files[0])
      : '';

    console.log(`Pig added ${name} ${description} ${breed} ${dob} ${$page.params.id}`);
    const res = await fetch(
      '/pigs/addPig',
      {
	method: 'POST',
	body: JSON.stringify({
	  name,
	  description,
	  breed,
	  dob: new Date(dob),
	  farmId: $page.params.id,
	  image: imageString,
	}),
      },
    );

    // console.log(res);


    if (res.ok) {
      const body = await res.json();
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
	<title>Register Pig</title>
</svelte:head>

<h1>Add New Pig</h1>

<section>
	<form>
		{#if errorMessage.length > 0}
		<div class="alert alert-danger py-2" role="alert">
			{errorMessage}
		</div>
		{/if}
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
		<div class="form-group">
			<label for="image">Image</label>
			<input type="file" class="form-control" name="image" id="image"/><br>
		</div>
		<button type="submit" class="btn btn-primary" on:click="{registerPig}">Add Pig to Farm</button>
	</form>
</section>
