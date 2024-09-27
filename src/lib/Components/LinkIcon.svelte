<script>
    import Fa from "svelte-fa";

    export let href = "#";
    export let icon;
    export let name;
</script>

<a {href} {...$$restProps}>
    <div class="icon">
        {#if icon}
            <Fa {icon} />
        {/if}
    </div>
    {name}
    <slot />
</a>

<style>
    a {
        display: inline-flex;
        gap: 0.5rem;

        text-decoration: none;
        text-transform: uppercase;
    }

    a:hover {
        text-decoration: underline;
    }

    a:visited {
        color: inherit;
    }

    a:hover .icon {
        opacity: 0.8;
    }

    .icon {
        width: fit-content;
        min-width: 1.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
