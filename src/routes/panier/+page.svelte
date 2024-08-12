<script>
    import Input from "$lib/Components/ui/Input.svelte";
    import Page from "$lib/Components/Page.svelte";
    import Button from "$lib/Components/ui/Button.svelte";
    import { cart, configuration, endpoint, orderID } from "$lib/store";
    import {
        faChain,
        faClockFour,
        faEnvelope,
        faLocation,
        faMapMarker,
        faMapMarkerAlt,
        faPaperPlane,
        faPhone,
        faSadCry,
        faShoppingBag,
        faTrashCan,
        faUser,
    } from "@fortawesome/free-solid-svg-icons";
    import { blur, fade, fly, scale } from "svelte/transition";
    import Fa from "svelte-fa";
    import { onMount } from "svelte";

    let modelCategories = {
        all: "Tous",
        child: "Enfants",
        living: "Salon",
        kitchen: "Cuisine",
        bedroom: "Chambre",
    };

    let materials = {
        rouleau: "En rouleau",
        poster: "Poster",
    };

    let modelShapes = {
        all: "Tous",
        pano: "Panoramique",
        pattern: "Motif",
    };

    let sortBy = {
        name: "Nom",
        date: "Mise en ligne",
        popularity: "Popularité",
    };

    function formatNum(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }

    var calculation = 1231739216.34367;

    function calculatePrice(width, height, material) {
        return (
            Math.ceil(
                ((width / 100) *
                    (height / 100) *
                    $configuration.price[material]) /
                    5,
            ) * 5
        );
    }

    let finalizing = false;

    function commander() {
        if (finalizing) {
            if (
                !info.name ||
                !info.phone ||
                !info.email ||
                !info.address ||
                !info.phone.match(/^\+213[0-9]{9}$/) ||
                !info.email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
            ) {
                alert("Veuillez remplir correctement les champs.");
                return;
            }

            let url = $endpoint + "/order";
            let data = {
                cart: $cart,
                info: info,
            };

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        orderID.set(data.orderID);
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });

                        details = data.details;

                        alert("Commande envoyée avec succès !");
                    } else {
                        alert("Erreur lors de l'envoi de la commande.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert(
                        "Une erreur est survenue, veuillez réessayer plus tard.",
                    );
                });
        } else {
            finalizing = true;
        }
    }

    let info = {
        name: "",
        phone: "",
        email: "",
        address: "",
    };

    $: pending = !!$orderID;
    let details = [];

    onMount(() => {
        if ($orderID) {
            let url = $endpoint + "/check-order";
            try {
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderID: $orderID,
                    }),
                })
                    .then((response) => {
                        if (response.ok) {
                            cart.set([]);
                            return response.json();
                        } else
                            return {
                                pending: false,
                            };
                    })
                    .then((data) => {
                        if (data.pending) {
                            pending = true;
                            details = data.details;
                        } else {
                            cart.set([]);
                            orderID.set(undefined);
                            localStorage.removeItem("orderID");

                            pending = false;
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            } catch (error) {
                pending = false;
                orderID.set(undefined);

                console.error("Error:", error);
            }
        }
    });
</script>

