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
    import { informations } from "$lib/store";

    export let title, description, url;
    export let dev = false;
    export let centered = false;

    export let image = {};
</script>

{#if dev}
    <MetaTags
        title="Site en construction 🔨"
        description="Le site est actuellement en cours de développement. Merci de votre patience."
        canonical="https://maisonsdantan.co/"
        titleTemplate="%s ✱ {$informations.name}"
        openGraph={{
            title: $informations.title,
            description: $informations.description,
            url: $informations.url,
            siteName: $informations.name,
            images: [
                {
                    url: $informations.image,
                    width: 1200,
                    height: 630,
                    alt: $informations.title,
                },
            ],
        }}
        twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
            title: $informations.title,
            description: $informations.description,
            image: $informations.image,
            imageAlt: $informations.name,
        }}
        additionalRobotsProps={{
            "data-n-head": "true",
            "data-hid": "robots",
            content: "noindex, nofollow",
        }}
    />

    <main class:centered>
        <Container addClass="container-wrap" center>
            <div class="content">
                <div class="informations">
                    <h1>
                        <Fa icon={faClockRotateLeft} />
                        Site en construction
                    </h1>

                    <p>
                        Pour toute question ou demande, contactez-nous via
                        WhatsApp ou Instagram. Pour découvrir nos modèles,
                        visitez notre page Instagram ou consultez notre
                        <a
                            href="https://drive.google.com/file/d/1vY479ki-uc8zOBeRPwcjpnpkWjSjcQHB/view"
                            target="_blank"
                            rel="noopener noreferrer">catalogue</a
                        >.
                    </p>
                </div>

                <p>
                    <a href="/"> Retour à la page d'accueil </a>
                </p>
            </div>
        </Container>
    </main>
{:else}
    <MetaTags
        title={title || $informations.title}
        description={description || $informations.description}
        canonical={url || $informations.url}
        titleTemplate="%s ✱ {$informations.name}"
        openGraph={{
            title: $informations.title,
            description: $informations.description,
            url: $informations.url,
            siteName: $informations.name,
            images: [
                {
                    url: image.url || $informations.image,
                    width: image.width,
                    height: image.height,
                    alt: image.alt || $informations.title,
                },
            ],
        }}
        twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
            title: $informations.title,
            description: $informations.description,
            image: $informations.image,
            imageAlt: $informations.name,
        }}
        additionalRobotsProps={{
            "data-n-head": "true",
            "data-hid": "robots",
            content: "noindex, nofollow",
        }}
    />

    <main class:centered>
        <Container addClass="container-wrap" {...$$restProps}>
            <slot />
        </Container>
    </main>
{/if}

<style>
    :global(.container-wrap) {
        flex: 1;
        /* because parent has display: flex; good alternative for height: 100% */
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

        min-height: 100vh;

        display: flex;
        flex-direction: column;

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
