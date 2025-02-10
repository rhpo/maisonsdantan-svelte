<script>
    import Image from "$lib/Components/Image.svelte";
    import svelteTilt from "vanilla-tilt-svelte";
    import Container from "$lib/Components/Container.svelte";
    import Page from "$lib/Components/Page.svelte";
    import Choose from "$lib/Components/ui/Choose.svelte";
    import Input from "$lib/Components/ui/Input.svelte";

    import {
        faInstagram,
        faWhatsapp,
    } from "@fortawesome/free-brands-svg-icons";

    import {
        faArrowRightArrowLeft,
        faExclamationCircle,
        faSearch,
        faSpinner,
        faQuestion,
        faFaceSadCry,
    } from "@fortawesome/free-solid-svg-icons";

    import Fa from "svelte-fa";
    import { blur, fade, fly, scale, slide } from "svelte/transition";
    import { endpoint, notification } from "$lib/store";
    import { onMount } from "svelte";
    import Indexer from "$lib/Components/ui/Indexer.svelte";
    import Button from "$lib/Components/ui/Button.svelte";
    import {
        faCircleCheck,
        faListAlt,
    } from "@fortawesome/free-regular-svg-icons";
    import Long from "$lib/Components/ui/Long.svelte";
    import { text } from "@sveltejs/kit";

    let modelCategories = {
        all: "Pièces",
        child: "Enfants",
        living: "Salon",
        kitchen: "Cuisine",
        bedroom: "Chambre",
    };

    let modelShape = {
        all: "Papier peint",
        pano: "Panoramique",
        pattern: "Motif",
    };

    let sortBy = {
        name: "Trier par",
        date: "Nouveautés",
        popularity: "Best Sellers",
    };

    function first(obj) {
        return Object.keys(obj)[0];
    }

    let category = Object.keys(modelCategories)[0];
    let shape = Object.keys(modelShape)[0];
    let sort = Object.keys(sortBy)[0];
    let search = "";

    let timeoutSearch = null;
    let limit = 12;
    let page = 1;

    $: api =
        $endpoint +
        `/products?_limit=${limit}&_page=${page}&n=100&_sort=${encodeURIComponent(sort)}&_shape=${encodeURIComponent(shape)}&_category=${encodeURIComponent(category)}&_q=${encodeURIComponent(search)}`;

    let products = [];
    let total = 0;

    let state = "loading";

    $: {
        state = "loading";
        clearTimeout(timeoutSearch);

        timeoutSearch = setTimeout(() => {
            products = [];

            try {
                fetch(api)
                    .then((res) => res.json())
                    .then((data) => {
                        products = data.products;
                        total = data.total;
                        state = "loaded";
                    });
            } catch {
                products = [];
                state = "error";
            }
        }, 800);
    }

    onMount(() => {
        notification.set({
            colors: {
                background: "black",
                text: "white",
            },
        });

        page = +localStorage.getItem("page") || 1;
        category = localStorage.getItem("category") || category;
        shape = localStorage.getItem("shape") || shape;
        sort = localStorage.getItem("sort") || sort;
        search = localStorage.getItem("search") || search;
    });

    let filterMenuOpen = false;
</script>

