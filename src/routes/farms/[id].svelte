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
				farmId: _id
			}, null, 2)
		});

		let props = {
			pigs: [],
			users: [],
		};


		if (res.ok) {
			const body = await res.json();

			console.log(body);

			props.pigs = body.pigs;
		}

		const userRes = await fetch('/farms/getFarm', {
			method: 'post',
			headers: {
				body: JSON.stringify({
					farmId: _id
				}, null, 2)
			}
		});

		if (userRes.ok) {
			const body = await res.json();

			console.log("FarmUser Request: ", body);

			props.users = body.farms.users;
		}

		return { props };
	};
</script>

<script lang='ts'>
	import { page } from '$app/stores';
	import type { Pig } from '$lib/types';
	import type { User } from '$lib/types';
	import PigList from '$lib/components/PigList.svelte';
	import UserList from '$lib/components/UserList.svelte';

	export let pigs: Pig[];
	export let users: User[];
</script>

<svelte:head>
	<title>My Farm</title>
</svelte:head>

<h1 class='mx-auto my-3'>My Farm</h1>

<a class='btn btn-primary btn-sm p-1 mx-auto my-3' href='/pigs/new/{$page.params.id}'>Add New Pig</a>

<PigList {pigs} />

<!--<UserList {users} />-->

<style>
    a {
        width: 120px;
    }
</style>
