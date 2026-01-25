import { Pokemon } from "@/data/types";
import { Link } from "@tanstack/react-router";

export interface PokemonImageCardProps {
  pokemon: Pokemon;
}

export default function PokemonImageCard({ pokemon }: PokemonImageCardProps) {
  const imageSrc = pokemon?.sprites?.front_default as unknown as string;

  return (
    <Link
      to={`/pokemon/${pokemon?.name}` as string}
      className="flex flex-col gap-2 bg-white border border-transparent rounded-md"
    >
      <div className="flex justify-center content-center bg-white">
        <img className="w-full" src={imageSrc} alt={pokemon?.name} />
      </div>
      <div className="flex justify-center content-center border border-transparent rounded-md  bg-red-400">
        <h3 className="text-white">{pokemon?.name}</h3>
      </div>
    </Link>
  );
}