{#if filterMenuOpen}
    <menu transition:slide={{ duration: 200, delay: 200, axis: "y" }}>
        <div class="content">
            <div class="filters">
                <Choose
                    name=""
                    choices={modelCategories}
                    bind:choice={category}
                    base={first(modelCategories)}
                />

                <Choose
                    name="Format"
                    choices={modelShape}
                    bind:choice={shape}
                    base={first(modelShape)}
                />

                <Choose
                    name=""
                    choices={sortBy}
                    bind:choice={sort}
                    base={first(sortBy)}
                />
            </div>

            <Button
                title="Appliquer les filtres"
                icon={faCircleCheck}
                color="var(--primary)"
                background="var(--secondary)"
                onClick={() => (filterMenuOpen = false)}
            />
        </div>
    </menu>
{/if}

<div class="bartop">
    <Container>
        <div class="filters">
            {#if total > 1}
                <div class="page-wrapper" transition:blur>
                    <div class="page">
                        <Indexer bind:page bind:total />
                    </div>
                </div>
            {/if}
            <div class="container">
                <div class="choices">
                    <Choose
                        name=""
                        choices={modelCategories}
                        bind:choice={category}
                        base={first(modelCategories)}
                    />

                    <Choose
                        name=""
                        choices={modelShape}
                        bind:choice={shape}
                        base={first(modelShape)}
                    />

                    <Choose
                        name=""
                        choices={sortBy}
                        bind:choice={sort}
                        base={first(sortBy)}
                    />
                </div>

                <div class="filter-button">
                    <Button
                        title="Filtrer"
                        color="var(--primary)"
                        background="var(--secondary)"
                        icon={faListAlt}
                        onClick={() => (filterMenuOpen = true)}
                    />
                </div>

                <div class="searchbar">
                    <Input
                        icon={faSearch}
                        placeholder="Rechercher..."
                        bind:value={search}
                    />
                </div>
            </div>
        </div>
    </Container>
</div>

{#if state !== "loaded"}
    <div
        class="state"
        transition:fade={{
            duration: 100,
        }}
    >
        {#if state === "loading"}
            <div class="screen">
                <Fa icon={faSpinner} spin />
                <h1>Chargement</h1>
            </div>
        {:else if state === "error"}
            <div class="screen">
                <Fa icon={faExclamationCircle} />
                <h1>Erreur de chargement</h1>
            </div>
        {:else if state === "not_found"}
            <div class="screen">
                <Fa icon={faQuestion} />
                <h1>Aucun résultat</h1>
            </div>
        {/if}
    </div>
{/if}

<Page
    title="Shopping"
    description="Découvrez nos produits et papiers peints."
    centered
>
    <div class="wrapper">
        <div class="products">
            {#if products.length === 0}
                <div class="not-found-wrapper">
                    <div class="not-found">
                        <div class="not-found-icon">
                            <Fa icon={faFaceSadCry} />
                        </div>
                        <h1>Aucun produit</h1>
                    </div>
                </div>
            {:else}
                {#each products as product, i}
                    {#key (products, product.id, api)}
                        <a
                            class="product"
                            href={"/products/" + product.id}
                            data-id={product.id}
                            transition:scale={{ duration: 200, delay: i * 100 }}
                        >
                            <div class="img-wrapper">
                                <div class="img">
                                    <!-- old image where we used to show the
                             product's original watermarked image -->

                                    <!-- <Image
                                src={product.models.map((model) => {
                                    return model.image;
                                })}
                                interval={5000}
                            /> -->

                                    <!-- new image where we show the shootings
                             instead... -->
                                    <Image
                                        src={product.models
                                            .map((model) => {
                                                return model.shootings.map(
                                                    (s) => s.image,
                                                );
                                            })
                                            .flat()}
                                        interval={5000}
                                    />
                                </div>
                            </div>

                            <div class="info">
                                <div class="branding">
                                    <h1
                                        class="name"
                                        class:smaller={product.name.length > 16}
                                    >
                                        {product.name}
                                    </h1>
                                    <p class="details">
                                        {modelShape[product.shape]} | {modelCategories[
                                            product.category
                                        ]}
                                    </p>
                                </div>
                                <p class="description">
                                    <Long text={product.description} />
                                </p>
                            </div>

                            <!-- <div class="models">
                    {#each product.models as model}
                        <div class="model">
                            <h2>{model.name}</h2>
                            <p>{model.id}</p>
                        </div>
                    {/each}
                </div> -->
                        </a>
                    {/key}
                {/each}
            {/if}
        </div>
    </div>
</Page>

<style>
    .not-found-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .not-found-icon {
        font-size: 3rem;
    }

    .not-found {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    .not-found h1 {
        font-size: 1.5rem;
        width: 100%;
    }

    menu {
        margin: 0;
        padding: 0 2rem;

        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;

        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(5px);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    menu .content {
        width: 100%;
        max-width: calc(var(--maxw) / 1.5);

        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: space-around;
    }

    .filter-button {
        display: none;
    }

    .screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        font-size: 3rem;
    }

    .screen h1 {
        font-size: 1.6rem;
        text-transform: uppercase;
        font-family: var(--f-third);
    }

    .state {
        position: fixed;
        z-index: 1;
        top: calc(var(--nav-height) + var(--preferences-height));
        left: 0;
        width: 100%;
        height: calc(100% - var(--nav-height) - var(--preferences-height));
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;

        transition: all var(--animation-duration) ease;
    }

    .page {
        max-width: 20rem;
        width: 100%;
        overflow: hidden;
    }

    .bartop {
        background-color: var(--primary);
        width: 100%;

        position: fixed;
        z-index: 1;
        top: var(--nav-height);
        left: 0;

        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        /* bottom shadow */

        height: var(--preferences-height);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all var(--animation-duration) ease;
    }

    .filters {
        position: relative;
    }

    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        z-index: 1;

        transition: all var(--animation-duration) ease;
        top: calc(var(--nav-height) + var(--preferences-height));

        padding: 0.6rem 0;

        left: 50%;
        transform: translateX(-50%);

        width: 100%;

        /* BLUR BACKGROUND */
        backdrop-filter: blur(5px);
        background-color: rgba(255, 255, 255, 0.5);
    }

    .page-wrapper.hidden {
        display: none;
    }

    .img-wrapper {
        aspect-ratio: 16 / 14;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .img {
        width: 100%;
        aspect-ratio: 16 / 14;
        overflow: hidden;
        object-fit: cover;
        border-bottom: 1px solid #ccc;

        transition: all var(--animation-duration) ease;
    }

    .branding {
        width: 100%;
    }

    .products {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: var(--gap);
    }

    .info {
        padding: calc(var(--gap) / 3);

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;

        flex: 1 1 auto;
        /* The above is shorthand for:
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: auto;
        */
    }

    .info .name {
        text-transform: uppercase;
        white-space: nowrap;

        font-size: 1.3rem;
    }

    .info .name.smaller {
        font-size: 1rem !important;
    }

    .info .details {
        font-size: 0.75rem;
        text-transform: uppercase;

        opacity: 0.5;
    }

    .info .description {
        font-size: 0.75rem;
    }

    .product {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        flex-flow: column;

        border: 1px solid #ccc;
        border-radius: 0.25rem;
        text-align: center;
        text-decoration: none;
        color: inherit;

        overflow: hidden;
    }

    .product > * {
        width: 100%;
    }

    .product:hover .img {
        aspect-ratio: 1 / 1;
        transform: scale(1.1);
    }

    .product img {
        width: 100%;
        height: auto;
        border-radius: 0.25rem;
    }

    .product h1 {
        font-size: 1.5rem;
    }

    .wrapper {
        padding-top: calc(var(--preferences-height) + var(--gap));

        width: 100%;
        height: 100%;
    }

    .container {
        display: flex;
        gap: 0.5rem;
    }

    .container > .searchbar {
        flex-grow: 1;
    }

    .filters {
        display: flex;
        flex-direction: column;
        justify-content: center;

        gap: 0.5rem;
    }

    .choices {
        display: flex;
        gap: 0.5rem;
    }

    .choices > :global(*) {
        flex: 1;
        flex-basis: 0;
    }

    .filters > :global(*) {
        flex: 1;
        flex-basis: 0;
    }

    :global(.ui > *) {
        height: 100%;
    }

    @media screen and (max-width: 790px) {
        :global(html) {
            --preferences-height: 7rem !important;
        }

        .container {
            flex-direction: column;
            gap: 0.5rem;
        }
    }

    @media screen and (max-width: 500px) {
        :global(html) {
            --preferences-height: 60px !important;
        }

        .filters .container {
            flex-direction: row;
            gap: 0.5rem;
        }

        .searchbar > :global(*) {
            width: 100% !important;
        }

        .searchbar {
            flex-grow: 1;
        }

        .choices {
            display: none;
        }

        .choices {
            flex-direction: column;
        }

        .filter-button {
            display: block;
        }
    }
</style>
