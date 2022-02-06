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
                setAdded(false)
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

        setAdded(true)
    }

    function removeFromCollection() {
        const pokemonsJson = localStorage.getItem("pokemons");

        let pokemons: AddedPokemon[] = JSON.parse(
            pokemonsJson ? pokemonsJson : "[]"
        );
        pokemons = pokemons.filter((pokemon) => pokemon.id !== props.id)
        localStorage.setItem("pokemons", JSON.stringify(pokemons));

        setAdded(false)
    }

    return (
        <>
            <div className="h-1/2 w-3/6 mx-auto flex">
                <div className="w-2/5 text-center flex flex-col justify-evenly items-center">
                    <h1 className="font-semibold text-3xl my-4">
                        {capitalizeName(props.name)}
                    </h1>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
                        alt={capitalizeName(props.name)}
                        className="w-4/5"
                    />
                </div>
                <div className="w-3/5 flex flex-col justify-end pl-6">
                    <div className="">
                        <Colors />
                        {props.types.map((type) => (
                            <TypeBadges
                                key={type.type.name}
                                type={type.type.name}
                            />
                        ))}
                    </div>
                    <div className="flex py-8 rounded-lg">
                        <div className="w-1/2 font-medium">
                            <p className="my-1">Base Experience</p>
                            <p className="my-1">Height</p>
                            <p className="my-1">Weight</p>
                        </div>
                        <div className="font-semibold w-1/2">
                            <p className="my-1">{props.baseExperience}</p>
                            <p className="my-1">{props.height / 10 + " m"}</p>
                            <p className="my-1">{props.weight / 10 + " kg"}</p>
                        </div>
                    </div>
                    <div className="mb-8">
                        {added ? (
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={removeFromCollection}
                            >
                                Remove From Collection
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={addToCollection}
                            >
                                Add To Collection
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="h-1/2 w-1/2 mx-auto flex flex-col">
                <Tabs stats={props.stats} moves={props.moves} />
            </div>
        </>
    );
}
