<script>
    import {
        faArrowLeft,
        faArrowRight,
    } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    export let page;
    export let total;

    let max = 5;
</script>

<div class="component">
    <button
        class="left direction"
        disabled={page === 1}
        on:click={() => page--}
    >
        <Fa icon={faArrowLeft} />
    </button>

    <div class="indexer">
        {#if total > max}
            {#each Array.from({ length: max - 2 }, (_, i) => i + 1) as i}
                <button
                    class="index"
                    class:active={page === i}
                    disabled={page === i}
                    on:click={() => (page = i)}
                >
                    {i}
                </button>
            {/each}

            {#if page > max - 2}
                <button class="index" disabled={true}>
                    {page}
                </button>
            {/if}

            <button class="index rest" disabled={true}> ... </button>

            <button
                class="index"
                disabled={page === total}
                on:click={() => (page = total)}
            >
                {total}
            </button>
        {:else}
            {#each Array.from({ length: total }, (_, i) => i + 1) as i}
                <button
                    class="index"
                    class:active={page === i}
                    disabled={page === i}
                    on:click={() => (page = i)}
                >
                    {i}
                </button>
            {/each}
        {/if}
    </div>

    <button
        class="right direction"
        disabled={page === total}
        on:click={() => page++}
    >
        <Fa icon={faArrowRight} />
    </button>
</div>

<style>
    .component {
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .indexer {
        display: flex;
        gap: 0.5rem;
    }

    button {
        border-radius: 50%;
        width: 1.6rem;
        aspect-ratio: 1 / 1;

        font-size: 0.7rem;

        border: none;
        padding: 0.5rem;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: var(--cursor-pointer);

        background-color: var(--secsub);
        transition: all var(--animation-duration) ease;
    }

    button.direction {
        opacity: 0.5;
    }

    button.direction:disabled {
        opacity: 0.25;
        cursor: var(--cursor-grabbed);
    }

    button.index {
        background-color: transparent;
    }

    button.index:not(:disabled):hover {
        background-color: var(--secsub) !important;
    }

    button.index.active {
        font-weight: bold;
        text-decoration: underline;

        border-radius: 0;
        border: 1px solid var(--secsub);
    }
</style>
