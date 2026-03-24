import { getResourceById } from "@/data/poke-api";
import { FlavorTextEntry, LocalizedName, PokemonLocalized } from "@/data/types";
import { getLocale } from "@/paraglide/runtime";
import { useQuery } from "@tanstack/react-query";

export type UsePokemonData = {
  isLoading: boolean;
  isError: boolean;
  pokemon: PokemonLocalized | undefined;
};

export default function usePokemonData(name: string): UsePokemonData {
  const locale = getLocale();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getResourceById("pokemon", name),
  });

  const {
    data: speciesData,
    isLoading: isSpeciesLoading,
    isError: isSpeciesError,
  } = useQuery({
    queryKey: ["pokemon-species", name],
    queryFn: () => getResourceById("pokemon-species", name),
  });

  const localizedName =
    speciesData?.names.find(
      (name: LocalizedName) => name.language.name === locale,
    )?.name ?? name;

  if (!data || !speciesData) {
    return {
      isLoading: isLoading || isSpeciesLoading,
      isError: isError || isSpeciesError,
      pokemon: undefined,
    };
  }
  const flavorText = speciesData.flavor_text_entries.filter(
    (entry: FlavorTextEntry) => entry.language.name === locale,
  );

  const lastFlavorText = flavorText[flavorText.length - 1]?.flavor_text ?? "";

  return {
    isLoading: isLoading || isSpeciesLoading,
    isError: isError || isSpeciesError,
    pokemon: {
      ...data,
      localized_name: localizedName,
      flavor_text: lastFlavorText,
      evolution_chain_url: speciesData?.evolution_chain?.url,
    },
  };
}
