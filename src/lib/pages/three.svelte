<script>
  import { onMount } from "svelte";

  import svelteTilt from "vanilla-tilt-svelte";

  let second;
  onMount(() => {
    (function () {
      let n = 1;
      let cSpeed = 3000;

      function animate() {
        if (n == 4) {
          n = 0;
        }
        n++;

        cSpeed += 1;

        requestAnimationFrame(animate);
      }

      animate();
    })();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        let isVisible = entry.isIntersecting;

        entry.target.classList[isVisible ? "add" : "remove"]("shown");
      });
    });

    observer.observe(second);
  });
</script>

<div class="poster">
  <div class="info">
    <h1 data-aos="fade-right" data-aos-duration="1500">
      Découvrez une autre façon de vivre...
    </h1>
    <p data-aos="fade-up" data-aos-duration="1500" data-aos-delay="750">
      Avec MAISONS D'ANTAN, Explorez une nouvelle façon de vivre avec le papier
      peint panoramique, révélant une expérience unique et captivante.
    </p>
  </div>

  <div class="second" bind:this={second}>
    <div class="all">
      <div class="row">
        <div
          class="i1"
          use:svelteTilt={{
            max: 8,
            glare: true,
          }}
        />
        <div
          class="i2"
          use:svelteTilt={{
            max: 8,
            glare: true,
          }}
        />
      </div>

      <div class="row">
        <div
          class="i3"
          use:svelteTilt={{
            max: 8,
            glare: true,
          }}
        />
        <div
          class="i4"
          use:svelteTilt={{
            max: 8,
            glare: true,
          }}
        />
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --margin: 30%;
  }

  .info p {
    font-size: 22px;
  }

  .poster {
    width: 100%;
    padding: 50px;
    padding-left: 40px;
    padding-right: 40px;

    text-align: center;
  }

  .info h1 {
    font-size: 62px;
    margin-bottom: 15px;
  }

  .info {
    margin-bottom: 25px;
    padding: 55px;
    padding-top: 25px;
    padding-bottom: 25px;
  }

  .all {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;

    width: 100%;
    height: 100%;
  }

  .row {
    display: flex;
    justify-content: stretch;
    align-items: center;

    height: 100%;
    width: 100%;
    margin: 5px;
  }

  .second {
    height: 80vh;
  }

  .row div {
    width: 50%;
    height: 100%;
    background-position: center center;

    margin: 5px;
  }

  .i1,
  .i4 {
    background-image: url(../../../static/images/s1.jpeg);
  }

  .i2,
  .i3 {
    background-image: url(../../../static/images/s2.jpeg);
  }

  :global(.showcase) {
    width: 20%;
    height: 100%;
    transition: all 5s cubic-bezier(0.12, 0.78, 0, 0.99);
  }

  .second {
    width: 100%;

    filter: blur(5px);
    transform: scale(0.8);

    display: flex;
    justify-content: space-around;
    align-items: center;

    transition: all 5s cubic-bezier(0.12, 0.78, 0, 0.99);
  }

  :is(.shown) {
    transform: scale(1);
  }

  :is(.shown) {
    filter: blur(0);
  }

  @media screen and (max-width: 1000px) {
    .row {
      flex-direction: column;
    }

    .row div {
      margin: 0;
      width: 100%;
    }

    .row div:not(.i2) {
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: 777px) {
    .poster {
      padding: 15px;
    }
    .info {
      padding: 15px;
      text-align: left;
    }
    .info h1 {
      font-size: 40px;
    }

    .info p {
      font-size: 18px;
      text-align: justify;
    }
  }
</style>
