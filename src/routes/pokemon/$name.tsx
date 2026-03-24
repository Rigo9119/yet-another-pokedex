import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Ability, PokemonType, Stat } from "@/data/types";
import { CircleArrowLeft } from "lucide-react";
import PokemonImage from "@/components/pokemon/pokemon-image";
import PokemonTypeAbility from "@/components/pokemon/pokemon-type-ability";
import PokemonIndividualSpec from "@/components/pokemon/pokemon-individual-spec";
import PokemonStats from "@/components/pokemon/pokemon-stats";
import { m } from "@/paraglide/messages";
import usePokemonData from "@/hooks/usePokemonData";

export const Route = createFileRoute("/pokemon/$name")({
  component: PokemonPage,
});

function PokemonPage() {
  const { name } = Route.useParams();
  const { isLoading, isError, pokemon } = usePokemonData(name);

  const memoizeStats = useMemo(() => pokemon?.stats, [pokemon?.stats]);
  const memoizedAbilities = useMemo(
    () => pokemon?.abilities,
    [pokemon?.abilities],
  );
  const memoizedTypes = useMemo(() => pokemon?.types, [pokemon?.types]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!pokemon) return <div>Pokemon not found</div>;

  return (
    <div className="flex flex-col content-center gap-4 min-h-screen bg-red-600 p-4">
      <div className="flex justify-between content-center border border-transparent rounded-md  bg-red-400 p-2">
        <Link to={"/" as string} className="flex items-center text-white w-1/4">
          <CircleArrowLeft />
        </Link>
        <h2 className="font-black capitalize text-amber-300 py-2 pl-10 w-3/4">
          {pokemon.localized_name}
        </h2>
      </div>
      <PokemonImage
        frontAlt={pokemon.name as string}
        frontSrc={pokemon.sprites.front_default as string}
        backAlt={pokemon.name as string}
        backSrc={pokemon.sprites.back_default as string}
      />
      <PokemonTypeAbility
        title={m.types_title()}
        listItems={memoizedTypes as PokemonType[]}
      />
      <div className="flex gap-2 justify-between w-full">
        <PokemonIndividualSpec
          specTitle={m.id_title()}
          specData={pokemon.id as number}
        />
        <PokemonIndividualSpec
          specTitle={m.weight_title()}
          specData={pokemon.weight as number}
        />
        <PokemonIndividualSpec
          specTitle={m.height_title()}
          specData={pokemon.height as number}
        />
      </div>
      <PokemonTypeAbility
        title={m.abilities_title()}
        listItems={memoizedAbilities as Ability[]}
      />
      <PokemonStats stats={memoizeStats as Stat[]} />
    </div>
  );
}
