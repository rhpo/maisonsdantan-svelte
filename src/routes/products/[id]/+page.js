import { endpoint } from '$lib/store.js';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ params }) {
    const { id } = params;

    try {
        let response = await fetch(get(endpoint) + "/product?id=" + encodeURIComponent(id), {
            method: "GET",
            headers: {
            }
        });

        if (response.ok) {
            try {
                const data = await response.json();
                return {
                    product: data
                };
            } catch (err) {
                return error(500, "Failed to parse JSON response");
            }
        } else {
            return error(response.status, "Site en maintenance!");
        }
    } catch (err) {
        return error(500, "Site en maintenance!");
    }
}
