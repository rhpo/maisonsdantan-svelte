<script>
  import Links from "$lib/Components/Links.svelte";

  import { slide } from "svelte/transition";
  import { menuOpen } from "$lib/store";
  import Container from "$lib/Components/Container.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    menuOpen.subscribe((value) => {
      document.body.style.overflow = value ? "hidden" : "auto";
    });
  });
</script>

{#if $menuOpen}
  <menu
    transition:slide={{
      axis: "x",
      duration: 500,
      delay: 0,
    }}
  >
    <div class="content">
      <div class="wrapper">
        <Links mobile />
      </div>
    </div>
  </menu>
{/if}

<style>
  menu {
    transition: all var(--animation-duration) ease;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    padding: 0;
    padding-top: var(--nav-height);

    width: 100%;
    height: 100%;

    background-color: #fffffff0;

    /* shadow on the right that is widely spread */
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.5);

    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1rem;
    width: 100%;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 1rem;
  }

  .wrapper :global(.link) {
    font-size: 1.5rem;
  }
</style>
