<script>
    import Fa from "svelte-fa";
    import AOS from "aos";
    import Link from "$lib/Components/Link.svelte";
    import Logo from "$lib/Components/Logo/Logo.svelte";
    import Menu from "$lib/Pages/Layout/Menu.svelte";
    import Footer from "$lib/Pages/Layout/Footer.svelte";
    import palmier from "$lib/assets/icons/palmier.svg";
    import dromadaire from "$lib/assets/icons/dromadaire.svg";
    import Notification from "$lib/Components/Notification.svelte";

    import { tippy } from "svelte-tippy";
    import { slide } from "svelte/transition";
    import { Hamburger } from "svelte-hamburgers";
    import { notification } from "$lib/store.js";

    import {
        faHome,
        faPhone,
        faShippingFast,
        faShoppingBag,
    } from "@fortawesome/free-solid-svg-icons";

    import { onMount } from "svelte";
    import Container from "$lib/Components/Container.svelte";

    const css = (name, value) =>
        document.documentElement.style.setProperty("--" + name, value);

    let open, header, logo;
    function setupScroll() {
        let previousTop = 0,
            header = document.querySelector("header"),
            logo = document.querySelector(".logo");

        let className = "shrunk";

        if (header && logo) {
            window.addEventListener("scroll", () => {
                // update --progress

                let progress =
                    window.scrollY /
                    (document.body.scrollHeight - window.innerHeight);
                css("progress", progress * 100 + "%");

                var newTop =
                    window.pageYOffset || document.documentElement.scrollTop;

                if (newTop > previousTop) {
                    header.classList.add(className);
                    logo.classList.add(className);

                    css(
                        "nav-height",
                        "calc(var(--header-height) * var(--nav-scalar) + var(--notification-height))",
                    );
                } else {
                    header.classList.remove(className);
                    logo.classList.remove(className);

                    css(
                        "nav-height",
                        "calc(var(--header-height) + var(--notification-height))",
                    );
                }

                previousTop = newTop;
            });
        }
    }

    onMount(() => setupScroll());
</script>

<main>
    <div class="head">
        <Notification
            message={$notification.message}
            icon={$notification.icon}
        />

        <Container>
            <header bind:this={header}>
                <div class="item navigation">
                    <div class="links">
                        <Link
                            url="/products"
                            icon={faHome}
                            name="Home"
                            description="Accéder à la page d'acceuil."
                        />
                        <Link
                            url="/products"
                            icon={faShoppingBag}
                            name="Produits"
                            description="Découvrir diverts produits et papiers peints."
                        />
                        <Link
                            url="/products"
                            icon={faPhone}
                            name="Contact"
                            description="Contacter nous vers E-Mail ou numéro de téléphone."
                        />
                    </div>
                </div>
                <div class="item main-item centered limited">
                    <div class="top hamburger-button hidden">
                        <Hamburger bind:open />
                    </div>

                    <div
                        style="max-height: calc(var(--header-height) * var(--nav-scalar)); height: 100%;"
                    >
                        <Logo />
                    </div>

                    <div
                        class="top hamburger-button"
                        style="height: 0; overflow: hidden"
                    >
                        <Hamburger bind:open />
                    </div>
                </div>
                <div class="item">
                    <div class="controls">
                        <Link
                            url="/account"
                            icon={palmier}
                            name="Compte"
                            description="Accéder aux paramètres de votre compte MD."
                        />

                        <Link
                            url="/account"
                            icon={dromadaire}
                            name="Panier"
                            description="Voir votre panier et vos achats en cours."
                        />
                    </div>
                </div>
            </header>

            <div class="progress-wrapper">
                <div class="progress"></div>
            </div>
        </Container>
    </div>
</main>

<style>
    .progress-wrapper {
        width: 100%;
        border-radius: var(--progress-height);
        overflow: hidden;
        height: var(--progress-height);

        opacity: 0.5;
    }

    .progress {
        width: var(--progress);
        background-color: var(--secondary);
        height: 100%;
    }

    .head {
        height: fit-content;

        /* glass effect */
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.5);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    :global(.hamburger-button button) {
        padding: 0 !important;
    }

    .limited {
        padding-left: 0;
        padding-right: 0;
    }

    header {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        height: var(--header-height);
        transition: all var(--animation-duration) ease;
    }

    :global(header.shrunk) {
        height: calc(var(--header-height) * var(--nav-scalar)) !important;
    }

    header > * {
        flex-grow: 1;
        flex-basis: 0;
    }

    .head {
        position: fixed;
        width: 100%;
        z-index: 1000;
    }

    .item {
        flex: 1;
        height: 100%;

        display: flex;
        align-items: center;
    }

    .centered {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .links {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        justify-content: stretch;
        align-items: center;
    }

    :global(.links > *) {
        width: calc(100% / 3);
    }

    .controls {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        float: right;
    }

    .hidden {
        display: none;
    }

    @media screen and (max-width: 972px) {
        .navigation {
            display: none;
        }

        .centered {
            justify-content: flex-start;
        }

        .hidden {
            display: block;
        }
    }

    @media screen and (max-width: 640px) {
        .item:not(.main-item) {
            display: none;
        }

        .main-item {
            flex-grow: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--margin);
        }
    }

    @media screen and (max-width: 416px) {
        .limited {
            padding-left: 0;
            padding-right: 0;
        }

        :global(html) {
            --margin: 2rem !important;
        }
    }
</style>
