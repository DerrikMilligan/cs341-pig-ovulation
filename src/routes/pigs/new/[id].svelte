<script lang="ts">
  import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let name: string;
	let description: string;
	let breed: string;
	let dob: Date;
	let errorMessage = '';

	async function registerPig(e) {
    e.preventDefault();

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
				}),
			},
		);

    console.log(res);

		if (res.ok) {
			const body = await res.json();
      console.log(body);

			// goto('/');
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
		<button type="submit" class="btn btn-primary" on:click="{registerPig}">Add Pig to Farm</button>
	</form>
</section>
