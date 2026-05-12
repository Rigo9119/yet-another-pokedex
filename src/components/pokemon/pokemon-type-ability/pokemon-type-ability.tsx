import { memo } from "react";
import { Ability, PokemonType } from "@/data/types";

export interface PokemonTypeAbilityProps {
  title: string;
  listItems: PokemonType[] | Ability[];
}

function PokemonTypeAbility({ title, listItems }: PokemonTypeAbilityProps) {
  return (
    <div className="flex flex-col p-2 border border-transparent rounded-md bg-red-400">
      <h3 className="flex justify-center text-amber-300 font-bold w-full">
        {title}
      </h3>
      <div className="flex content-center justify-between">
        {listItems?.map((item: PokemonType | Ability, index: number) => (
          <p className="text-white capitalize" key={index}>
            {"type" in item
              ? (item.type.name as string)
              : (item.ability.name as string)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default memo(PokemonTypeAbility);
