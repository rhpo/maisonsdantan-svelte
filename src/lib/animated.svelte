<script>
  import { onMount } from "svelte";

  let canvas, stickyContainer;
  onMount(() => {
    let ctx = canvas.getContext("2d");

    const prepare = (element) => {
      window.addEventListener("scroll", (e) => {
        // if (e.scroll)
      });
    };

    let stickyScrollDistance = stickyContainer.offsetHeight + 500;

    // Load your sequence of images
    var imageSources = [
      "image1.jpg",
      "image2.jpg",
      "image3.jpg",
      // Add more image sources as needed
    ];
    var images = [];
    var loadedImagesCount = 0;

    // Function to handle image loading
    function loadImage(src) {
      var image = new Image();
      image.onload = function () {
        loadedImagesCount++;
        if (loadedImagesCount === imageSources.length) {
          // All images have been loaded
          startScrollAnimation();
        }
      };
      image.src = src;
      return image;
    }

    // Load all images
    imageSources.forEach(function (src) {
      var image = loadImage(src);
      images.push(image);
    });

    // Function to draw the current image on the canvas
    function drawImageOnCanvas(imageIndex) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[imageIndex], 0, 0, canvas.width, canvas.height);
    }

    // Function to handle the scroll event
    function handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop < stickyScrollDistance) {
        // Stick the container to the top
        stickyContainer.style.top = `${stickyScrollDistance - scrollTop}px`;
      } else {
        // Unstick the container
        stickyContainer.style.top = "0";
      }

      // Calculate the image index based on the scroll position
      var imageIndex =
        Math.floor(scrollTop / stickyScrollDistance) % images.length;

      // Draw the current image on the canvas
      drawImageOnCanvas(imageIndex);
    }

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial drawing of the first image
    drawImageOnCanvas(0);
  });
</script>

<div id="sticky-container" bind:this={stickyContainer}>
  <canvas id="sticky-canvas" bind:this={canvas} />
</div>

<style>
  #sticky-container {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  #sticky-canvas {
    width: 100%;
    height: 100vh;

    background-color: aqua;
  }
</style>
