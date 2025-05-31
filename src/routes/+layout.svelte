<script>
  import "$lib/global.css?r=20392032";
  import "tippy.js/dist/tippy.css";
  import "tippy.js/animations/perspective.css";

  // META IMAGES
  import icon from "$lib/assets/icon.png";

  import NavBar from "$lib/Pages/Layout/NavBar.svelte";

  import { onMount } from "svelte";
  import {
    cart,
    darkMode,
    endpoint,
    informations,
    menuOpen,
    notification,
  } from "$lib/store.js";

  import AOS from "aos";
  import Footer from "$lib/Pages/Layout/Footer.svelte";
  import { MetaTags } from "svelte-meta-tags";
  import { navigating } from "$app/stores";
  import { fade } from "svelte/transition";

  onMount(() => {
    function css(name, value) {
      document.documentElement.style.setProperty("--" + name, value);
    }

    notification.subscribe((value) => {
      css("n-color", value.colors.text);
      css("n-background", value.colors.background);
    });

    darkMode.subscribe((value) => {
      document.documentElement.classList.toggle("dark", value);
    });

    navigating.subscribe((value) => {
      menuOpen.set(false);
    });

    AOS.init();

    document.addEventListener("scroll", () => {
      document.querySelectorAll("body [data-listener]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("shown");
        } else {
          el.classList.remove("shown");
        }
      });
    });
  });
</script>

<svelte:head>
  <link rel="icon" type="image/png" href={icon} />
</svelte:head>

{#if $navigating}
  <div class="loading" transition:fade>
    <div class="spinner">M</div>
  </div>
{/if}

{#if $endpoint}
  <NavBar />

  <slot />
  <Footer />
{/if}

<style>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--n-background);
    color: var(--n-color);

    z-index: 99999999999999;
  }

  .spinner {
    font-size: 5rem;
    font-family: var(--f-primary);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
