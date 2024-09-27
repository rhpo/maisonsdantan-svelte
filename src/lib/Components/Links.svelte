<script>
    import dromadaire from "$lib/assets/icons/dromadaire.svg";
    import palmier from "$lib/assets/icons/palmier.svg";
    import Link from "$lib/Components/Link.svelte";
    import { cart } from "$lib/store";

    export let mobile = false;

    import {
        faHome,
        faPhone,
        faShoppingBag,
    } from "@fortawesome/free-solid-svg-icons";
</script>

<Link
    url="/"
    icon={faHome}
    name="Home"
    description="Accéder à la page d'acceuil."
    inline={mobile}
/>
<Link
    url="/products"
    icon={faShoppingBag}
    name="Produits"
    description="Découvrir diverts produits et papiers peints."
    inline={mobile}
/>
<Link
    url="/contact"
    icon={faPhone}
    name="Contact"
    description="Contacter nous vers E-Mail ou numéro de téléphone."
    inline={mobile}
/>

<br />
<br />

{#if mobile}
    {#if $cart}
        <Link
            url="/panier"
            icon={dromadaire}
            inline={mobile}
            name="Panier {$cart.length > 0 ? ` (${$cart.length})` : ``}"
            description="Voir votre panier et vos achats en cours."
        />
    {/if}

    <Link
        url="/guide/catalogue"
        icon={palmier}
        inline={mobile}
        name="Catalogue"
        description="Voir les produits disponibles."
    />
{/if}

<!-- Compare this snippet from src/lib/Components/Link.svelte: -->
