import { getResourceById, inifiniteScrollFetch } from "@/data/poke-api";
import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { LocalizedName, type PokemonLocalized } from "@/data/types";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import PokemonsResults from "@/components/pokemons-results";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import LoadingCmp from "@/components/loaders";
import { m } from "@/paraglide/messages";
import {
  DEBOUNCE_DELAY,
  DEBOUNCE_SEARCH_LENGHT,
  INITIAL_PAGE_PARAM,
} from "@/constants";
import { getLocale } from "@/paraglide/runtime";
import useSearchPokemon from "@/hooks/useSearchPokemon";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const locale = getLocale();
  const loadingArr = new Array({ length: 20 });
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, DEBOUNCE_DELAY);
  const { loadingSearch, errorSearch, pokemonsSearch } =
    useSearchPokemon(search);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["pokemon", "infinite"],
    queryFn: ({ pageParam = INITIAL_PAGE_PARAM }) => {
      console.log("queryFn called, pageParam:", pageParam);
      return inifiniteScrollFetch("pokemon", pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: INITIAL_PAGE_PARAM,
  });
  const allPokemons = data?.pages.flatMap((page) => page.pokemons) ?? [];
  const speciesQueries = useQueries({
    queries: allPokemons.map((pokemon) => ({
      queryKey: ["infinite-scroll", pokemon.name],
      queryFn: () => getResourceById("pokemon-species", pokemon.species.name),
      staleTime: Infinity,
    })),
  });

  const pokemonsWithLocalizedNames = allPokemons.map((pokemon, index) => {
    const species = speciesQueries[index]?.data;
    const localized_name =
      species?.names?.find((n: LocalizedName) => n.language.name === locale)
        ?.name ?? pokemon.name;

    return { ...pokemon, localized_name };
  });

  const [sentinelRef, isIntersecting] = useIntersectionObserver({
    enabled: hasNextPage,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 min-h-screen bg-red-600 p-4">
      <section className="flex flex-col gap-6 w-full">
        <input
          type="text"
          placeholder={m.search_placeholder()}
          className="bg-white border border-transparent rounded-md px-4 py-2"
          value={search}
          onChange={handleSearch}
        />
      </section>
      <section className="flex flex-col gap-6 w-full">
        <PokemonsResults
          isListLoading={isLoading}
          isSearchLoading={loadingSearch}
          isSearching={debounceSearch.length >= DEBOUNCE_SEARCH_LENGHT}
          searchData={pokemonsSearch}
          filteredPokemons={pokemonsWithLocalizedNames as PokemonLocalized[]}
          isListError={isError}
          isSearchError={errorSearch}
        />
        {isFetchingNextPage &&
          loadingArr.map((_, index) => (
            <LoadingCmp variant="skeleton" key={index} />
          ))}
        {loadingSearch ? null : <div ref={sentinelRef} />}
      </section>
    </div>
  );
}
