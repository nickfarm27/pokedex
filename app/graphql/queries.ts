import { gql } from "graphql-request";

export const GET_POKEMON_NAMES = gql`
    query PokemonNamesQuery($searchQuery: String!) {
        pokemons: pokemon_v2_pokemon(
            where: { name: { _ilike: $searchQuery } }
        ) {
            id
            name
        }
    }
`;

export const GET_POKEMON_DETAILS = gql`
    query PokemonDetailsQuery($pokemonId: Int!) {
        pokemon: pokemon_v2_pokemon(where: { id: { _eq: $pokemonId } }) {
            id
            name
            base_experience
            height
            weight
            types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                    name
                }
            }
            stats: pokemon_v2_pokemonstats {
                stat: pokemon_v2_stat {
                    name
                }
                base_stat
            }
            moves: pokemon_v2_pokemonmoves(where: {level: {_gte: 1}}, distinct_on: move_id) {
                move: pokemon_v2_move {
                    name
                }
                level
            }
        }
    }
`;
