import { ActionFunction } from "remix";
import { client } from "~/graphql/client";
import { GET_POKEMON_NAMES } from "~/graphql/queries";

export const searchPokemon: ActionFunction = async ( {request} ) => {
    const form = await request.formData()
    const name = form.get("search-bar")

    const data = await client.request(GET_POKEMON_NAMES, { searchQuery: name+"%" })
  
    return { message: JSON.stringify(data.pokemons) };
  };