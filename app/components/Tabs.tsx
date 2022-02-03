import Move from "./Move";
import { capitalizeName } from "./SearchBar";
import Stat from "./Stat";

type Move = {
    move: {
        name: string;
    };
    level: number;
};

type Stat = {
    stat: { name: string };
    base_stat: number;
};

type Props = {
    stats: Stat[];
    moves: Move[];
};

function compare(a: Move, b: Move) {
    if (a.level < b.level) return -1;
    if (a.level > b.level) return 1;
    return 0;
}

export default function Tabs(props: Props) {
    // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects?rq=1
    const maxStatValue = Math.max.apply(
        Math,
        props.stats.map(function (stat) {
            return stat.base_stat;
        })
    );

    const stats = props.stats;
    const moves = props.moves;

    return (
        <>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul
                    className="flex flex-wrap -mb-px"
                    id="tabs"
                    data-tabs-toggle="#tabContent"
                    role="tablist"
                >
                    <li className="mr-2" role="presentation">
                        <button
                            className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 active"
                            id="stats-tab"
                            data-tabs-target="#stats"
                            type="button"
                            role="tab"
                            aria-controls="stats"
                            aria-selected="true"
                        >
                            Stats
                        </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            className="inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                            id="moves-tab"
                            data-tabs-target="#moves"
                            type="button"
                            role="tab"
                            aria-controls="moves"
                            aria-selected="false"
                        >
                            Moves
                        </button>
                    </li>
                </ul>
            </div>
            <div id="tabContent" className="">
                <div
                    className="px-4 pb-2 overflow-y-auto h-[35vh]"
                    id="stats"
                    role="tabpanel"
                    aria-labelledby="stats-tab"
                >
                    {stats.map((stat) => (
                        <Stat
                            key={stat.stat.name}
                            name={capitalizeName(stat.stat.name)}
                            baseStat={stat.base_stat}
                            maxStatValue={maxStatValue}
                        />
                    ))}
                </div>
                <div
                    className="hidden"
                    id="moves"
                    role="tabpanel"
                    aria-labelledby="moves-tab"
                >
                    <div className="flex flex-wrap flex-col overflow-x-auto max-h-[35vh] gap-4 pb-4">
                        {moves.sort(compare).map((move) => (
                            <Move
                                name={capitalizeName(move.move.name)}
                                level={move.level}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}