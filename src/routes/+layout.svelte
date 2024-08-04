<script>
  import "$lib/global.css?r=20392032";
  import "tippy.js/dist/tippy.css";
  import "tippy.js/animations/perspective.css";

  import NavBar from "$lib/Pages/Layout/NavBar.svelte";

  import { onMount } from "svelte";
  import { notification } from "$lib/store.js";

  import AOS from "aos";
  import Footer from "$lib/Pages/Layout/Footer.svelte";

  onMount(() => {
    function css(name, value) {
      document.documentElement.style.setProperty("--" + name, value);
    }

    notification.subscribe((value) => {
      css("n-color", value.colors.text);
      css("n-background", value.colors.background);
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

<NavBar />

<slot />

<Footer />
