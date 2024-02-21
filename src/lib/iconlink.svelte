<script>
  export let icon,
    url = "#",
    callback = () => {};

  let btn;
</script>

<div class="icon" bind:this={btn}>
  <i class={icon} />
</div>

<style>
  .icon {
    cursor: pointer;

    transition: all 0.4s;
    margin-top: 0;
    margin-bottom: 0;
    margin: 25px;
  }

  .icon:hover {
    transform: scale(1.1);
  }
</style>
