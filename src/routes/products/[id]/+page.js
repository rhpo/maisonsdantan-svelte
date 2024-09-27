import { endpoint } from '$lib/store.js';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ params }) {

    const { id } = params;

    let response = await
        fetch(get(endpoint) + "/product?id=" + encodeURIComponent(id));

    if (response.ok) {
        const data = await response.json();
        return {
            product: data
        };
    } else {
        console.clear();
        console.log(response)
        return error(response.status, await response.text());
    }

}
