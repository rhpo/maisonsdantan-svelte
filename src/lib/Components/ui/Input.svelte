<script>
    import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";

    import Fa from "svelte-fa";
    import tippy from "tippy.js";

    export let icon;
    export let placeholder = "";
    export let errorMessage = `Veuillez entrer un ${placeholder} valide.`;

    export let type = "text";

    export let verify = () => true;
    export let transform = (value) => value;
    export let value = "";
    export let valid = true;

    $: value = value === "" ? "" : transform(value);
    $: valid = value === "" ? true : verify(value);

    let everFocused = false;

    onMount(() => {
        inp.addEventListener("input", () => {
            inp.style.height = "auto";
            inp.style.height = inp.scrollHeight + "px";
        });
    });

    const handleInput = (e) => {
        everFocused = true;

        value = type.match(/^(number|range)$/)
            ? +e.target.value
            : e.target.value;
    };

    export let multiline = false;

    let inp;
</script>

{#if multiline}
    <textarea class="input" {placeholder} bind:value bind:this={inp} />
{:else}
    <div
        class="ui-input wrapper text-cursor"
        on:click={() => inp.focus()}
        class:invalid={!valid && everFocused}
    >
        {#if icon}
            <div class="icon">
                <Fa {icon} />
            </div>
        {/if}

        <input
            class="input"
            {type}
            {placeholder}
            bind:this={inp}
            on:input={handleInput}
            on:blur={() => (everFocused = true)}
            value={value === 0 ? value : ""}
        />

        {#if !valid && everFocused}
            <div
                class="incorrect"
                transition:scale
                use:tippy={{
                    content: errorMessage,
                    animation: "perspective",
                    placement: "right",
                }}
            >
                <Fa icon={faExclamationCircle} />
            </div>
        {/if}
    </div>
{/if}

<style>
    .wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;

        padding-top: 0.25rem;
        padding-bottom: 0.25rem;

        color: var(--alt);
        border: none;
        border-radius: var(--radius);
        border: 1px solid var(--alt);
    }

    .wrapper,
    .wrapper * {
        transition: all var(--animation-duration);
    }

    .wrapper.invalid {
        border-color: var(--red);
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
    }

    .wrapper.invalid .incorrect {
        color: var(--red);
    }

    .wrapper.invalid .icon {
        color: var(--red);
    }

    .input {
        border: none;
        outline: none;

        font-size: 1.1rem;

        width: 100%;

        background-color: transparent;
    }

    .incorrect {
        padding: 0.5rem;
    }

    .input::placeholder {
        color: var(--alt);
    }

    .input:hover {
        color: var(--alt);
    }

    textarea {
        padding: 0.5rem;

        color: var(--alt);
        border: none;
        border-radius: var(--radius);
        border: 1px solid var(--alt) !important;

        width: 100%;
        min-height: 2.5rem !important;

        resize: vertical;
    }
</style>
