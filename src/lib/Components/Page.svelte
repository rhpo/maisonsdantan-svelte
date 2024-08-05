<script>
    import { MetaTags } from "svelte-meta-tags";
    import Container from "./Container.svelte";
    import { onMount } from "svelte";
    import Fa from "svelte-fa";
    import {
        faInstagram,
        faWhatsapp,
    } from "@fortawesome/free-brands-svg-icons";
    import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

    export let title, description, url;
    export let dev = false;
    export let centered = false;
</script>

{#if dev}
    <MetaTags
        title="Site en construction 🔨"
        description="Le site est actuellement en
        cours de développement. Merci de votre patience."
        canonical="https://maisonsdantan.co/"
    />

    <main class:centered>
        <Container addClass="container-wrap" center>
            <div class="content">
                <div class="informations">
                    <h1>
                        <Fa icon={faClockRotateLeft} />
                        Site en construction...
                    </h1>

                    <p>
                        Le site est en construction. Pour passer une commande,
                        veuillez jeter un coup d'oeil à notre catalogue sur
                        Instagram et nous contacter sur WhatsApp.
                    </p>
                </div>

                <p>
                    <a href="https://maisonsdantan.co">
                        Retour à la page d'accueil
                    </a>
                </p>
            </div>
        </Container>
    </main>
{:else}
    <MetaTags {title} {description} canonical={url} />

    <main class:centered>
        <Container addClass="container-wrap" {...$$restProps}>
            <slot />
        </Container>
    </main>
{/if}

<style>
    :global(.container-wrap) {
        height: 100%;
        min-height: 100% !important;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--gap);
        text-align: center;
        max-width: calc(100% * var(--inner-scale));
    }

    .informations {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: calc(var(--gap) / 2);
    }

    main :global(.container-wrap > div) {
        height: unset !important;
        min-height: 100% !important;
    }

    main {
        width: 100%;

        height: 1px;
        min-height: 100vh;

        background-color: var(--primary);
        padding-top: var(--page-padding);
        color: var(--secondary);

        padding-bottom: var(--page-padding-real);
        transition: all var(--animation-duration);
    }

    main.centered {
        padding-top: var(--nav-height) !important;
    }

    main :global(*) {
        font-family: var(--f-third);
    }

    @media screen and (max-width: 465px) {
        .content h1 {
            font-size: 1.3rem;
        }

        .informations p {
            font-size: 0.8rem;
        }

        .content {
            text-align: left;
            gap: calc(var(--gap) / 2);

            font-size: 0.8rem;
            align-items: flex-start;
        }
    }
</style>
