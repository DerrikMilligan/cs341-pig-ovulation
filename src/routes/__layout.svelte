<script context="module">
	import { userNeedsToLogin } from '$lib/guards';

	export async function load({ page, session }) {
  	const loggedIn = session !== null && session.user !== null && session.user !== undefined;

		if (await userNeedsToLogin({ page, session })) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {
			props: {
				loggedIn,
			}
		};
	}
</script>


<script lang="ts">
	// Get the Header component so we can display our nav
	import Navigation from '$lib/components/Navigation.svelte';

	// Import all the bootstrap styles
	// import 'bootstrap/dist/css/bootstrap.min.css';
	export let loggedIn: boolean;

	// Import our global styles
	import '../app.css';
</script>


<Navigation {loggedIn}/>

<main class="container">
	<slot />
</main>


<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
		background-color: #FAF9F6a6;
	}
</style>

