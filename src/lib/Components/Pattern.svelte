<script>
  import { onMount, onDestroy } from "svelte";
  import Fa from "svelte-fa";
  import { fade } from "svelte/transition";
  import Image from "./Image.svelte";

  export let src;
  export let i;

  export let interval = 5000;
  export let repeat = 1;

  export let aspectRatio = 1;

  let I;
  onMount(() => {
    if (Array.isArray(src) && typeof i === "undefined") {
      i = 0;

      I = setInterval(() => {
        i = i === src.length - 1 ? 0 : i + 1;
      }, interval);
    }
  });

  onDestroy(() => I && clearInterval(I));

  let cropFrame;
  let frame;
</script>

<div class="main">
  <div class="holder">
    <div class="frame" style={aspectRatio > 1 ? "width: 100%" : "height: 100%"}>
      {#each Array.from({ length: repeat }) as _, n}
        <div class="image">
          <Image {src} {i} />
        </div>
      {/each}
    </div>
  </div>

  <!-- background -->
  {#if Array.isArray(src)}
    {#each src as src, n}
      {#if n == i}
        <img class="blur" {src} alt="ERR!" {...$$restProps} transition:fade />
      {/if}
    {/each}
  {:else}
    <img {src} class="blur" alt="ERR!" {...$$restProps} />
  {/if}

  <img
    class="holder"
    src={Array.isArray(src) ? src[i] : src}
    alt="ERR!"
    {...$$restProps}
  />
</div>

<style>
  :root {
    --dim-margin: 1rem;
  }

  .blur {
    filter: blur(5px);
  }

  .main {
    position: relative;

    width: 100%;
    height: 100%;

    overflow: hidden;
  }

  .main img:not(.holder) {
    transition: all var(--animation-duration);

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .holder {
    z-index: -1;
    width: 100%;
  }

  .main.adapt {
    width: 100%;
    height: fit-content;
  }

  .main.adapt img:not(.holder) {
    object-fit: unset;
    height: fit-content !important;
  }

  @media screen and (max-width: 787px) {
    div {
      max-width: 100%;
    }

    .hover-screen {
      display: none !important;
    }

    .crop-message {
      display: block;
    }
  }
</style>
