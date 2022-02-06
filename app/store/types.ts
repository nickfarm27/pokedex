export type Move = {
    move: {
        name: string;
    };
    level: number;
};

export type Stat = {
    stat: { name: string };
    base_stat: number;
};

export type Type = {
    type: { name: string };
};

export type AddedPokemon = {
    id: number;
    name: string;
    types: Type[];
};