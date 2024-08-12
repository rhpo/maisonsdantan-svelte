<script>
  import { faCrop, faCropAlt } from "@fortawesome/free-solid-svg-icons";
  import { onDestroy, onMount } from "svelte";
  import Fa from "svelte-fa";
  import { fade } from "svelte/transition";

  export let src;
  export let i;

  export let interval = 5000;
  export let adapt = false;

  export let cropMessage = "Cliquer l'image pour recadrer";
  export let onClick = () => {};
  export let crop;
  export let dimensions = {
    width: 0,
    height: 0,
  };
  /*
    {
    x: 0,
    y: 0,
    aspectRatio: 1,
  };
  */

  let I;
  onMount(() => {
    if (Array.isArray(src) && typeof i === "undefined") {
      i = 0;

      I = setInterval(() => {
        i = i === src.length - 1 ? 0 : i + 1;
      }, interval);
    }
  });

  onDestroy(() => {
    if (I) clearInterval(I);

    I = null;
  });

  let cropFrame;
  let frame;
  function defined(x) {
    return typeof x !== "undefined";
  }

  $: top =
    defined(cropFrame) && defined(crop.x) && defined(crop.y)
      ? cropFrame.offsetHeight * crop.y
      : dimensions.height / 2;
  $: left =
    defined(cropFrame) && defined(crop.x) && defined(crop.y)
      ? cropFrame.offsetWidth * crop.x
      : 0;
  $: aspectRatio = crop?.aspectRatio || 1;
</script>

<div class="main" class:adapt on:click={onClick}>
  {#if typeof crop !== "undefined"}
    <div class="hover-screen">
      <Fa icon={faCropAlt} />
      <h2>
        {cropMessage}
      </h2>
    </div>

    <p class="crop-message">
      <Fa icon={faCropAlt} />
      &nbsp;{cropMessage}
    </p>

    <div class="cropping" bind:this={cropFrame}>
      <div class="holder">
        <div
          class="frame"
          bind:this={frame}
          style={`top: ${
            !isNaN(top)
              ? top
              : cropFrame && frame
                ? cropFrame.offsetHeight / 2 - frame.offsetHeight / 2
                : 0
          }px; left: ${
            !isNaN(left)
              ? left
              : cropFrame && frame
                ? cropFrame.offsetWidth / 2 - frame.offsetWidth / 2
                : 0
          }px; 

          ${
            dimensions.width && dimensions.height
              ? `aspect-ratio: ${dimensions.width} / ${dimensions.height};`
              : "width: 100%; height: 100%;"
          }
          
          ${dimensions.width > dimensions.height ? "width" : "height"}: 100%;`}
        >
          {#if dimensions.width}
            <p class="width">
              {dimensions.width}cm
            </p>
          {/if}

          {#if dimensions.height}
            <p class="height">
              {dimensions.height}cm
            </p>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  {#if Array.isArray(src)}
    {#each src as src, n}
      {#if n == i}
        <img {src} alt="ERR!" {...$$restProps} transition:fade />
      {/if}
    {/each}
  {:else}
    <img {src} alt="ERR!" {...$$restProps} />
  {/if}

  {#if adapt}
    <img
      class="holder"
      src={Array.isArray(src) ? src[i] : src}
      alt="ERR!"
      {...$$restProps}
    />
  {/if}
</div>

<style>
  :root {
    --dim-margin: 1rem;
  }

  .hover-screen {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: white;
    text-align: center;
    font-size: 5rem;

    z-index: 3;
    opacity: 0;
    transition: all var(--animation-duration);

    cursor: var(--cursor-pointer);
  }

  .cropping {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    text-align: center;
    font-size: 5rem;

    z-index: 2;
    transition: all var(--animation-duration);

    cursor: var(--cursor-pointer);
  }

  .cropping .frame {
    position: absolute;
    box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
  }

  .frame .width,
  .frame .height {
    position: absolute;

    padding: 0.25rem 0.5rem;
    margin: var(--dim-margin);
    font-size: 1rem;

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;

    color: white;
  }

  .frame .width {
    top: 0;
    left: 50%;
    margin-top: 0;
    transform: translateX(calc(-50% - var(--dim-margin)));
  }

  .frame .height {
    top: 50%;
    left: 0;
    transform: translateY(calc(-50% - var(--dim-margin)));
  }

  .hover-screen h2 {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;

    padding: 1rem;
    font-size: 1rem;

    background-color: rgba(0, 0, 0, 0.5);
  }

  .crop-message {
    display: none;

    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);

    padding: 0.5rem 1rem;
    font-size: min(1rem, 2.5vw);

    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.856);

    text-wrap: none;
    white-space: nowrap;

    color: black;
    z-index: 2;
  }

  .main:hover .hover-screen {
    opacity: 1;
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
