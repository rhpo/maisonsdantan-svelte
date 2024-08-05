<script>
  import Container from "$lib/Components/Container.svelte";
</script>

<main>
  <Container>
    <div class="hero">
      <div class="info">
        <h1 data-aos="fade-right" data-aos-duration="2500">
          Le <span class="selection glow">papier peint</span> panoramique...
          <br />L'art du paysage
        </h1>
        <p
          class="subtext"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="2500"
        >
          Découvrez nos collections
        </p>
      </div>
    </div>
  </Container>
</main>

<style>
  .selection {
    color: palegreen;
    /* glow green */
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
    }
    100% {
      fill: var(--text);
      stroke-dashoffset: 0;
      stroke-width: 0;
    }
  }

  main {
    width: 100%;
    height: 100%;

    background-image: url($lib/assets/back.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  .hero {
    height: calc(100vh);

    display: flex;
    justify-content: right;
    align-items: center;

    padding-top: var(--nav-height);

    transition: all var(--animation-duration) ease;
  }

  @media (max-width: 620px) {
    .hero {
      background-position: center;
    }
  }

  .info {
    text-align: right;
    color: #ffffff;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .info h1 {
    font-size: 4rem;
    font-family: var(--primary);

    letter-spacing: 0.35rem;

    max-width: 35rem;
  }

  .subtext {
    font-size: 2rem;
    font-family: var(--third);
    font-weight: 500;
  }

  @media screen and (max-width: 820px) {
    .hero {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .info {
      text-align: center;
    }

    .info h1 {
      font-size: 2rem !important;
    }

    .subtext {
      font-size: 1rem !important;
    }
  }
</style>
