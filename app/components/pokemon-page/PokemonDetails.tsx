import { useEffect, useState } from "react";
import { capitalizeName } from "~/store/functions";
import { AddedPokemon, Move, Stat, Type } from "~/store/types";
import Colors from "../Colors";
import TypeBadges from "../TypeBadges";
import Tabs from "./Tabs";

type Props = {
    id: number;
    name: string;
    baseExperience: number;
    height: number;
    weight: number;
    types: Type[];
    stats: Stat[];
    moves: Move[];
};

export default function PokemonDetails(props: Props) {
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const pokemonsJson = localStorage.getItem("pokemons");

        if (pokemonsJson) {
            const pokemons: AddedPokemon[] = JSON.parse(pokemonsJson);
            const foundPokemon = pokemons.filter(
                (pokemon) => pokemon.id === props.id
            );
            if (foundPokemon.length) {
                setAdded(true);
            } else {
                setAdded(false);
            }
        }
    }, [added, props.id]);

    function addToCollection() {
        const pokemonsJson = localStorage.getItem("pokemons");

        const newPokemon = {
            id: props.id,
            name: props.name,
            types: props.types,
        };

        let pokemons: AddedPokemon[] = JSON.parse(
            pokemonsJson ? pokemonsJson : "[]"
        );
        pokemons = [...pokemons, newPokemon];
        localStorage.setItem("pokemons", JSON.stringify(pokemons));

        setAdded(true);
    }

    function removeFromCollection() {
        const pokemonsJson = localStorage.getItem("pokemons");

        let pokemons: AddedPokemon[] = JSON.parse(
            pokemonsJson ? pokemonsJson : "[]"
        );
        pokemons = pokemons.filter((pokemon) => pokemon.id !== props.id);
        localStorage.setItem("pokemons", JSON.stringify(pokemons));

        setAdded(false);
    }

    return (
        <>
            <div className="sm:h-1/2 w-11/12 mx-auto flex flex-col sm:flex-row sm:w-3/4 lg:w-3/5 xl:w-1/2">
                <div className="w-full sm:w-2/5 text-center flex flex-col justify-evenly items-center py-10">
                    <h1 className="font-semibold text-3xl">
                        {capitalizeName(props.name)}
                    </h1>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
                        alt={capitalizeName(props.name)}
                        className="sm:h-full min-w-[70%] object-cover"
                    />
                </div>
                <div className="w-full sm:w-3/5 flex flex-col justify-between sm:pl-6 sm:py-10 text-center sm:text-left">
                    <div className="flex justify-center sm:justify-start">
                        <Colors />
                        {props.types.map((type) => (
                            <TypeBadges
                                key={type.type.name}
                                type={type.type.name}
                            />
                        ))}
                    </div>
                    <div className="my-6 sm:my-0">
                        <div className="my-2 sm:my-1 flex items-center">
                            <p className="w-1/2 font-medium">Base Experience</p>
                            <p className="w-1/2 font-semibold">
                                {props.baseExperience}
                            </p>
                        </div>
                        <div className="my-2 sm:my-1 flex items-center">
                            <p className="w-1/2 font-medium">Height</p>
                            <p className="w-1/2 font-semibold">
                                {props.height / 10 + " m"}
                            </p>
                        </div>
                        <div className="my-2 sm:my-1 flex items-center">
                            <p className="w-1/2 font-medium">Weight</p>
                            <p className="w-1/2 font-semibold">
                                {props.weight / 10 + " kg"}
                            </p>
                        </div>
                    </div>
                    <div className="mb-6 sm:mb-0">
                        {added ? (
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={removeFromCollection}
                            >
                                Remove From Collection
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={addToCollection}
                            >
                                Add To Collection
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="sm:h-1/2 w-11/12 mx-auto flex flex-col sm:w-3/4 lg:w-3/5 xl:w-1/2">
                <Tabs stats={props.stats} moves={props.moves} />
            </div>
        </>
    );
}
