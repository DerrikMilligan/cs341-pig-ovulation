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
			farm: {},
		};

		if (res.ok) {
			const body = await res.json();

			props.pigs = body.pigs;
		}

		const farmRes = await fetch('/farms/getfarm', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				farmId: _id
			}, null, 2)
		});

		if (farmRes.ok) {
			const body = await farmRes.json();

			props.farm = body.farms;
			props.users = body.farms.users;
		}

		return { props };
	};
</script>

<script lang='ts'>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Farm, Pig, User } from '$lib/types';
	import PigList from '$lib/components/PigList.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import UserList from '$lib/components/UserList.svelte';

	export let pigs: Pig[];
	let show = false;
	export let farm: Farm;
	let showDeleteFarm = false;
	let pigId;
	let errorMessage = '';
	export let users: User[];

	function showModal(event) {
		pigId = event.detail.pigId;
		show = true;
	}

	async function deleteFarm() {
		const res = await fetch(
			'/farms/deleteFarm',
			{
				method: 'POST',
				body: JSON.stringify({
					_id: farm._id
				}),
			},
		);

		showDeleteFarm = false;

		if (res.ok) {
			const body = await res.json();

			goto('/farms');
		} else {
			const body = await res.json();
			errorMessage = body.message;
		}
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

		show = false;

		if (res.ok) {
			const body = await res.json();
			pigs = pigs.filter((pig) => pig._id !== pigId);
		} else {
			const body = await res.json();
			errorMessage = body.message;
		}
	}
</script>

<svelte:head>
	<title>{ farm?.name || 'Generic Mills' }</title>
</svelte:head>

<h1 class="mx-auto my-3">{ farm?.name || 'Generic Mills' }</h1>

<div class="mx-auto my-3">
	<a class='btn btn-primary btn-sm p-1' href="/pigs/new/{$page.params.id}">Add New Pig</a>
	<button class="btn btn-primary btn-sm p-1" on:click|preventDefault={() => showDeleteFarm = true}>Remove Farm</button>
</div>

<PigList {pigs} on:deleteClicked={showModal}/>

{#if showDeleteFarm}
	<Modal>
		<h1 slot="header">Deleting Farm</h1>
		<div slot="content" class="pt-4">
			<p>Are you sure you would like to delete your farm?</p>
			<button class="btn btn-primary btn-sm p-1" on:click|preventDefault={() => showDeleteFarm = false}>Cancel</button>
			<button class="btn btn-primary btn-sm p-1" on:click={() => deleteFarm()}>Delete Farm</button>
		</div>
	</Modal>
{/if}

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