<Page centerX>
    <main>
        {#if $orderID || pending}
            <div class="empty">
                <h1 class="message">
                    <big>
                        <Fa icon={faClockFour} />
                    </big>
                    <span>Envoyé!</span>
                    <small>
                        Nous vous appelerons le plus proche possible, si vous
                        avez des questions, vous pouvez toujours nous

                        <br /><br />
                        <a href="/contact">
                            <Fa icon={faPhone} />
                            Contacter sur cette page
                        </a>
                    </small>

                    <small class="details">
                        <ul>
                            {#each details as detail}
                                <li>{detail}</li>
                            {/each}
                        </ul>
                    </small>

                    <small class="order-id">
                        Votre numéro de commande est: <code>{$orderID}</code>
                    </small>
                </h1>

                <Button
                    url="/products"
                    newTab={false}
                    title="Faire du shopping"
                    icon={faShoppingBag}
                />
            </div>
        {:else if $cart}
            {#if $cart.length === 0}
                <div class="empty">
                    <h1 class="message">
                        <big>
                            <Fa icon={faSadCry} />
                        </big>
                        <br />
                        Votre panier est vide
                    </h1>
                </div>

                <Button
                    url="/products"
                    newTab={false}
                    title="Faire du shopping"
                    icon={faShoppingBag}
                />
            {:else}
                <h1 class="message">
                    Votre panier contient {$cart.length} article{#if $cart.length > 1}s{/if}
                </h1>
            {/if}

            {#each $cart.reverse() as order}
                <div class="order" transition:scale>
                    <div class="info">
                        <div class="rowleft">
                            <div class="model-informations">
                                <h2>
                                    {order.product.name}
                                </h2>
                                <p class="description">
                                    {order.product.description}
                                </p>

                                <p class="material">
                                    <small style="opacity: 0.5">
                                        <u>Matériel</u>: {materials[
                                            order.material
                                        ]}
                                    </small>
                                </p>

                                <div class="dimentions">
                                    <p>
                                        Dimentions : {order.width} &times;
                                        {order.height}
                                        cm
                                    </p>
                                </div>

                                <div class="recadrage">
                                    <p>
                                        <u>Point de recadrage</u>
                                    </p>
                                    <ul>
                                        <li>
                                            X: {order.crop.top.toFixed(2)} cm
                                        </li>
                                        <li>
                                            Y: {order.crop.left.toFixed(2)} cm
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <p class="id">
                                Product ID: {order.id}
                            </p>
                        </div>

                        <div class="rowright">
                            <div class="price">
                                {formatNum(
                                    calculatePrice(
                                        order.width,
                                        order.height,
                                        order.material,
                                    ),
                                )} DA
                            </div>

                            <Button
                                title="Supprimer"
                                icon={faTrashCan}
                                onClick={() =>
                                    cart.update((cart) => {
                                        return cart.filter(
                                            (item) => item.uuid !== order.uuid,
                                        );
                                    })}
                            />
                        </div>
                    </div>

                    <div class="visual">
                        <img
                            src={order.product.models.find(
                                (model) => model.id === order.model,
                            ).image}
                            alt=""
                        />
                    </div>
                </div>
            {/each}

            {#if $cart.length > 0}
                {#if finalizing}
                    <div class="final" transition:scale>
                        <div class="informations">
                            <div class="text">
                                <h2>Encore un seul pas 🎉</h2>
                                <small>
                                    La livraison est gratuite pour les commandes
                                    de plus de 50.000 DA
                                </small>
                            </div>

                            <div class="questions">
                                <div class="question">
                                    <Input
                                        placeholder="Nom & Prénom"
                                        icon={faUser}
                                        transform={(name) =>
                                            name
                                                .replace(/\s+/g, " ")
                                                .trimStart()
                                                .split(" ")
                                                .map(
                                                    (word) =>
                                                        (
                                                            word[0] || ""
                                                        ).toUpperCase() +
                                                        word.slice(1),
                                                )
                                                .join(" ")}
                                        bind:value={info.name}
                                    />
                                </div>

                                <div class="question">
                                    <Input
                                        placeholder="Numéro de téléphone"
                                        icon={faPhone}
                                        type="tel"
                                        transform={(phone) =>
                                            phone
                                                .replace(/\s+/g, "")
                                                .replace(/[^0-9+]/g, "")
                                                .replace(/^0/, "+213 ")}
                                        bind:value={info.phone}
                                    />
                                </div>

                                <div class="question">
                                    <Input
                                        placeholder="Email"
                                        icon={faEnvelope}
                                        verify={(email) =>
                                            !!String(email)
                                                .toLowerCase()
                                                .match(
                                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                )}
                                        transform={(email) =>
                                            email
                                                .trim()
                                                .replace(/\s+/g, "")
                                                .replace(/@+/g, "@")}
                                        bind:value={info.email}
                                    />
                                </div>

                                <div class="question">
                                    <Input
                                        placeholder="Adresse de livraison"
                                        icon={faMapMarkerAlt}
                                        bind:value={info.address}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}

                <div class="total">
                    <h2>
                        Total:
                        {formatNum(
                            $cart.reduce(
                                (acc, order) =>
                                    acc +
                                    calculatePrice(
                                        order.width,
                                        order.height,
                                        order.material,
                                    ),
                                0,
                            ),
                        )}
                        DA
                    </h2>
                </div>

                <div class="finalstep">
                    <Button
                        title={finalizing
                            ? "Confirmer 🥳"
                            : "Finaliser la commande"}
                        onClick={commander}
                    />
                </div>
            {/if}
        {/if}
    </main>
</Page>

<style>
    :root {
        --order-height: 10rem;
        --order-padding: 1rem;
    }

    .empty {
        min-height: calc(100vh - var(--nav-height) - var(--page-padding));

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        gap: 1.5rem;
    }

    .empty .message {
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .message small {
        font-size: 1.2rem;
    }

    .order-id {
        font-size: 1rem !important;
    }

    .order-id code {
        font-family: Consolas, monospace;
        background-color: var(--sub);
        padding: 0.2rem 0.5rem;
        border-radius: 0.2rem;
        letter-spacing: 0.1rem;
    }

    .empty .message big {
        font-size: 3rem;
    }

    .final {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        text-align: center;

        max-width: var(--inner-maxw);
    }

    .questions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .informations {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        text-align: center;

        max-width: var(--inner-maxw);
    }

    .finalstep {
        display: flex;
        gap: 1rem;
        font-size: 2rem;

        width: 100%;
    }

    .finalstep > :global(*) {
        flex: 1;
    }

    main {
        width: 100%;
        max-width: var(--inner-maxw);
        height: fit-content;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 2rem;
    }

    .order {
        background-color: var(--sub);
        width: 100%;

        display: flex;
        flex-direction: row;

        padding: var(--order-padding);
        min-height: var(--order-height);

        gap: var(--order-padding);
    }

    .order .info {
        flex: 1;
    }

    .info {
        display: flex;
        justify-content: space-between;
    }

    .rowleft {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .rowright {
        display: flex;
        flex-direction: column;
        width: fit-content;
        justify-content: flex-end;
        align-items: center;
    }

    .price {
        font-size: 1.5rem;
        font-weight: bold;
        white-space: nowrap;
        color: rgb(3, 176, 0);
    }

    .visual {
        width: 10rem;
        height: fit-content;
        aspect-ratio: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;

        overflow: hidden;
    }

    .visual img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (max-width: 790px) {
        .order {
            flex-direction: column-reverse;
            gap: 1rem;
        }

        .order .info {
            flex-direction: column;
            gap: 1rem;
        }

        .rowright {
            width: 100%;
            gap: 1rem;
        }

        .rowright > :global(*) {
            width: 100%;
        }

        .visual {
            width: 100%;
            aspect-ratio: 16 / 9;
        }
    }
</style>
