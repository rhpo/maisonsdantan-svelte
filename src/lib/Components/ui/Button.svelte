<script>
    import Fa from "svelte-fa";

    export let title = "Click me ";
    export let icon;

    export let onClick;
    export let url;

    export let newTab = true;
</script>

{#if url}
    <a href={url} target={newTab ? "_blank" : "_self"}>
        <button>
            {#if icon}
                <Fa {icon} />
            {/if}

            {title}
        </button>
    </a>
{:else}
    <button on:click={onClick}>
        {#if icon}
            <Fa {icon} />
        {/if}

        {title}
    </button>
{/if}

<style>
    button {
        background-color: var(--secondary);
        color: var(--primary);
        border: none;
        border-radius: 5px;
        padding: 10px;
        font-size: 1.1rem;
        cursor: pointer;

        display: flex;
        align-items: center;
        gap: 1rem;

        text-decoration: none;

        transition: all var(--animation-duration);
    }

    button:hover {
        background-color: var(--primary);
        color: var(--secondary);

        transform: scale(1.1);
    }
</style>
