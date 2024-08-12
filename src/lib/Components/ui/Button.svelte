<script>
    import Fa from "svelte-fa";

    export let title = "Click me ";
    export let icon;

    export let onClick;
    export let url;

    export let newTab = true;

    export let color = "var(--primary)";
    export let background = "var(--secondary)";
</script>

{#if url}
    <a href={url} target={newTab ? "_blank" : "_self"}>
        <button
            class="inner"
            {...$$restProps}
            style="color: {color}; background-color: {background};"
        >
            {#if icon}
                <Fa {icon} />
            {/if}

            {title}
        </button>
    </a>
{:else}
    <button
        on:click={onClick}
        {...$$restProps}
        style="color: {color}; background-color: {background};"
    >
        {#if icon}
            <Fa {icon} />
        {/if}

        {title}
    </button>
{/if}

<style>
    a {
        text-decoration: none;
    }
    a:visited {
        color: inherit;
    }

    button {
        /* background-color: var(--secondary);
        color: var(--primary); */
        border: none;
        border-radius: var(--radius);
        padding: 10px;
        font-size: 1.1rem;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        text-decoration: none;

        transition: all var(--animation-duration);
    }

    button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    button:not(:disabled):hover {
        background-color: var(--primary);
        color: var(--secondary);

        transform: scale(1.1);
    }
</style>
