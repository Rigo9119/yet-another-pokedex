import { DEBOUNCE_DELAY, DEBOUNCE_SEARCH_LENGHT } from "@/constants";
import { getAllPokemons, getResourceById } from "@/data/poke-api";
import { useQuery, useInfiniteQuery, useQueries } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
import { LocalizedName } from "@/data/types";
import { getLocale } from "@/paraglide/runtime";

export default function useSearchPokemon(name: string) {
  const locale = getLocale();
  const debounceSearch = useDebounce(name, DEBOUNCE_DELAY);

  const { data: allPokemons, isError } = useQuery({
    queryKey: ["all-pokemons"],
    queryFn: () => getAllPokemons(),
    enabled: debounceSearch.length >= DEBOUNCE_SEARCH_LENGHT,
    staleTime: Infinity,
  });

  const filterData =
    allPokemons?.filter((pokemon) => pokemon.name.includes(debounceSearch)) ??
    [];

  const pokemonsData = useQueries({
    queries: filterData?.map((pokemon) => ({
      queryKey: ["search-list", pokemon.name],
      queryFn: () => getResourceById("pokemon", pokemon.name),
      staleTime: Infinity,
    })),
  });

  const pokemonsSet = new Set(pokemonsData.map((p) => p?.data?.species?.name));
  const pokemonsArr = Array.from(pokemonsSet);

  const speciesQueries = useQueries({
    queries: pokemonsArr?.map((speciesName) => ({
      queryKey: ["infinite-species", speciesName],
      queryFn: () => getResourceById("pokemon-species", speciesName),
      enabled: !!speciesName,
      staleTime: Infinity,
    })),
  });

  const isLoadingResults =
    pokemonsData.some((pokemon) => pokemon.isLoading) ||
    speciesQueries.some((species) => species.isLoading);

  const pokemonsWithLocalizedNames = pokemonsData
    .map((pokemon) => {
      const species = speciesQueries.find(
        (species) => species.data?.name === pokemon?.data?.species?.name,
      );
      const localized_name =
        species?.data?.names?.find(
          (name: LocalizedName) => name.language.name === locale,
        )?.name ?? pokemon?.data?.name;

      return {
        ...pokemon.data,
        localized_name,
      };
    })
    .filter((pokemon) => pokemon.is_default);

  return {
    loadingSearch: isLoadingResults,
    errorSearch: isError,
    pokemonsSearch: pokemonsWithLocalizedNames,
  };
}
