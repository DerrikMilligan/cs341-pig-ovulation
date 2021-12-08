<script context='module' lang='ts'>
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

		let props = {
			pigs: [],
			users: [],
			farm: {}
		};


		if (res.ok) {
			const body = await res.json();

			props.pigs = body.pigs;
		}

		const userRes = await fetch('/farms/getfarm', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				farmId: _id
			}, null, 2)
		});

		if (userRes.ok) {
			const body = await userRes.json();
			console.log(body);

			props.users = body.farms.users;
			props.farm = body.farms
		}

		return { props };
	};
</script>

<script lang='ts'>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Pig } from '$lib/types';
	import type { User } from '$lib/types';
	import type { Farm } from '$lib/types';
	import PigList from '$lib/components/PigList.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import UserList from '$lib/components/UserList.svelte';

	export let pigs: Pig[];
	let show = false;
	let pigId;
	let errorMessage = '';
	export let users: User[];
	export let farm: Farm;

	function showModal(event) {
		console.log(`delete modal for pig: ${event.detail.pigId}`);
		pigId = event.detail.pigId;
		show = true;
	}

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

		show = false;

		if (res.ok) {
			const body = await res.json();
			console.log(body);
			pigs = pigs.filter((pig) => pig._id !== pigId);
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

<h1 class='mx-auto my-3'>{farm.name}</h1>

<a class='btn btn-primary btn-sm p-1 mx-auto my-3' href='/pigs/new/{$page.params.id}'>Add New Pig</a>

<PigList {pigs} on:deleteClicked={showModal}/>


{#if show}
	<Modal>
		<h1 slot="header">Deleting Pig</h1>
		<div slot="content" class="pt-4">
			<p>Are you sure you would like to delete your pig?</p>
			<button class="btn btn-primary btn-sm p-1" on:click={(e) => {e.preventDefault(); show = false;}}>Cancel</button>
			<button class="btn btn-primary btn-sm p-1" on:click={() => deletePig(pigId)}>Delete Pig</button>
		</div>
	</Modal>
{/if}

<UserList {users} farmId={$page.params.id}/>

<style>
    a {
        width: 120px;
    }
</style>
