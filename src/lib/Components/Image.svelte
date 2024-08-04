<script>
  import { fade } from "svelte/transition";

  export let src;
  export let n;
</script>

<div>
  {#if Array.isArray(src)}
    {#each src as src, i}
      {#if i == n}
        <img {src} alt="ERR!" {...$$restProps} transition:fade />
      {/if}
    {/each}
  {:else}
    <img {src} alt="ERR!" {...$$restProps} />
  {/if}
</div>

<style>
  div {
    width: fit-content;
    height: fit-content;
    position: relative;
    box-shadow: 9px 10px 5px 0px rgba(0, 0, 0, 0.2);

    width: 100%;
    aspect-ratio: 3 / 4;
  }

  div img {
    transition: all var(--animation-duration);

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 787px) {
    div {
      max-width: 100%;
    }
  }
</style>
