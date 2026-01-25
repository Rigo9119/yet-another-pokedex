import { getResourceById } from "@/data/poke-api";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Ability, PokemonType, Stat } from "@/data/types";
import { CircleArrowLeft } from "lucide-react";
import PokemonImage from "@/components/pokemon/pokemon-image";
import PokemonTypeAbility from "@/components/pokemon/pokemon-type-ability";
import PokemonIndividualSpec from "@/components/pokemon/pokemon-individual-spec";
import PokemonStats from "@/components/pokemon/pokemon-stats";

export const Route = createFileRoute("/pokemon/$name")({
  component: PokemonPage,
});

function PokemonPage() {
  const { name } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getResourceById("pokemon", name),
  });

  return (
    <div className="flex flex-col content-center gap-4 min-h-screen bg-red-600 p-4">
      <div className="flex justify-between content-center border border-transparent rounded-md  bg-red-400 p-2">
        <Link to={"/" as string} className="flex items-center text-white w-1/4">
          <CircleArrowLeft />
        </Link>
        <h2 className="font-black capitalize text-amber-300 py-2 pl-10 w-3/4">
          {data?.name}
        </h2>
      </div>
      <PokemonImage
        frontAlt={data?.name as string}
        frontSrc={data?.sprites.front_default as string}
        backAlt={data?.name as string}
        backSrc={data?.sprites.back_default as string}
      />
      <PokemonTypeAbility
        title={(data?.types.length as number) >= 2 ? "Types" : "Type"}
        listItems={data?.types as PokemonType[]}
      />
      <div className="flex gap-2 justify-between w-full">
        <PokemonIndividualSpec specTitle="Id" specData={data?.id as number} />
        <PokemonIndividualSpec
          specTitle="Weight"
          specData={data?.weight as number}
        />
        <PokemonIndividualSpec
          specTitle="Height"
          specData={data?.height as number}
        />
      </div>
      <PokemonTypeAbility
        title="Types"
        listItems={data?.abilities as Ability[]}
      />
      <PokemonStats stats={data?.stats as Stat[]} />
    </div>
  );
}
