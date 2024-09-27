import { endpoint } from '$lib/store';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
// export async function load({ params }) {
//     const products = await fetch(get(endpoint) + "/products?n=100");
//     let data = await products.json();

//     if (data) {
//         return {
//             products: data
//         };
//     }

//     error(404, 'Not found');
// }
