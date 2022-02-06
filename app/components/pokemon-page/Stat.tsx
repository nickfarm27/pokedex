type Props = {
    name: string;
    baseStat: number;
    maxStatValue: number;
};

export default function (props: Props) {
    return (
        <div className="flex items-center py-2 min-h-[3.5rem] sm:min-h-0">
            <p className="w-2/5 font-medium text-gray-600">{props.name}</p>
            <p className="w-1/4 text-center font-semibold text-gray-600">{props.baseStat}</p>
            <div className="w-full">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                            width:
                                (props.baseStat * 100) / props.maxStatValue +
                                "%",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
