<script lang="ts">
	import { onMount } from "svelte";
	import Two from "$lib/pages/two.svelte";
	import Hero from "$lib/pages/hero.svelte";
	import Three from "$lib/pages/three.svelte";

	import aos from "aos";

	onMount(() => {
	  aos.init();
	});
  </script>

  <Hero />

  <Two />
  <Three />

  <img class="hero-last" src="../../../static/images/hero.jpg" alt="" />

  <style>
	.hero-last {
	  width: 100%;
	  transform: translateY(6px);
	}

	@media screen and (max-width: 680px) {
	  .hero-last {
		min-height: 80vh;
		object-fit: cover;
	  }
	}
  </style>
