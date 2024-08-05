<script>
  import "$lib/global.css?r=20392032";
  import "tippy.js/dist/tippy.css";
  import "tippy.js/animations/perspective.css";

  // META IMAGES
  import icon from "$lib/assets/icon.png";

  import NavBar from "$lib/Pages/Layout/NavBar.svelte";

  import { onMount } from "svelte";
  import { informations, notification } from "$lib/store.js";

  import AOS from "aos";
  import Footer from "$lib/Pages/Layout/Footer.svelte";
  import { MetaTags } from "svelte-meta-tags";

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

<svelte:head>
  <link rel="icon" type="image/png" href={icon} />
</svelte:head>

<MetaTags
  title={$informations.title}
  description={$informations.description}
  canonical={$informations.url}
  titleTemplate="%s | {$informations.name}"
  openGraph={{
    title: $informations.title,
    description: $informations.description,
    url: $informations.url,
    siteName: $informations.name,
    images: [
      {
        url: $informations.image,
        width: 1200,
        height: 630,
        alt: $informations.title,
      },
    ],
  }}
  twitter={{
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
    title: $informations.title,
    description: $informations.description,
    image: $informations.image,
    imageAlt: $informations.name,
  }}
  additionalRobotsProps={{
    "data-n-head": "true",
    "data-hid": "robots",
    content: "noindex, nofollow",
  }}
/>

<NavBar />
<slot />
<Footer />
