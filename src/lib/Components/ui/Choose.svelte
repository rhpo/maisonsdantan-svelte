<script>
    import { onMount } from "svelte";

    export let choices = {};
    export let choice = "";

    export let base = "";
    export let name = "Sélectionner";

    onMount(() => {
        choice = base;

        choices[Object.keys(choices)[0]] =
            (name ? name + " " : "") + choices[Object.keys(choices)[0]];
    });
</script>

<div class="ui">
    <select bind:value={choice}>
        {#each Object.keys(choices) as choice, i}
            <option value={choice}>
                {choices[choice]}
            </option>
        {/each}
    </select>
</div>

<style>
    .ui {
        display: flex;
        flex-direction: column;
    }

    .ui p {
        font-family: var(--f-third);
        text-transform: uppercase;
        font-family: 0.1rem;
    }

    option span::before {
        content: "+ ";
    }

    select {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;

        background-color: #f9f9f9;

        font-family: var(--f-third);

        text-transform: uppercase;

        display: flex;
        flex-direction: column-reverse;
    }

    select:focus {
        outline: none;
        border-color: #333;
    }

    select:hover {
        border-color: #666;
    }

    select:disabled {
        background-color: #f9f9f9;
        color: #999;
    }

    select:disabled:hover {
        border-color: #ccc;
    }

    select:disabled:focus {
        border-color: #ccc;
    }

    select:disabled option {
        color: #999;
    }

    select option {
        padding: 0.5rem;
    }
</style>
