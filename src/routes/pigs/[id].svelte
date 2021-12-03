<!-- <script>
    import { onMount } from 'svelte';
  
    let Carousel; // for saving Carousel component class
    let carousel; // for calling methods of the carousel instance
    onMount(async () => {
      const module = await import('svelte-carousel');
      Carousel = module.default;
    });
  
    const handleNextClick = () => {
      carousel.goToNext()
    }
  </script> -->
  
  <script context="module">
	export async function load({ page, fetch }) {
		const _id = page.params.id;
		const res = await fetch('/pigs/getpig', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pigId: _id,
      }, null, 2),
    });
		if (res.ok) {
      const body = await res.json();

    //   console.log(body);

      return {
        props: { pig: body.pig, },
      };
    }
	}
</script>

<img class="rounded" src="/spotFace_25.jpg" alt="">
<h1>Spot</h1>
<p>Age: 12 months</p>
<p>Presumed pregnant: Yes</p>
<p>Date of last observed swelling:</p>
<div class="pigButtContainer">
    <div >
        <img class="pigButtImg" src="/PigButts/pigNoSwelling_25.jpg" alt="">
    <p>11/21/21</p>
    <form action="/action_page.php">
        <p>Observed swelling?:</p>
        <input type="radio" id="html" name="swelling" value=1>
        <label for="html">Yes</label><br>
        <input type="radio" id="css" name="swelling" value=0>
        <label for="no">No</label><br>
      

       
    </div>
    <div>
        <img class="pigButtImg" src="/PigButts/pigSomeSwelling.jpg" alt="">
        <p>11/22/21</p>
    </div>
    <div>
        <img class="pigButtImg" src="/PigButts/pigSwelling_25.jpg" alt="">
        <p>11/23/21</p>
    </div>
    
</div>


  <!-- <svelte:component
    this={Carousel}
    bind:this={carousel}
  >
    <div><p></p></div>
    <div>2</div>
    <div>3</div>
  </svelte:component>
  
  <button on:click={handleNextClick}>Next</button> -->