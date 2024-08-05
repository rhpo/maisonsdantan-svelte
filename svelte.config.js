import adapter from '@sveltejs/adapter-auto';
import svelte_preprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},

	optimizeDeps: {
		exclude: ['svelte-hamburgers', 'svelte-fa', 'svelte-pdf']
	},

	preprocess: [
		svelte_preprocess({
			postcss: {
				plugins: [autoprefixer()]
			}
		})
	]
};

export default config;
