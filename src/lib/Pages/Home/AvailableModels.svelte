<script>
  import { onMount } from "svelte";
  import Image from "$lib/Components/Image.svelte";
  import Container from "$lib/Components/Container.svelte";

  import I1 from "$lib/assets/models/1.jpg";
  import I2 from "$lib/assets/models/2.jpg";
  import I3 from "$lib/assets/models/3.jpg";
  import I4 from "$lib/assets/models/4.jpg";
  import I5 from "$lib/assets/models/5.jpg";
  import I6 from "$lib/assets/models/6.jpg";
  import I7 from "$lib/assets/models/7.jpg";
  import I8 from "$lib/assets/models/8.jpg";
  import I9 from "$lib/assets/models/9.jpg";
  import I10 from "$lib/assets/models/10.jpg";
  import I11 from "$lib/assets/models/11.jpg";
  import I12 from "$lib/assets/models/12.jpg";
  import I13 from "$lib/assets/models/13.jpg";
  import I14 from "$lib/assets/models/14.jpg";
  import I15 from "$lib/assets/models/15.jpg";
  import I16 from "$lib/assets/models/16.jpg";
  import { minLenArr, splitChunks } from "$lib/utility";
  import Button from "$lib/Components/ui/Button.svelte";
  import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

  let images = [
    I1,
    I2,
    I3,
    I4,
    I5,
    I6,
    I7,
    I8,
    I9,
    I10,
    I11,
    I12,
    I13,
    I14,
    I15,
    I16,
  ];

  let chunks = splitChunks(images, images.length / 4),
    max = minLenArr(chunks);

  let i = 0;
  let delay = 2000;

  onMount(() => setInterval(() => (i = i === max - 1 ? 0 : i + 1), delay));
</script>

<Container center>
  <div class="poster">
    <div class="content">
      <div class="info">
        <h1>Des papiers peints panoramiques</h1>
        <p>
          Les décors Maisons d’Antan, uniques et intemporels, transforment vos
          intérieurs avec des papiers peints panoramiques sur mesure. Nos
          modèles, inspirés d’ambiances variées, s’adaptent à votre style et à
          de grandes dimensions.
        </p>
      </div>

      <Button
        url="/products"
        title="DÉCOUVRIR NOS COLLECTIONS"
        icon={faShoppingBag}
      />

      <div class="images" data-aos="fade-left">
        {#each chunks as chunk}
          <div class="frame" data-aos="slide-left">
            <div class="img">
              <Image src={chunk} bind:i alt="model" class="showcase" />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</Container>

<style>
  .img {
    width: fit-content;
    height: fit-content;
    position: relative;
    box-shadow: 9px 10px 5px 0px rgba(0, 0, 0, 0.2);

    width: 100%;
    aspect-ratio: 3 / 4;
  }
  .poster {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    text-align: center;
    max-width: calc(100% * var(--inner-scale));
  }

  /* Informations */
  .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .info h1 {
    font-size: var(--heading-size);
  }

  .info p {
    font-size: var(--paragraph-size);
  }

  /* Images, Images => Frame */
  .images {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: fit-content;

    transition: all 5s cubic-bezier(0.12, 0.78, 0, 0.99);
  }

  .images .frame {
    width: 100%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    transition: all 5s cubic-bezier(0.12, 0.78, 0, 0.99);
  }

  @media screen and (max-width: 785px) {
    .info h1 {
      font-size: 40px;
      text-align: left;
      word-break: normal;
    }

    .info p {
      font-size: 18px;
      text-align: left;
    }

    .images {
      flex-direction: column;
    }

    .images .frame {
      transition: all 1s cubic-bezier(0.12, 0.78, 0, 0.99);
    }
  }
</style>
