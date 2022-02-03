type Props = {
    name: string
    level: number;
}

export default function Move(props: Props) {
  return (
    <div className="py-4 px-6 bg-slate-100 rounded min-w-[10rem] hover:bg-slate-200">
        <h1 className="font-semibold mb-2">{props.name}</h1>
        <p className="font-medium text-gray-600">Level {props.level}</p>
    </div>
  );
}