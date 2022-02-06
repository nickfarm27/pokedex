import React, { useEffect, useState } from "react";
import { ActionFunction } from "remix";
import { searchPokemon } from "~/actions/searchPokemon";
import Pokemon from "~/components/home-page/Pokemon";
import NavBar from "~/components/NavBar";
import { AddedPokemon } from "~/store/types";

export const action: ActionFunction = searchPokemon;

export default function Index() {
    const [pokemonList, setPokemonList] = useState<AddedPokemon[]>([]);

    useEffect(() => {
        const pokemonsJson = localStorage.getItem("pokemons");
        let pokemons: AddedPokemon[] = JSON.parse(
            pokemonsJson ? pokemonsJson : "[]"
        );
        setPokemonList(pokemons);
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <h1 className="text-center font-semibold text-2xl mt-4">Pokemon Owned</h1>
            {pokemonList.length ? (
                <div className="w-11/12 mx-auto my-4 flex-grow overflow-y-auto sm:w-3/4 lg:w-3/5 xl:w-1/2">
                    {pokemonList.map((pokemon) => (
                        <Pokemon
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                            types={pokemon.types}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex justify-center items-center">
                    <h1 className="font-medium">None</h1>
                </div>
            )}
        </div>
    );
}
