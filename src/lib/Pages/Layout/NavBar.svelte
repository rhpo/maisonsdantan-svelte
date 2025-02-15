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
    import { scale } from "svelte/transition";
    import { Hamburger } from "svelte-hamburgers";
    import {
        cart,
        darkMode,
        menuOpen,
        notification,
        orderID,
    } from "$lib/store.js";

    import {
        faHome,
        faMoon,
        faPhone,
        faShippingFast,
        faShoppingBag,
        faSun,
    } from "@fortawesome/free-solid-svg-icons";

    import { onMount } from "svelte";
    import Container from "$lib/Components/Container.svelte";
    import Links from "$lib/Components/Links.svelte";

    const css = (name, value) =>
        document.documentElement.style.setProperty("--" + name, value);

    let open = false;
    $: menuOpen.set(open);

    let header, logo;
    function setupScroll() {
        let previousTop = 0,
            header = document.querySelector("header"),
            logo = document.querySelector(".logo");

        let className = "shrunk";

        if (header && logo) {
            window.addEventListener("scroll", () => {
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

    onMount(() => {
        cart.set(
            $cart ? $cart : JSON.parse(localStorage.getItem("cart") || "[]"),
        );

        cart.subscribe((value) => {
            localStorage.setItem("cart", JSON.stringify(value));
        });

        orderID.set(
            $orderID ? $orderID : localStorage.getItem("orderID") || undefined,
        );

        orderID.subscribe((value) => {
            localStorage.setItem("orderID", value);
        });

        setupScroll();
    });
</script>

<Menu bind:open />

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
                        <Links />
                    </div>
                </div>
                <div class="item main-item centered limited">
                    <div class="top hamburger-button hidden">
                        <Hamburger bind:open />
                    </div>

                    <div class="logo-wrap">
                        <Logo />
                    </div>

                    <button
                        class="theme mobile"
                        on:click={() => darkMode.update((v) => !v)}
                    >
                        {#if $darkMode}
                            <div class="icon" transition:scale>
                                <Fa icon={faSun} />
                            </div>
                        {:else}
                            <div class="icon" transition:scale>
                                <Fa icon={faMoon} />
                            </div>
                        {/if}
                    </button>
                </div>
                <div class="item">
                    <div class="controls">
                        <Link
                            url="/guide/catalogue"
                            icon={palmier}
                            name="Catalogue"
                            description="Voir les produits disponibles."
                        />

                        {#if $cart}
                            <Link
                                url="/panier"
                                icon={dromadaire}
                                name="Panier {$cart.length > 0
                                    ? ` (${$cart.length})`
                                    : ``}"
                                description="Voir votre panier et vos achats en cours."
                            />
                        {/if}

                        <button
                            class="theme"
                            on:click={() => darkMode.update((v) => !v)}
                        >
                            {#if $darkMode}
                                <div class="icon" transition:scale>
                                    <Fa icon={faSun} />
                                </div>
                            {:else}
                                <div class="icon" transition:scale>
                                    <Fa icon={faMoon} />
                                </div>
                            {/if}
                        </button>
                    </div>
                </div>
            </header>
        </Container>

        <div class="progress-wrapper">
            <div class="progress"></div>
        </div>
    </div>
</main>

<style>
    .theme {
        padding: 0;
        background: none;
        border: none;
        outline: none;

        aspect-ratio: 9 / 13;
        cursor: var(--cursor-pointer);

        position: relative;

        height: 100%;
    }

    .theme .icon {
        font-size: 1.5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all var(--animation-duration) ease;
    }

    .theme:hover .icon {
        transform: translate(-50%, -50%) scale(1.1);
    }
    main {
        z-index: 1000;

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: var(--nav-height);

        transition: all var(--animation-duration) ease;
    }

    .head {
        position: relative;
    }

    .progress-wrapper {
        width: 100%;
        border-radius: var(--progress-height);
        overflow: hidden;
        height: var(--progress-height);

        opacity: 0.5;

        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1000;
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
        cursor: var(--cursor-pointer) !important;
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

    .logo-wrap {
        height: 100%;
        transition: all var(--animation-duration) ease;
        max-height: calc(var(--header-height) * var(--nav-scalar));
    }

    .theme.mobile {
        display: none;
        width: 30px;
    }

    @media screen and (max-width: 1050px) {
        .navigation {
            display: none;
        }

        .centered {
            justify-content: flex-start;
        }

        .hidden {
            display: block;
        }

        .main-item {
            gap: 1.2rem;
        }
    }

    @media screen and (max-width: 810px) {
        .item:not(.main-item) {
            display: none;
        }

        .theme {
            display: none;
        }

        .mobile {
            display: block !important;
        }

        :global(html) {
            --margin: 2rem !important;
        }

        .main-item {
            flex-grow: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--margin);
        }
    }

    @media screen and (max-width: 420px) {
        .logo-wrap {
            height: fit-content;
        }
    }
</style>
