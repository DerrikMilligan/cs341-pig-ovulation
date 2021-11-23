<script lang="ts">
  import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let name: string;
	let description: string;
	let breed: string;
	let dob: Date;
	let image: File;
	let errorMessage = '';

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

	async function registerPig(e) {
    e.preventDefault();

    const imageEl = document.querySelector('#image');
    const imageString = await toBase64(imageEl.files[0])

		console.log(`Pig added ${name} ${description} ${breed} ${dob} ${$page.params.id}`);
		const res = await fetch(
			'/pigs/addPig',
			{
				method: 'POST',
				body: JSON.stringify({
					name,
					description,
					breed,
					dob,
          farmId: $page.params.id,
          image: imageString,
				}),
			},
		);

    console.log(res);

		if (res.ok) {
			const body = await res.json();
      console.log(body);

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

<section>
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
		<div class="form-group">
			<label for="image">Image</label>
			<input bind:value={image} type="file" class="form-control" name="image" id="image"/><br>
		</div>
		<button type="submit" class="btn btn-primary" on:click="{registerPig}">Add Pig to Farm</button>
	</form>
</section>
