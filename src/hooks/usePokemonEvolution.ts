import { getLocale } from "@/paraglide/runtime";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getResourceById } from "@/data/poke-api";
import { EvolutionChain, LocalizedName, PokemonLocalized } from "@/data/types";

function getEvolutions(chain: EvolutionChain): EvolutionChain[] {
  return [chain, ...chain.evolves_to.flatMap((evo) => getEvolutions(evo))];
}

export default function usePokemonEvolution(evolutionUrl: string | undefined) {
  const locale = getLocale();
  const id = evolutionUrl
    ? new URL(evolutionUrl).pathname.split("/").filter(Boolean).pop()
    : undefined;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon-evolution", id],
    queryFn: () => getResourceById("evolution-chain", id!),
    enabled: !!id,
  });

  const evolutionChain = data ? getEvolutions(data.chain) : [];

  const evolutionsData = useQueries({
    queries: evolutionChain.map((chain) => ({
      queryKey: ["pokemon-evolution-data", chain.species.name],
      queryFn: () => getResourceById("pokemon", chain.species.name),
    })),
  });

  const species = useQueries({
    queries: evolutionsData.map((chain) => ({
      queryKey: ["pokemon-evolution-species", chain?.data?.species.name],
      queryFn: () =>
        getResourceById("pokemon-species", chain?.data?.species.name),
      enabled: !!chain?.data?.species.name,
    })),
  });

  const localizedData: PokemonLocalized[π] = evolutionsData.map(
    (chain, index) => {
      const speciesData = species[index]?.data;
      const localized_name = speciesData?.names.find(
        (name: LocalizedName) => name.language.name === locale,
      )?.name;

      return { ...chain.data, localized_name };
    },
  );

  return { evolutions: localizedData, isLoading, isError };
}
