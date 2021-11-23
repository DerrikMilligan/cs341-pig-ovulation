<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/farms/getfarms');
    if (res.ok) {
      const body = await res.json();
      return {
        props: { farms: body.farms },
      };
    }
  };
</script>

<script lang="ts">
  import type { Farm } from '$lib/types';

export let farms: Farm[];
</script>

<svelte:head>
  <title>My Farms</title>
</svelte:head>

<h1 class="mx-auto">My Farms</h1>

<ul class="list-unstyled mx-auto w-75">
  {#if (!farms.length)}
    <p class="p-5">No farms to display</p>
    {:else}
    {#each farms as farm (farm.uid)}
      <li class="p-1"><a href='farms/{farm.uid}' class="text-decoration-none fs-3">{farm.name}</a></li>
    {/each}
  {/if}
</ul>

<a href='/farms/new' class='btn btn-primary'>Add New Farm</a>

<style>

</style>
