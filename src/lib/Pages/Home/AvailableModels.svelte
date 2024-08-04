<script>
  import { onMount } from "svelte";
  import Image from "$lib/Components/Image.svelte";
  import Container from "$lib/Components/Container.svelte";

  let splitChunks = (arr, len) => {
    let chunks = [];
    let i = 0;
    let n = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }

    return chunks;
  };

  let images = [];
  $: chunks = splitChunks(images, images.length / 4);

  let n = 0;
  let max = 0;
  let delay = 2000;

  onMount(() => {
    images = Object.keys(
      import.meta.glob("$lib/assets/models/*.jpg", { eager: true }),
    );

    function findMinArrayLength(matrix) {
      let minLength = matrix[0].length;

      for (let i = 1; i < matrix.length; i++)
        matrix[i].length < minLength && (minLength = matrix[i].length);

      return minLength;
    }

    chunks = splitChunks(images, images.length / 4);
    max = findMinArrayLength(chunks);

    setInterval(() => (n = n === max - 1 ? 0 : n + 1), delay);
  });
</script>

<Container center>
  <div class="poster">
    <div class="content">
      <div class="info">
        <h1>
          Plus de <span class="number">43.000</span> modèles disponibles...
        </h1>
        <p>
          Découvrez une incroyable variété de plus de 50.000 modèles de papier
          peint provenant des éditeurs de renom à travers le monde, pour donner
          vie à vos idées de décoration.
        </p>
      </div>

      <div class="images" data-listener>
        {#each chunks as chunk, i}
          <div class="frame">
            <Image src={chunk} {n} alt="model" class="showcase" />
          </div>
        {/each}
      </div>
    </div>
  </div>
</Container>

<style>
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

  .info .number {
    text-decoration: wavy underline;
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

    filter: blur(5px);
    transform: scale(0.5);
    transition: all 5s cubic-bezier(0.12, 0.78, 0, 0.99);
  }

  :global(.images.shown) {
    transform: scale(1) !important;
    filter: blur(0) !important;
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
