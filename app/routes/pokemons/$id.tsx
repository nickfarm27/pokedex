import { ActionFunction, LoaderFunction, useLoaderData } from "remix";
import { searchPokemon } from "~/actions/searchPokemon";
import { client } from "~/graphql/client";
import { GET_POKEMON_DETAILS } from "~/graphql/queries";
import NavBar from "~/components/NavBar";
import PokemonDetails from "~/components/pokemon-page/PokemonDetails";

export const action: ActionFunction = searchPokemon;

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const id = parseInt(params.id as string);
        const variables = {
            pokemonId: id,
        };
        const response = await client.request(GET_POKEMON_DETAILS, variables);
        return response;
    } catch (error) {
        return { error: error };
    }
};

export default function Pokemon() {
    const data = useLoaderData();

    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="sm:flex-grow">
                {data.pokemon && data.pokemon[0] ? (
                    <PokemonDetails
                        id={data.pokemon[0].id}
                        name={data.pokemon[0].name}
                        baseExperience={data.pokemon[0].base_experience}
                        height={data.pokemon[0].height}
                        weight={data.pokemon[0].weight}
                        types={data.pokemon[0].types}
                        stats={data.pokemon[0].stats}
                        moves={data.pokemon[0].moves}
                    />
                ) : (
                    <h1 className="h-1/2 w-1/2 mx-auto">No pokemon found</h1>
                )}
            </div>
        </div>
    );
}
