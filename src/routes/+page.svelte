<script>
  import Hero from "$lib/Pages/Home/Hero.svelte";
  import Frames from "$lib/Pages/Home/Frames.svelte";
  import AvailableModels from "$lib/Pages/Home/AvailableModels.svelte";

  import { informations } from "$lib/store";
  import { MetaTags } from "svelte-meta-tags";
  import { navigating } from "$app/stores";
  import { fade } from "svelte/transition";
</script>

<MetaTags
  title={$informations.title}
  description={$informations.description}
  canonical={$informations.url}
  titleTemplate="%s"
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

<main>
  <Hero />
  <section>
    <AvailableModels />
    <Frames />
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow-x: hidden;

    background-color: var(--n-color);
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--margin);

    padding: var(--margin);
    padding-left: 0;
    padding-right: 0;
  }
</style>
