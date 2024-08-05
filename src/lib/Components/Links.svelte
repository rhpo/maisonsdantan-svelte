<script>
    import Link from "$lib/components/Link.svelte";

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
