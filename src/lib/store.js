
import { writable } from 'svelte/store';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import cardImage from "$lib/assets/card.jpg";

export let endpoint = writable("https://maisonsdantan.codiha.online");
export let darkMode = writable(false);

export const notification = writable({
    show: true,
    message: 'Livraison partout en Algérie.',
    icon: faShippingFast,
    colors: {
        background: 'black',
        text: 'white'
    }
});

export let configuration = writable({
    maxWidth: Infinity,
    maxHeight: 600,

    securityMargin: 5,

    price: {
        rouleau: 2600,
        poster: 2000,
    },
});

export let cart = writable(undefined);

export const menuOpen = writable(false);

export const orderID = writable(undefined);

export let informations = writable(
    {
        name: "MAISONS D'ANTAN",
        title: "MAISONS D'ANTAN - Modernité du papier peint murale.",
        description:
            "Découvrez une incroyable variété de modèles de papier peint provenant des éditeurs de renom à travers le monde, pour donner une touche unique à votre intérieur.",
        url: "https://maisonsdantan.co",
        image: cardImage,
    }
)
