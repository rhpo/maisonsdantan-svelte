<script>
	import Products from "$lib/Pages/Products/Products.svelte";
	import { cart, orderID } from "$lib/store.js";

	export let data;

	function uuid() {
		return Math.random().toString(36).substring(2);
	}

	function onOrder(order) {
		if ($orderID && $orderID !== "undefined") {
			orderID.set(undefined);
			cart.set([]);
		}

		cart.update((value) => {
			order.uuid = uuid();
			value.push(order);
			return value;
		});
	}
</script>

<Products {data} {onOrder} />
