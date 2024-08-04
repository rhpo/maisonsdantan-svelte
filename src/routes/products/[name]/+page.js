export async function load({ params }) {

    if (!params.name)
        return {
            name: params.name || 'Unknown'
        }

    throw ("404 Error");
}
