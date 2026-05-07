import { PokemonLocalized } from "@/data/types";
import PokemonImageCard from "../../pokemon-image-card";
import { m } from "@/paraglide/messages";

export interface PokemonEvolutionChainProps {
  evolutions: PokemonLocalized[];
}

export default function PokemonEvolutionChain({
  evolutions,
}: PokemonEvolutionChainProps) {
  return (
    <div className="flex-col items-center justify-between w-full">
      <h3 className="flex justify-center text-amber-300 font-bold w-full">
        {m.evolutions_chain_title()}
      </h3>
      <div className="flex items-center justify-between w-full mt-4">
        {evolutions.map((evolution, index) => (
          <PokemonImageCard
            key={`${evolution.name}-${index}`}
            pokemon={evolution}
          />
        ))}
      </div>
    </div>
  );
}
