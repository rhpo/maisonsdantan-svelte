<script>
    export let centerX = false;
    export let centerY = false;
    export let center = false;

    export let addClass = "";
    export let minHeight;
</script>

<div class="main {addClass}" style="height: fit-content;" {...$$restProps}>
    <div
        class="container"
        style="min-height: {minHeight
            ? minHeight
            : 'unset'}; height: fit-content;"
        class:center
        class:center-x={centerX}
        class:center-y={centerY}
    >
        <slot></slot>
    </div>
</div>

<style>
    .main {
        height: 1px; /* to give it access to min-height */
        display: flex;
        justify-content: center;
        width: 100%;

        padding: var(--margin);
        padding-top: 0;
        padding-bottom: 0;
    }

    .container {
        width: 100%;
        max-width: var(--maxw);
    }

    .container.center-x {
        display: flex;
        justify-content: center;
    }

    .container.center-y {
        display: flex;
        align-items: center;
    }

    .container.center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
