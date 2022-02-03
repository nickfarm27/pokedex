type Props = {
    type: string;
};

export default function TypeBadges(props: Props) {
    const colors = {
        normal: "gray",
        fighting: "red",
        flying: "teal",
        poison: "violet",
        ground: "amber",
        rock: "stone",
        bug: "lime",
        ghost: "indigo",
        steel: "zinc",
        fire: "orange",
        water: "sky",
        grass: "green",
        electric: "yellow",
        psychic: "rose",
        ice: "cyan",
        dragon: "blue",
        dark: "stone",
        fairy: "pink",
    };
    const colorType = colors[props.type as keyof typeof colors];

    return (
        <span
            className={`bg-${colorType}-100 text-${colorType}-800 text-sm font-medium mr-2 px-4 py-1.5 rounded-full border-2 border-${colorType}-800`}
        >
            {props.type.toUpperCase()}
        </span>
    );
}
