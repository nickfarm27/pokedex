import { Link } from "remix";
import { capitalizeName } from "~/store/functions";
import { Type } from "~/store/types";
import TypeBadges from "../TypeBadges";

type Props = {
    id: number;
    name: string;
    types: Type[];
};

export default function Pokemon(props: Props) {
    return (
        <Link
            to={`/pokemons/${props.id}`}
            className="flex p-2 bg-slate-50 border-2 border-slate-300 items-center overflow-auto border-b-0 last:border-b-2"
        >
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
                alt={capitalizeName(props.name)}
                className="mr-4"
            />
            <div className="flex flex-col h-20 justify-evenly">
                <h1 className="font-medium">{capitalizeName(props.name)}</h1>
                <div className="flex">
                    {props.types.map((type) => (
                        <TypeBadges
                            key={type.type.name}
                            type={type.type.name}
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
}
