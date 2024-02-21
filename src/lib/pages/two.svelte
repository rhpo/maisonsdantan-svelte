<script>
  const i1 = "../../../static/images/1.jpg";
  const i2 = "../../../static/images/2.jpg";
  const i3 = "../../../static/images/3.jpg";
  const i4 = "../../../static/images/4.jpg";
  import { onMount } from "svelte";
  import Image from "$lib/image.svelte";

  const stock = Array.from(
    { length: 16 },
    (_, i) => `../../../static/images/${i + 1}.jpg`
  ).reduce((obj, imagePath, index) => {
    obj[`i${index + 1}`] = imagePath;
    return obj;
  }, {});

  let second;
  let tr1, tr2, tr3, tr4;
  onMount(() => {
    (function () {
      let n = 1;
      let cSpeed = 3000;

      function animate() {
        tr1(stock["i" + n]);
        tr2(stock["i" + (n + 4)]);
        tr3(stock["i" + (n + 8)]);
        tr4(stock["i" + (n + 11)]);

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

    if (!/Mobi/.test(navigator.userAgent)) observer.observe(second);
    else {
      second.classList.add("shown");
    }
  });
</script>

<div class="poster">
  <div class="info">
    <h1>
      Plus de <span style="opacity: .7;">+50.000</span> Modèles
      <span style="color: blue;text-decoration: underline;"
        >disponibles<i class="fas fa-asterisk small" /></span
      >
    </h1>
    <p>
      Découvrez chez MAISONS D'ANTAN, une incroyable variété de plus de 50.000
      modèles de papier peint provenant des éditeurs de renom à travers le
      monde, pour donner vie à vos idées de décoration.
    </p>
  </div>

  <div class="second" bind:this={second}>
    <div class="images">
      <Image src={i1} className="showcase" bind:transist={tr1} />
      <Image src={i2} className="showcase" bind:transist={tr2} />
      <Image src={i3} className="showcase" bind:transist={tr3} />
      <Image src={i4} className="showcase" bind:transist={tr4} />
    </div>
  </div>
</div>

<style>
  :root {
    --margin: 30%;
  }

  .small {
    font-size: 20px;
    transform: translateY(-15px);
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

  .images {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    padding: 50px;
  }

  :global(.showcase) {
    width: 20%;
    height: 100%;
    transition: all 5s cubic-bezier(0.12, 0.78, 0, 0.99);
  }

  .second {
    width: 100%;

    filter: blur(5px);
    transform: scale(0.4);

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

  @media screen and (max-width: 1122px) {
    .poster {
      padding: 15px;
      padding-top: 30px;
    }

    .images {
      padding: 10px;
    }
  }

  @media screen and (max-width: 787px) {
    .images {
      flex-direction: column;
    }

    .info {
      padding: 10px;
    }

    .info h1 {
      font-size: 40px;
      text-align: left;
      word-break: normal;
    }

    .info p {
      font-size: 18px;
      text-align: left;
    }

    .second {
      /* transform: scale(0.8); */
      transition: all 1s cubic-bezier(0.12, 0.78, 0, 0.99);
    }
  }
</style>
