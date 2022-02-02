import { ActionFunction, LoaderFunction, useLoaderData } from "remix";
import { searchPokemon } from "~/actions/searchPokemon";
import NavBar from "~/components/NavBar";
import { client } from "~/graphql/client";
import { GET_POKEMON_DETAILS } from "~/graphql/queries";

export const action: ActionFunction = searchPokemon

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const id = parseInt(params.id as string)
        const variables = {
            pokemonId: id
        }
        const data = await client.request(GET_POKEMON_DETAILS, variables)
        return JSON.stringify(data)
    } catch (error) {
        return JSON.stringify(error)
    }
};

export default function Pokemon() {
    const data = useLoaderData();
    return (
        <>
            <NavBar />
            {data}
        </>
    );
}
