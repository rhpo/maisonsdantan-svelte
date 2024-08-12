<script>
    import svelteTilt from "vanilla-tilt-svelte";
    export let src;
</script>

<div
    style={`--image: url(${src})`}
    class="revert"
    use:svelteTilt={{
        max: 8,
        glare: true,
    }}
/>

<style>
    div {
        background-size: cover;
        background-image: var(--image);

        width: 100%;
        height: 100%;
        background-position: center center;
    }
</style>
