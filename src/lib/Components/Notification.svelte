<script>
    import { faX } from "@fortawesome/free-solid-svg-icons";
    import { slide } from "svelte/transition";
    import { notification } from "$lib/store";

    import Fa from "svelte-fa";
    import Container from "./Container.svelte";
    import { onMount } from "svelte";

    export let message, icon;

    onMount(() => {
        notification.subscribe((value) => {
            if (!value.show) {
                document.documentElement.style.setProperty(
                    "--notification-height",
                    "0rem",
                );
            } else {
                document.documentElement.style.setProperty(
                    "--notification-height",
                    "3.75rem",
                );
            }
        });
    });
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
                    on:click={() => {
                        notification.update((n) => ({ ...n, show: false }));
                    }}
                    class="close"
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

        transition: all var(--animation-duration);
    }

    .close {
        background-color: transparent;
        border: none;
        cursor: var(--cursor-pointer);
        color: var(--n-color);
    }

    .notification p {
        margin: 0;
        font-family: var(--f-third);
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

    @media screen and (max-width: 768px) {
        .notification {
            font-size: 0.8rem;
        }
    }
</style>
