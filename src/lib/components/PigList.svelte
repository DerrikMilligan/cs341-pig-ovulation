<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  import type { Pig } from '$lib/types';
  //import { showModal } from '$lib/routes/farms/[id].svelte';
  export let pigs: Pig[];

  function deleteClicked(e: MouseEvent, pigId: string) {
    e.preventDefault();
    dispatch('deleteClicked', { pigId });
  }
</script>

<ul class="d-flex flex-wrap justify-content-evenly ps-0">
  {#if (!pigs.length)}
    <p class="p-5">No pigs to display</p>
  {:else}
    {#each pigs as pig}
      <li class="m-2 rounded-1 card list-unstyled">
        <a class="text-dark text-decoration-none" href="/pigs/{pig._id}">
          <div class="p-3">
            <img class="rounded-1 w-100" src="{ pig.img }" alt="Photo of { pig.name }">
            <h2 class="h4 py-1">{pig.name}</h2>
            <p>{pig.description}</p>
            <a class="btn btn-primary btn-sm p-1 mx-auto my-3" href="/pigs/edit/{ pig._id }">Edit</a>
            <button class="btn btn-primary btn-sm p-1 mx-auto my-3" on:click={(e) => {deleteClicked(e, pig._id)}}>Delete</button>
          </div>
        </a>
      </li>
    {/each}
  {/if}
</ul>

<style>
  li {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    width: 250px;
  }

  li:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.26);
  }
</style>
