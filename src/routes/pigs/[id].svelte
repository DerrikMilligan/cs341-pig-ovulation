<script context="module">
	export async function load({ page, fetch }) {
		const _id = page.params.id;

		const props = {};

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

			props.pig = body.pig;
		}

		const res2 = await fetch('/pigs/getSnapshots', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
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
	import { onMount } from 'svelte';

	// import Carousel from 'svelte-carousel';
	import type { Pig } from '$lib/types';
	import type { PigSnapshot } from '$lib/types';

	export let pig: Pig;
	export let snapshots: PigSnapshot[] = [];
	export let today = Date.now();

	console.log(typeof snapshots[0].timestamp);

	// console.log(today);
</script>

<svelte:head>
	<title>{pig.name}</title>
</svelte:head>

<div class="d-flex justify-content-center">
	<img class="rounded" src="{pig.img}" alt={pig.name} style="max-height: 400px; object-fit: contain;" />
</div>
<h1>{pig.name}</h1>
<p>Dob:{pig.birthDate}</p>
<p>Age: 12 months</p>
<p>Presumed pregnant: Yes</p>
<p>Date of last observed swelling:</p>

<div id="carouselExampleControls" class="carousel slide m-4" data-bs-ride="carousel">
  <div class="carousel-inner">
		{#each snapshots as snapshot, index}
    <div class="carousel-item" class:active="{index === 0}">
			<img class="d-block w-100" style="object-fit: contain; max-height: 400px" src={snapshot.img} />
			<div class="carousel-caption d-none d-md-block">
				<h3>{ new Date(snapshot.timestamp).toLocaleDateString() }</h3>
				<p>{ snapshot.notes }</p>
				<p><a href="/">update notes</a></p>
			</div>
    </div>
		{/each}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addSnapshot">
	Launch demo modal
</button>

<!-- Modal -->
<div
	class="modal fade"
	id="addSnapshot"
	tabindex="-1"
	role="dialog"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">...</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Save changes</button>
			</div>
		</div>
	</div>
</div>
