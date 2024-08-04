import { writable } from 'svelte/store';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';

export const notification = writable({
    show: true,
    message: 'Livraison disponible sur tout le téritoire national est gratuit à partir de 30.000 DA d\'achat.',
    icon: faShippingFast,
    colors: {
        background: 'black',
        text: 'white'
    }
});
