<script>
  import Maisons from "./Second.svelte";
  import Dantan from "./First.svelte";

  export let animate = true;
</script>

<a class="logo" href="/">
  <div class="wrapper" class:animate>
    <div class="part">
      <Maisons />
    </div>

    <div class="part">
      <Dantan />
    </div>
  </div>
</a>

<style>
  *,
  :global(.part *) {
    transition: all var(--animation-duration) ease;
  }

  .logo {
    cursor: var(--cursor-pointer);
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
  }

  :global(.logo.shrunk) {
    scale: var(--nav-scalar);
  }

  .wrapper {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--logo-gap);
  }

  .part {
    width: 100%;
    height: calc(50% - var(--logo-gap) / 2);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo:hover {
    transform: scale(1.05);
  }

  :global(.animate .part path) {
    stroke-width: var(--stroke-w);
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: transparent;
    stroke: #3e3e3e;
    animation: logo-animation 6s cubic-bezier(0.34, 0, 0.62, 0.15) both;
  }

  :global(.logo:hover *) {
    stroke-width: var(--stroke-w) !important;
    fill: transparent !important;
  }

  :global(.part svg) {
    width: 100%;
    height: 100%;
  }

  @keyframes logo-animation {
    0% {
      stroke-opacity: 0.6;
    }
    15% {
      fill: transparent;
    }
    55% {
      stroke-dashoffset: 0;
      stroke-opacity: 1;
      fill: var(--logo-color);
    }
    100% {
      fill: var(--logo-color);
      stroke-dashoffset: 0;
      stroke-width: 0;
    }
  }
</style>
