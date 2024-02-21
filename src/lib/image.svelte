<script>
  import { onMount } from "svelte";

  export let src, className;

  const animationDuration = 0.5;

  /**
   * @param {HTMLElement} element
   * @param {String} className
   * @param {Number} duration
   * @returns
   */
  function animate(element, className, duration = animationDuration) {
    return new Promise((resolve) => {
      element.classList.add(className);
      let oldDuration = element.style.animationDuration;
      element.style.animationDuration = duration + "s";

      const handle = () => {
        element.removeEventListener("animationend", handle);
        element.classList.remove(className);
        element.style.animationDuration = oldDuration;
        resolve();
      };

      element.addEventListener("animationend", handle);
    });
  }

  let n = 5;

  /**
   * @type {HTMLElement} holder
   */
  let image, holder;
  export function transist(newSource) {
    let element = new Image();
    element.src = newSource;

    element.style.zIndex = "" + n;
    n++;
    element.style.opacity = "0";
    element.style.top = "0";
    element.style.left = "0";
    element.style.width = "100%";
    element.style.height = "100%";

    element.style.transition = "all 0.4s";

    element.style.position = "absolute";

    holder.appendChild(element);

    element.onload = async () => {
      animate(element, "show", 0.5);
      setTimeout(() => {
        holder
          .querySelectorAll("img:not(.firstImage):not(:last-child)")
          .forEach((img) => {
            img.remove();
          });
      }, 500);
    };
  }
</script>

<div class="imgK" bind:this={holder}>
  <img
    class="firstImage {className || ''}"
    {src}
    alt="ERR!"
    bind:this={image}
  />
</div>

<style>
  .imgK {
    width: fit-content;
    height: fit-content;
    position: relative;

    overflow: hidden;

    height: 100%;

    max-width: 20%;

    box-shadow: 9px 10px 5px 0px rgba(0, 0, 0, 0.17);
    -webkit-box-shadow: 9px 10px 5px 0px rgba(0, 0, 0, 0.17);
    -moz-box-shadow: 9px 10px 5px 0px rgba(0, 0, 0, 0.17);
  }

  .imgK img {
    transition: all 0.4s;
    height: 100%;

    width: 100%;
  }

  @media screen and (max-width: 1122px) {
    .imgK {
      max-width: 23%;
    }
  }

  @media screen and (max-width: 787px) {
    .imgK {
      max-width: 100%;
    }

    .imgK:not(:last-child) {
      margin-bottom: 20px;
    }
  }
</style>
