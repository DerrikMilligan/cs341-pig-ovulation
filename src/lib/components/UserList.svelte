<script lang='ts'>
	import type { User } from '$lib/types';
	export let users: User[];
	export let email;
</script>

<ul>
	{#if (!users.length)}
		<p class='p-5'>No users to display</p>
	{:else}
		{#each users as user}
			<li>{ user.email }</li>
			<button class='btn btn-danger' href='/farms/removeFarmUser'>Remove User</button>
		{/each}
	{/if}
	<input type='email' bind:value={email}>
	<button class='btn btn-primary' href='/farms/addFarmUser/{email}'>Add Users</button>
</ul>
