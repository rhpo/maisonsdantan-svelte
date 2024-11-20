<script>
    import { fade, scale } from "svelte/transition";
    import Choose from "$lib/Components/ui/Choose.svelte";
    import Fa from "svelte-fa";
    import Page from "$lib/Components/Page.svelte";
    import Image from "$lib/Components/Image.svelte";
    import Button from "$lib/Components/ui/Button.svelte";

    import svelteTilt from "vanilla-tilt-svelte";
    import { useMediaQuery } from "svelte-breakpoints";

    let isMobile = useMediaQuery("(max-width: 965px)");

    import Cropper from "svelte-easy-crop";
    import { onMount } from "svelte";

    import {
        faArrowLeft,
        faArrowRight,
        faCartPlus,
        faCheck,
        faFaceFlushed,
        faFaceGrimace,
        faFaceGrin,
        faHammer,
        faHandPointer,
        faHandPointUp,
        faLeftRight,
        faCropAlt as faCrop,
        faObjectGroup,
        faUpDown,
    } from "@fortawesome/free-solid-svg-icons";

    import Input from "$lib/Components/ui/Input.svelte";
    import { tippy } from "svelte-tippy";
    import Pattern from "$lib/Components/Pattern.svelte";
    import { configuration } from "$lib/store";
    import {
        faImage,
        faImages,
        faLightbulb,
        faSmileBeam,
        faStar,
        faStarHalfStroke,
    } from "@fortawesome/free-regular-svg-icons";
    import Carousel from "svelte-carousel/src/components/Carousel/Carousel.svelte";

    const MAX_X = 0; // 25

    export let data;
    $: product = data.product;

    let currentModel = 0;
    let image;

    let modelCategories = {
        all: "Tous",
        child: "Enfants",
        living: "Salon",
        kitchen: "Cuisine",
        bedroom: "Chambre",
    };

    let materials = {
        rouleau: "En rouleau",
        poster: "Monobloc",
    };

    let modelShapes = {
        all: "Tous",
        pano: "Panoramique",
        pattern: "Motif",
    };

    let sortBy = {
        name: "Nom",
        date: "Nouveautés",
        popularity: "Best Sellers",
    };

    let width = 0;
    let height = 0;

    export let order = {
        width,
        height,
        material: "rouleau",
        price: 0,
        image: "",

        id: 0,
        model: 0,
        shape: "",

        product: {},

        crop: {
            top: undefined,
            left: undefined,
        },

        aspectRatio: undefined,
    };

    $: imageCrop = {
        x: order.crop.left / order.width,
        y: order.crop.top / order.height,
        aspectRatio: order.aspectRatio,
    };

    $: {
        order.id = product?.id.toString() || 0;
        order.model = product?.models[currentModel]?.id || 2;

        order.aspectRatio = order.width / order.height || realAspectRatio;
        order.shape = product?.shape || "";

        order.image = product?.models[currentModel]?.image || "";

        order.product = product || undefined;

        order.price =
            Math.ceil(
                ((order.width / 100) *
                    (order.height / 100) *
                    $configuration.price[order.material]) /
                    5,
            ) * 5;

        order.width = parseFloat(width)
            ? parseFloat(width) + $configuration.securityMargin
            : "";
        order.height = parseFloat(height)
            ? parseFloat(height) + $configuration.securityMargin
            : "";
    }

    function previewCrop(e) {
        const { x, y } = e.detail.percent;

        order.crop = {
            top: (y * order.height) / 100,
            left: (x * order.width) / 100,
        };
    }

    function round(n, eps = 0.05) {
        return n % 1 < eps ? Math.floor(n) : Math.ceil(n);
    }

    export let onOrder = () => {};

    let cropMenu = false;
    let imageFrame;

    function openCropMenu() {
        // check if he entered some dimensions
        if (!order.width || !order.height) {
            alert("Veuillez entrer les dimensions de votre papier peint.");
            return;
        }

        cropMenu = true;
    }

    $: realAspectRatio = imageFrame
        ? round(imageFrame.offsetWidth / imageFrame.offsetHeight)
        : 1;

    function defined(value) {
        return value !== undefined && value !== null;
    }

    function checkOrder() {
        if (!defined(order.crop.top) || !defined(order.crop.left)) {
            if (order.shape === "pattern") {
                order.crop.top = 0;
                order.crop.left = 0;
            } else {
                alert("Veuillez redimensionner votre papier peint.");
                return;
            }
        }

        if (
            order.price &&
            order.width &&
            order.height &&
            order.image &&
            order.material &&
            defined(order.id) &&
            defined(order.crop.top) &&
            defined(order.crop.left) &&
            defined(order.model)
        ) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            onOrder(order);
            done = true;
        } else {
            alert("Veuillez remplir toutes les informations.");
        }
    }

    let done = false;
    let carousel;

    function showNextPage() {
        carousel.goToNext();
    }

    function showPrevPage() {
        carousel.goToPrev();
    }
