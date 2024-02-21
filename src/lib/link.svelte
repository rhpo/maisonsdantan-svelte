<script>
  import { onMount } from "svelte";
  import { tippy } from "svelte-tippy";

  export let url, name, icon, description;

  onMount(() => {
    if (description) {
    }
  });
</script>

<div
  class="link"
  on:click={location.replace(url)}
  use:tippy={{
    zIndex: description ? 9999 : -1,
    content: description,
    placement: "bottom",
    arrow: true,
    animation: "perspective",
  }}
>
  <div class="icon">
    <i class="icon-element {icon}" />
  </div>
  <a sveltekit:prefetch href={url}>{name.toUpperCase()}</a>
</div>

<style>
  .icon-element {
    margin-right: 3px;
  }

  .link {
    cursor: pointer;
    text-align: center;

    padding: 15px;

    width: 140px;

    min-height: 100px;

    border: 1px dashed transparent;

    transition: all 0.3s;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: black;

    font-family: "Montserrat", sans-serif !important;
    font-weight: 300;
    letter-spacing: 1px;

    transition: all 0.3s;
  }

  i {
    transition: all 0.3s;

    margin-bottom: 10px;
  }

  .link:hover {
    /* border: 1px dashed black; */
  }

  .link:hover i {
    transform: scale(1.1) translateY(-5px);
  }

  @media screen and (max-width: 1060px) {
    .link {
      font-size: 14px;
      padding: 5px;
    }

    .icon-element {
      margin: 0;
    }
  }

  @media screen and (max-width: 820px) {
    .link a {
      display: none;
    }

    .icon-element {
      font-size: 22px;
    }
  }
</style>
