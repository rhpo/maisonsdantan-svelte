<script>
    import { slide } from "svelte/transition";
    import { notification } from "$lib/store";
    import Fa from "svelte-fa";
    import Container from "./Container.svelte";
    import { faX } from "@fortawesome/free-solid-svg-icons";

    export let message, icon;
</script>

{#if $notification.show}
    <div class="notification" transition:slide>
        <Container>
            <div class="wrapper">
                <span></span>

                <div class="info">
                    <Fa {icon} />
                    <p>{message}</p>
                </div>

                <button
                    class="close"
                    on:click={() => ($notification.show = false)}
                >
                    <Fa icon={faX} />
                </button>
            </div>
        </Container>
    </div>
{/if}

<style>
    .notification {
        text-align: center;
        background-color: var(--n-background);
        color: var(--n-color);

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        height: var(--notification-height);

        line-height: 1;
    }

    .close {
        background-color: transparent;
        border: none;
        cursor: var(--cursor-pointer);
        color: var(--n-color);
    }

    .notification p {
        margin: 0;
    }

    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }

    @media screen and (max-width: 725px) {
        .notification {
            font-size: 0.8rem;
        }

        :global(body) {
            --notification-height: 60px;
        }
    }
</style>
