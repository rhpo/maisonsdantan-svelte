<script>
  import { onMount } from "svelte";
  import { tippy } from "svelte-tippy";

  import Fa from "svelte-fa";

  export let url,
    name,
    icon,
    description,
    inline = false;
</script>

<a
  class="link"
  class:inline
  href={url}
  use:tippy={{
    zIndex: description && !inline ? 1000 : -1,
    content: description,
    placement: "bottom",
    arrow: true,
    animation: "perspective",
  }}
>
  <div class="image">
    {#if typeof icon === "object"}
      <Fa {icon} />
    {:else}
      <img src={icon} alt={name} />
    {/if}
  </div>
  <p>
    {name.toUpperCase()}
  </p>
</a>

<style>
  *,
  :global(.link svg) {
    transition: all var(--animation-duration);
  }

  .image {
    overflow: hidden;
    width: 100%;
    max-height: calc(var(--header-height) * var(--nav-scalar));
    transition: all var(--animation-duration);
  }

  :global(header.shrunk .image) {
    max-height: 0 !important;
    filter: blur(2px);
  }

  :global(header.shrunk) .link {
    gap: 0;
  }

  :global(header.shrunk) p {
    font-weight: 400;
  }

  .link {
    cursor: pointer;
    text-align: center;
    border: 1px dashed transparent;
    transition: all var(--animation-duration);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 0.5rem;
    height: 100%;
  }

  .link.inline {
    flex-direction: row;
    gap: 1rem;
    justify-content: flex-start;

    height: fit-content;
    width: fit-content;
  }

  .link.inline:hover {
    text-decoration: underline;
  }

  .link.inline .image {
    width: fit-content;
    min-width: 30px;
  }

  .link,
  .link * {
    cursor: var(--cursor-pointer);
  }

  a {
    text-decoration: none;
    color: var(--secondary);

    padding: 1rem;
    padding-top: 0;
    padding-bottom: 0;
  }

  a p {
    font-weight: 300;
    letter-spacing: 1px;

    font-family: var(--f-third) !important;
  }

  .link img {
    max-height: 3rem;
  }

  .link:not(.inline):hover {
    border: 1px dashed var(--secondary);
  }

  .link:not(.inline):hover .image,
  :global(.link:hover image) {
    transform: scale(1.1) translateY(-5px);
  }
</style>
