<script context="module">
	export async function load({ page, fetch }) {
		const _id = page.params.id;

		const props = {};

		const res = await fetch('/pigs/getpig', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				pigId: _id
			})
		});
		if (res.ok) {
			const body = await res.json();

			props.pig = body.pig;
		}

		const res2 = await fetch('/pigs/getSnapshots', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				pigId: _id
			})
		});
		if (res2.ok) {
			const body = await res2.json();

			props.snapshots = body.snapshots;
		}

		return { props };
	}
</script>

<script lang="ts">
	// import Carousel from 'svelte-carousel';
	import type { Pig } from '$lib/types';
	import type { PigSnapshot } from '$lib/types';

	export let pig: Pig;
	export let snapshots: PigSnapshot[] = [];
	 let today =  Date.now();
	 let newtoday = new Date(today);
	 console.log(newtoday);
	 let birthDate = new Date(pig.birthDate)
	 let birthYear = birthDate.getFullYear();
	//  console.log(birthYear);
	let birthMonth = birthDate.getMonth()+1;
	let birthday = birthDate.getDate();
	let birthDateFormat = `${birthMonth}/${birthday}/${birthYear}`
	 
	 let birthTime =birthDate.getTime()
	 console.log(`birthtime is ${birthTime}`);
	 
	 console.log(pig.birthDate);
	 console.log(birthDate);
	 let months = new Date(today - birthTime).getMonth() % 12;
	 console.log(months);
	 
	 let years = new Date(today - birthTime).getFullYear()-1970;
	 console.log(years);
</script>

<svelte:head>
	<title>{pig.name}</title>
</svelte:head>

<div class="d-flex justify-content-center">
	<img
		class="rounded"
		src={pig.img}
		alt={pig.name}
		style="max-height: 400px; max-width: 100%; object-fit: contain;"
	/>
</div>
<h1 class="my-3">{pig.name}</h1>
<p>Dob:{birthDateFormat}</p>
<p>Age: {years} years, {months} months</p>

<div class="row">
	<div class="col">
		
	</div>
	<div id="carouselExampleControls" class="carousel  slide my-4" data-bs-ride="carousel">
		<div class="carousel-inner">
			{#if (!snapshots.length)}
    		<div class="text-center">No images to display</div>
  		{:else}
				{#each snapshots as snapshot, index}
					<div class="carousel-item" class:active={index === 0}>
						<img
							class="d-block w-100"
							style="object-fit: contain; max-height: 400px"
							src={snapshot.img} alt="pig snapshot"
						/>
						<div class="carousel-caption d-none d-md-block">
							<h3>{new Date(snapshot.timestamp).toLocaleDateString()}</h3>
							<p>{snapshot.notes}</p>
							
						</div>
					</div>
				{/each}
			{/if}
		</div>
		<button
			class="carousel-control-prev carousel-dark"
			type="button"
			data-bs-target="#carouselExampleControls"
			data-bs-slide="prev"
		>
			<span class="carousel-control-prev-icon " aria-hidden="true" />
			<span class="visually-hidden">Previous</span>
		</button>
		<button
			class="carousel-control-next carousel-dark"
			type="button"
			data-bs-target="#carouselExampleControls"
			data-bs-slide="next"
		>
			<span class="carousel-control-next-icon" aria-hidden="true" />
			<span class="visually-hidden">Next</span>
		</button>
	</div>
</div>
<a class="btn btn-primary btn-sm p-1 mx-auto my-3" href="/pigs/addSnapshot/{pig._id}" >Add New Snapshot </a>
