import { gql } from "graphql-request";

export const GET_POKEMON_NAMES = gql`
    query PokemonNamesQuery($searchQuery: String!) {
        pokemons: pokemon_v2_pokemon(where: {name: {_ilike: $searchQuery}}) {
            id
            name
        }
    }
`

export const GET_POKEMON_DETAILS = gql`
    query PokemonDetailsQuery($pokemonId: Int!) {
        pokemon: pokemon_v2_pokemon(where: {id: {_eq: $pokemonId}}) {
            name
            base_experience
        }
    }
`