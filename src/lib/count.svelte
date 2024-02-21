<script>
  let count = 0;

  const i = () => count++;

  $: count2 = count ** 2;
</script>

<button on:click={i}>Count: {count} and {count2}</button>
