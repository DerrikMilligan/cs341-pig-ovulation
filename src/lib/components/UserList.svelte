<script lang='ts'>
	import type { User } from '$lib/types';

	export let users: User[];
	export let email;
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
							<li style='padding-right: 1em;'>{ user.email }</li>
						</div>
						<div class='col-auto'>
							<button class='btn btn-danger btn-sm' href='/farms/removeFarmUser'>Remove</button>
						</div>
					</div>
				{/each}
			{/if}
		</ul>
	</div>
	<div class='row'>
		<form>
			<div class='row g-3 align-items-center'>
				<div class='col-auto'>
					<input type='email' bind:value={email} class='form-control'>
				</div>
				<div class='col-auto'>
					<button class='btn btn-primary' href='/farms/addFarmUser/{email}'>Add User</button>
				</div>

			</div>
		</form>
	</div>
</section>


<style>
    section {
				display: flex;
        align-items: center;
				flex-direction: column;
    }

    ul {
        list-style: none;
    }
</style>
