<script lang='ts'>
	import type { User } from '$lib/types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	// import { User  as userModel } from '$lib/models'

	export let users: User[];
	export let email;
	export let farmId;

	export async function addFarmUser(farm, email) {
		const res = await fetch('/farms/addFarmUser', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				farmId: farm,
				email: email
			}, null, 2)
		});

		if (res.ok) {
			goto(`/farms/${farm}`);
			const body = await res.json();
			this.users = body.users;
		}

		return users;

	}

	function removeFarmUser(farm, id) {
		console.log('Removing user _id ', id, ' to ', farm);
	}

</script>

<section>
	<h3>Users</h3>
	<div class='row'>
		<ul>
			{#if (!users.length)}
				<p class='p-5'>No users to display</p>
			{:else}
				{#each users as user}
					<div class='row g-3 align-items-center'>
						<div class='col-auto'>
							<button class='btn btn-sm remove-user' on:click={removeFarmUser(farmId, user._id)}>X
							</button>
						</div>
						<div class='col-auto'>
							<li style='padding-right: 1em;'>{ user.email }</li>
						</div>
					</div>
				{/each}
			{/if}
		</ul>
	</div>
	<div class='row'>
		<div class='row g-3 align-items-center'>
			<div class='col-auto'>
				<input type='email' bind:value={email} class='form-control'>
			</div>
			<div class='col-auto'>
				<button class='btn btn-primary btn-sm' on:click={() => addFarmUser(farmId, email)}>Add User by Email</button>
			</div>
		</div>
	</div>
</section>


<style>
    section {
        display: flex;
        align-items: center;
        flex-direction: column;
        max-width: 60%;
        margin: auto;
    }

    ul {
        list-style: none;
    }

		.remove-user:hover {
				color: red;
		}
</style>
