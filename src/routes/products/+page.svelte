<script>
    import Page from "$lib/Components/Page.svelte";
    import {
        faInstagram,
        faWhatsapp,
    } from "@fortawesome/free-brands-svg-icons";
    import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<Page
    title="Shopping - MAISONS D'ANTAN"
    description="Découvrez nos produits et papiers peints."
    centered
    center
>
    <div class="content">
        <div class="informations">
            <div class="frames">
                <div class="frame">
                    <div class="icon">
                        <Fa icon={faInstagram} />
                    </div>
                    <h1>Catalogue</h1>
                </div>

                <span class="small">
                    <Fa icon={faArrowRightArrowLeft} />
                </span>

                <div class="frame">
                    <div class="icon">
                        <Fa icon={faWhatsapp} />
                    </div>
                    <h1>Commandes</h1>
                </div>
            </div>

            <p>
                Le site est en construction. Pour passer une commande, veuillez
                jeter un coup d'oeil à notre catalogue sur Instagram et nous
                contacter sur WhatsApp.
            </p>
        </div>

        <p>
            <a href="https://maisonsdantan.co"> Retour à la page d'accueil </a>
        </p>
    </div>
</Page>

<style>
    .frames {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--gap);

        width: 100%;
    }

    .icon {
        font-size: 4rem;
    }

    .frames .small {
        font-size: 2rem;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        gap: var(--gap);
        width: 100%;

        max-width: calc(100% * var(--inner-scale));
    }

    .informations {
        text-align: center;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: calc(var(--gap) / 2);

        width: 100%;
    }

    @media screen and (max-width: 580px) {
        .icon {
            font-size: 2rem;
        }

        .frame {
            font-size: 0.5rem;
            transform: scale(0.8);
        }

        .frames .small {
            font-size: 1rem;
        }

        .frames {
            gap: 0.2rem;
        }

        .informations p {
            font-size: 0.8rem;
            text-align: left;
        }

        .content {
            gap: calc(var(--gap) / 2);
            font-size: 0.8rem;

            align-items: start;
        }
    }
</style>
