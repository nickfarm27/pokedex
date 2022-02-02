import { gql, GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("https://beta.pokeapi.co/graphql/v1beta")

export const GET_POKEMON_NAMES = gql`
    query queryPokemonNames($searchQuery: String!) {
        pokemon_v2_pokemon(where: {name: {_ilike: searchQuery}}) {
            id
            name
        }
    }
`

export const GET_POKEMON_DETAILS = gql`
    query queryPokemonDetails($id: Int!) {
        pokemon: pokemon_v2_pokemon(where: {id: {_eq: id}}) {
            id
            name
            base_experience
            height
            weight
        }
    }
`