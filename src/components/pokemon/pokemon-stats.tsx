import { Stat } from "@/data/types";

export default function PokemonStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-col p-2 border border-transparent rounded-md bg-red-400">
      <div className="mb-2">
        <h3 className="text-amber-300 font-bold">Stats</h3>
      </div>
      <div>
        {(stats ?? []).map((stat: Stat, index: number) => {
          return (
            <div key={index} className="flex justify-between">
              <p className="text-amber-300 font-medium capitalize">
                {stat?.stat.name}:
              </p>
              <p className="text-white font-medium">{stat?.base_stat}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
