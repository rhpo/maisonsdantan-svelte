export async function load({ params }) {

    if (!params.name)
        return {
            name: 'Unknown'
        }

    return {
        name: params.name
    }

}
