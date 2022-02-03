import { ActionFunction, LoaderFunction, useLoaderData } from "remix";
import { searchPokemon } from "~/actions/searchPokemon";
import Colors from "~/components/Colors";
import NavBar from "~/components/NavBar";
import { capitalizeName } from "~/components/SearchBar";
import Tabs from "~/components/Tabs";
import TypeBadges from "~/components/TypeBadges";
import { client } from "~/graphql/client";
import { GET_POKEMON_DETAILS } from "~/graphql/queries";

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
    // const name = data.pokemon?

    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="flex-grow">
                {data.pokemon && data.pokemon[0] ? (
                    <>
                        <div className="h-1/2 w-3/6 mx-auto bg-slate-2 flex">
                            <div className="w-2/5 text-center flex flex-col justify-evenly items-center">
                                <h1 className="font-semibold text-3xl my-4">
                                    {capitalizeName(data.pokemon[0].name)}
                                </h1>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.pokemon[0].id}.png`}
                                    alt={capitalizeName(data.pokemon[0].name)}
                                    className="w-4/5"
                                />
                            </div>
                            <div className="w-3/5 flex flex-col justify-end pl-6">
                                <div className="">
                                    <Colors />
                                    {data.pokemon[0].types.map(
                                        (type: { type: { name: string } }) => (
                                            <TypeBadges
                                                type={type.type.name}
                                                key={type.type.name}
                                            />
                                        )
                                    )}
                                </div>
                                <div className="flex py-8 rounded-lg">
                                    <div className="w-1/2 font-medium">
                                        <p className="my-1">Base Experience</p>
                                        <p className="my-1">Height</p>
                                        <p className="my-1">Weight</p>
                                    </div>
                                    <div className="font-semibold w-1/2">
                                        <p className="my-1">
                                            {data.pokemon[0].base_experience}
                                        </p>
                                        <p className="my-1">
                                            {data.pokemon[0].height / 10 + " m"}
                                        </p>
                                        <p className="my-1">
                                            {data.pokemon[0].weight / 10 +
                                                " kg"}
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <button
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add To Pokedex
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/2 w-1/2 mx-auto flex flex-col">
                            <Tabs stats={data.pokemon[0].stats} moves={data.pokemon[0].moves} />
                        </div>
                    </>
                ) : (
                    <h1 className="h-1/2 w-1/2 mx-auto">No pokemon found</h1>
                )}
            </div>
            {/* <h1>{JSON.stringify(data.pokemon[0])}</h1> */}
        </div>
    );
}