</script>

{#if cropMenu}
    <div class="cropper" transition:fade>
        <Cropper
            image={product.models[currentModel].image}
            aspect={order.aspectRatio || realAspectRatio}
            zoom="1"
            minZoom="1"
            maxZoom="1"
            on:cropcomplete={previewCrop}
        />

        <button class="validate" on:click={() => (cropMenu = false)}>
            <Fa icon={faCheck} />
        </button>
    </div>
{/if}

<Page
    title={"Papier peint - " + product.name.toUpperCase()}
    description={product.description}
    image={{
        url: product.models[0].image,
    }}
    centerY
>
    <main>
        {#if done}
            <div class="done" transition:fade>
                <div class="content-done">
                    <h1>Commande terminée</h1>
                    <p>
                        Votre commande a été ajoutée au panier.
                        <br />
                        Vous pouvez continuer à naviguer ou consulter votre panier.

                        <br /><br />

                        <a href="/panier">Voir le panier</a>
                        &bull;
                        <a href="/products">Continuer</a>
                    </p>
                </div>
            </div>
        {/if}

        <div class="page">
            <div class="product">
                <div class="info">
                    <button class="name" on:click={() => history.back()}>
                        <div class="icon">
                            <Fa icon={faArrowLeft} />
                        </div>
                        {product.name}
                    </button>
                    <p class="subtext">
                        {modelShapes[product.shape]} | {modelCategories[
                            product.category
                        ]}
                    </p>

                    <p class="description">{product.description}</p>
                    <p class="subsubtext">
                        &times; ({product.models.length}) - {product.models
                            .map((model) => model.name)
                            .join(", ")}
                    </p>
                    {#if order.price}
                        <p class="pricing">
                            Coût de la commande &horbar;

                            <span class="price">
                                {#if order.price}
                                    {order.price} DA
                                {:else}
                                    ? DA
                                {/if}
                            </span>
                        </p>
                    {/if}
                </div>

                <div class="actions">
                    {#if product.models.length > 1}
                        <div class="step">
                            <p>* Choisissez la version de votre papier peint</p>

                            <div class="choices">
                                {#each product.models as model, index}
                                    <div
                                        class="choice"
                                        on:click={() => (currentModel = index)}
                                        class:active={currentModel === index}
                                    >
                                        <div class="id">
                                            {model.id}.
                                        </div>

                                        <div class="name">
                                            {model.name}
                                        </div>

                                        <div
                                            class="check"
                                            style={`opacity: ${currentModel === index ? 1 : 0}`}
                                        >
                                            <Fa icon={faCheck} />
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <div class="step">
                        <p>
                            * Choisissez les dimensions de votre papier peint
                            <br />
                            {#if order.width && order.height}
                                <small>
                                    Dimentions Finales: {order.width}cm &times; {order.height}cm
                                </small>
                            {/if}
                        </p>
                        <p class="notice">
                            Remarque* On rajoute (2.5cm) de chaque coté par
                            mesure de précaution.
                        </p>

                        <div class="dimentions">
                            <Input
                                type="number"
                                placeholder="LARGEUR (cm) *"
                                errorMessage="La largeur doit être supérieure à 0 cm."
                                bind:value={width}
                                verify={(value) =>
                                    value > 0 &&
                                    value < $configuration.maxWidth}
                                icon={faLeftRight}
                                transform={(value) => {
                                    value = value
                                        .toString()
                                        .replaceAll(",", ".")
                                        .replace(/[^0-9.]/g, "");

                                    if (value.includes(".")) {
                                        value = value.split(".");
                                        value =
                                            value[0] +
                                            "." +
                                            value[value.length - 1].slice(0, 2);
                                    }

                                    return value;
                                }}
                            />

                            <Input
                                type="number"
                                placeholder="HAUTEUR (cm) *"
                                errorMessage="La hauteur doit être inférieure à 0cm."
                                verify={(value) => value > 0}
                                bind:value={height}
                                icon={faUpDown}
                                transform={(value) => {
                                    value = value
                                        .toString()
                                        .replaceAll(",", ".")
                                        .replace(/[^0-9.]/g, "");

                                    if (value.includes(".")) {
                                        value = value.split(".");
                                        value =
                                            value[0] +
                                            "." +
                                            value[value.length - 1].slice(0, 2);
                                    }

                                    return value;
                                }}
                            />
                        </div>
                    </div>

                    {#if product.shape === "pano"}
                        <div class="step">
                            <p>* Redimensionnez votre papier peint</p>

                            {#key (order.aspectRatio, realAspectRatio)}
                                <div
                                    class="resize"
                                    use:tippy={{
                                        zIndex:
                                            order.aspectRatio ===
                                            realAspectRatio
                                                ? 2
                                                : -1,
                                        placement: "bottom",
                                        arrow: true,
                                        animation: "perspective",
                                        content:
                                            "Les dimensions remplissent déjà le papier peint.",
                                    }}
                                >
                                    <Button
                                        title={order.aspectRatio ===
                                        realAspectRatio
                                            ? "Redémissionnement impossible"
                                            : "Redimensionner"}
                                        onClick={() => openCropMenu()}
                                        icon={faCrop}
                                        background="var(--sub)"
                                        color="var(--secondary)"
                                        disabled={done ||
                                            order.aspectRatio ===
                                                realAspectRatio}
                                    />
                                </div>
                            {/key}
                        </div>
                    {/if}

                    <div class="step">
                        <p>* Choisissez le matériau de votre papier peint</p>

                        <Choose
                            choices={materials}
                            bind:choice={order.material}
                            base={Object.keys(materials)[0]}
                            name=""
                        />

                        <!-- order preview -->
                        {order.width / 100}m &times; {order.height / 100}m
                        &times; {$configuration.price[order.material]}DA ({order.material})
                        =
                        {order.price} DA
                    </div>

                    <div class="finish">
                        <div class="line">
                            <p>
                                Disponible &nbsp; <Fa icon={faCheck} />
                            </p>

                            <p class="total">
                                TOTAL <span class="price">{order.price} DA</span
                                >
                            </p>
                        </div>

                        <Button
                            disabled={!order.price || done}
                            icon={faCartPlus}
                            title="Commander (Sur mesure)"
                            onClick={() => checkOrder()}
                        />
                    </div>
                </div>
            </div>

            <div class="visual-wrapper">
                <div class="shootings-wrapper">
                    <div class="shootings">
                        {#key currentModel}
                            <Carousel
                                bind:this={carousel}
                                arrows={false}
                                autoplay={product.models[currentModel].shootings
                                    .length > 1}
                                dots={product.models[currentModel].shootings
                                    .length > 1}
                                autoplayProgressVisible={product.models[
                                    currentModel
                                ].shootings.length > 1}
                                autoplayDuration={8000}
                            >
                                {#each product.models[currentModel].shootings as shooting}
                                    <div class="shooting" transition:fade>
                                        <img
                                            src={shooting.image}
                                            alt={shooting.id}
                                            transition:scale
                                        />
                                    </div>
                                {/each}
                            </Carousel>
                        {/key}
                    </div>

                    <div class="controls">
                        <Button
                            icon={faArrowLeft}
                            title=""
                            disabled={product.models[currentModel].shootings
                                .length < 2}
                            onClick={() => showPrevPage()}
                        />

                        <Button
                            icon={faArrowRight}
                            title=""
                            disabled={product.models[currentModel].shootings
                                .length < 2}
                            onClick={() => showNextPage()}
                        />
                    </div>
                </div>

                {#if product.shape !== "pattern"}
                    <h2>Choisissez votre cadrage</h2>
                {/if}

                <div class="visual">
                    {#key $isMobile}
                        <div
                            class="image"
                            bind:this={imageFrame}
                            use:svelteTilt={{
                                startX: $isMobile ? 0 : MAX_X,
                                speed: 1000,
                                max: $isMobile ? 0 : MAX_X,
                                glare: !$isMobile && MAX_X,
                            }}
                        >
                            {#if product.shape === "pano"}
                                <Image
                                    src={product.models.map(
                                        (model) => model.image,
                                    )}
                                    i={currentModel}
                                    adapt
                                    bind:crop={imageCrop}
                                    dimensions={{
                                        width: order.width,
                                        height: order.height,
                                    }}
                                    onClick={() => openCropMenu()}
                                />
                            {:else if product.shape === "pattern"}
                                <Image
                                    src={product.models.map(
                                        (model) => model.image,
                                    )}
                                    i={currentModel}
                                    adapt
                                />
                            {/if}
                        </div>
                    {/key}

                    <div class="sub-images">
                        {#each product.models as model, index}
                            <button
                                class="sub-image"
                                on:click={() => (currentModel = index)}
                                class:active={currentModel === index}
                            >
                                <img src={model.image} alt={model.name} />
                            </button>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </main>
</Page>

<style>
    .shootings-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .controls > :global(*) {
        width: 100%;
    }

    .shootings {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .shooting {
        flex-grow: 1;
        object-fit: cover;

        border-radius: 0.8rem;
        overflow: hidden;

        /* inner shadow */
    }

    .shooting img {
        width: 100%;
    }

    :root {
        --g: 0.5rem;
    }

    main {
        position: relative;
    }

    .done {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;

        padding-top: 5rem;

        z-index: 999;

        background-color: rgba(255, 255, 255, 0.849);
    }

    .content-done {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }

    .line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .total {
        text-align: right;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        align-items: center;
    }

    .total .price {
        font-size: 2rem;
    }

    .notice {
        font-size: 0.8rem;
    }

    .resize {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .resize > :global(*) {
        width: 100%;
    }

    .cropper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        overflow: hidden;

        z-index: 99999999999;
    }

    .cropper .validate {
        position: fixed;
        bottom: 1rem;
        left: 1rem;

        background-color: var(--sub);
        color: var(--secondary);

        border: none;
        border-radius: 50%;

        padding: 0.5rem;

        width: 80px;
        aspect-ratio: 1 / 1;
        font-size: 1.5rem;

        cursor: var(--cursor-pointer);
    }

    .pricing {
        text-transform: uppercase;
        font-size: 1rem;
    }

    .price {
        color: rgb(29, 180, 42);
    }

    .finish {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .dimentions {
        display: flex;
        gap: var(--g);
        width: 100%;
    }

    .choices {
        display: flex;
        flex-direction: row;
        gap: var(--g);

        width: 100%;
    }

    .choices > * {
        flex-grow: 1;
    }

    .choice {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;
        background-color: var(--sub);
        width: fit-content;

        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;

        text-transform: uppercase;

        cursor: var(--cursor-pointer);
        transition: all var(--animation-duration) ease;
    }

    .choice.active {
        background-color: var(--secondary);
        color: var(--sub);
    }

    .choice .name {
        cursor: var(--cursor-pointer);
        font-size: 0.8rem;
    }

    .dimentions > :global(*) {
        flex: 1;
    }

    .actions {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 2.5rem;
    }

    main {
        display: flex;
        justify-content: center;
        gap: 1rem;

        width: 100%;
    }

    main > * {
        flex-grow: 1;
    }

    .action:hover {
        transform: rotate(-360deg);
        background-color: var(--sub);
    }

    .step {
        display: flex;
        flex-direction: column;
        text-align: left;
        gap: 0.5rem;
    }

    .page {
        flex: 1;
        display: flex;
        flex-direction: row;

        gap: 3rem;
        justify-content: space-between;

        width: 100%;
    }

    .product {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        justify-content: start;
        max-width: 60%;
    }

    .description {
        font-size: 1.1rem;
        font-weight: 300;

        text-align: justify;
    }

    .name {
        font-size: 2.5rem;
        font-weight: 300;
        width: fit-content;
        text-transform: uppercase;

        display: flex;
        align-items: center;
        gap: 1rem;

        cursor: var(--cursor-pointer);
        border: none;
        background-color: transparent;

        transition: all var(--animation-duration) ease;
    }

    .name .icon {
        transition: all var(--animation-duration) ease;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .name:hover {
        text-decoration: underline;
    }

    .name:hover .icon {
        transform: translateX(-0.5rem);
    }

    .page .subtext {
        font-weight: 300;
        text-transform: uppercase;
    }

    .page .subsubtext {
        font-size: 0.8rem;
        font-weight: 300;
    }

    .visual-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        width: 50%;
    }

    .visual {
        display: flex;
        flex-direction: row;

        gap: 1rem;
    }

    .sub-images {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;

        height: 100%;
    }

    .sub-images button.active {
        /* gloweffect */
        box-shadow: 0 0 10px var(--sub);
        border: 3px solid var(--sub);

        transform: scale(0.9);
        opacity: 0.9;
    }

    .sub-images button {
        width: 50px;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        object-fit: cover;

        border: 1px solid var(--sub);
        background-color: transparent;
        padding: 0;

        transition: all var(--animation-duration) ease;
    }

    .sub-images button img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .image {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: fit-content;

        border: 10px solid var(--sub);
    }

    .image img {
        width: 100%;
    }

    @media screen and (max-width: 965px) {
        .visual-wrapper {
            gap: 3rem;
        }

        .page {
            flex-direction: column-reverse;
            gap: 2rem;
        }

        .visual-wrapper {
            width: 100%;
        }

        .total {
            flex-direction: column;
            gap: 0.5rem;

            font-size: 0.8rem;
        }

        .total .price {
            font-size: 1.5rem;
        }

        .line p:first-child {
            font-size: 0.8rem;
        }

        .visual {
            width: 100%;
            gap: min(5rem, 5%);

            flex-direction: column;
        }

        .image {
            border: 1px solid var(--sub);
        }

        .name {
            font-size: min(2rem, 5vw);
            white-space: nowrap;
        }

        .sub-images {
            flex-direction: row;
            justify-content: center;
        }

        .sub-images button img {
            width: 100%;
            height: 100%;
            max-width: 100px;
            object-fit: cover;
        }

        .product {
            max-width: 100%;
        }
    }

    @media (max-width: 1070px) {
        .choices {
            flex-direction: column;
        }

        .choice {
            width: 100%;
        }
    }
</style>
