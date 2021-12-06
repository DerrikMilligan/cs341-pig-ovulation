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
<!-- <script lang="ts">
import { Pig } from '$lib/models';

    import type { Pig } from '$lib/types';
    
    export let pig: Pig[];
    export let today = Date.now();
    
    console.log(today);
    
    </script> -->



<svelte:head>
	<title>{pig.name}</title>
</svelte:head>

<img class="rounded" src="/spotFace_25.jpg" alt="{Pig.name}" />
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
                <textarea name="notes" id="notes" cols="30" rows="3"></textarea>
               
                <label for="text">Notes</label>
            </div>

		</form>
	</div>
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
