<script>
  import Hero from "$lib/Pages/Home/Hero.svelte";
  import Frames from "$lib/Pages/Home/Frames.svelte";
  import AvailableModels from "$lib/Pages/Home/AvailableModels.svelte";
</script>

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
