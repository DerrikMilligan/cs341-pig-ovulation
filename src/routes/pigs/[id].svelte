<!-- <script>
    import { onMount } from 'svelte';
  
    let Carousel; // for saving Carousel component class
    let carousel; // for calling methods of the carousel instance
    onMount(async () => {
      const module = await import('svelte-carousel');
      Carousel = module.default;
    });
  
    const handleNextClick = () => {
      carousel.goToNext()
    }
  </script> -->
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
	import { onMount } from 'svelte';

	let Carousel; // for saving Carousel component class
	let carousel; // for calling methods of the carousel instance
	onMount(async () => {
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});

	const handleNextClick = () => {
		carousel.goToNext();
	};

	// import { Pig } from '$lib/models';********This is what caused the build problem *********

	// import Carousel from 'svelte-carousel';
	import type { Pig } from '$lib/types';
	import type { PigSnapshot } from '$lib/types';

	export let pig: Pig[];
	export let today = Date.now();

	// console.log(today);
</script>

<svelte:head>
	<title>{pig.name}</title>
</svelte:head>

<img class="rounded" src="/spotFace_25.jpg" alt={pig.name} />
<h1>{pig.name}</h1>
<p>Dob:{pig.birthDate}</p>
<p>Age: 12 months</p>
<p>Presumed pregnant: Yes</p>
<p>Date of last observed swelling:</p>
<div class="pigButtContainer">
	<div class="card">
		<img class="pigButtImg" src="/PigButts/pigNoSwelling_25.jpg" alt="" />
		<p>11/21/21</p>

		<form>
			<div class="form-check form-check-inline">
				<input
					class="form-check-input"
					type="radio"
					name="swelling"
					id="swellingNo"
					value="0"
					checked
				/>
				<label class="form-check-label" for="swellingNo"> No </label>
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" name="swelling" id="swellingYes" value="1" />
				<label class="form-check-label" for="exampleRadios2"> Yes </label>
			</div>
			<div class="form-check form-check-inline">
				<input class="form-check-input" type="radio" name="swelling" id="Some" value="3" />
				<label class="form-check-label" for="exampleRadios3"> Not Sure/Some </label>
			</div>
			<div class="form-check">
				<textarea name="notes" id="notes" cols="30" rows="3" />

				<label for="text">Notes</label>
			</div>
		</form>
	</div>
	<!-- hard coded pig snapshot for styling purposes ---------------------------------------- -->
	<div class="card">
		<form>
			<img class="pigButtImg" src="/PigButts/pigSomeSwelling.jpg" alt="" />
			<p>11/22/21</p>
			<div class="form-check">
				<input class="form-check-input" type="radio" name="swelling" id="swellingNo" value="0" />
				<label class="form-check-label" for="swellingNo"> No </label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="radio" name="swelling" id="swellingYes" value="1" />
				<label class="form-check-label" for="exampleRadios2"> Yes </label>
			</div>
			<div class="form-check disabled">
				<input
					class="form-check-input"
					type="radio"
					name="swelling"
					id="swellingSome"
					value="3"
					checked
				/>
				<label class="form-check-label" for="exampleRadios3"> Not Sure/Some </label>
			</div>
		</form>
	</div>
	<div class="card">
		<form>
			<img class="pigButtImg" src="/PigButts/pigSwelling_25.jpg" alt="" />
			<p>11/23/21</p>
			<div class="form-check">
				<input class="form-check-input" type="radio" name="swelling" id="swellingNo" value="0" />
				<label class="form-check-label" for="swellingNo"> No </label>
			</div>
			<div class="form-check">
				<input
					class="form-check-input"
					type="radio"
					name="swelling"
					id="swellingYes"
					value="1"
					checked
				/>
				<label class="form-check-label" for="exampleRadios2"> Yes </label>
			</div>
			<div class="form-check ">
				<input class="form-check-input" type="radio" name="swelling" id="swellingSome" value="3" />
				<label class="form-check-label" for="exampleRadios3"> Not Sure/Some </label>
			</div>
		</form>
	</div>
</div>

<!-- Bootstrap carousel -->

<div class="row">
	<div class="col" />
	<div class="col-sm-12 col-md-6">
		<div id="mainCarousel" class="carousel slide" data-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img class="d-block w-100" src="/PigButts/pigNoSwelling_25.jpg" alt="First slide" />
					<div class="carousel-caption d-none d-md-block">
						<h3>12/6/21</h3>
						<p>18 days since last swelling</p>
						<p><a href="/">update notes</a></p>
					</div>
				</div>
				<div class="carousel-item">
					<img class="d-block w-100" src="/PigButts/pigNoSwelling_25.jpg" alt="Second slide" />
					<div class="carousel-caption d-none d-md-block">
						<h3>Skate for life!</h3>
						<p>Show me some tricks</p>
					</div>
				</div>
				<div class="carousel-item">
					<img class="d-block w-100" src={pig.img} alt="Third slide" />
				</div>
			</div>
			<a class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true" />
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true" />
				<span class="sr-only">Next</span>
			</a>
		</div>
	</div>
	<div class="col" />
</div>
<hr />

<!-- attempted svelte carousel ----------------------------------------------------------------->

<svelte:component this={Carousel} bind:this={carousel}>
	<div><img src={pig.img} alt="pig " /></div>
	<div><p>Hello</p></div>
	<div>3</div>
</svelte:component>

<button on:click={handleNextClick}>Next</button>

<!-- attempted bootstrap Modal -----------------------------------------------------------------------  -->

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
