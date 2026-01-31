import { getResourceById, infinteScrollFetch } from "@/data/poke-api";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { type Pokemon } from "@/data/types";
import { useCallback, useState } from "react";
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

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const locale = getLocale();
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, DEBOUNCE_DELAY);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["pokemon", "infinite"],
      queryFn: ({ pageParam = INITIAL_PAGE_PARAM }) =>
        infinteScrollFetch("pokemon", pageParam),
      getNextPageParam: (lastPage) => lastPage.nextOffset,
      initialPageParam: INITIAL_PAGE_PARAM,
    });
  const allPokemons = data?.pages.flatMap((page) => page.pokemons) ?? [];

  const speciesQueries = useQueries({
    queries: allPokemons.map((pokemon) => ({
      queryKey: ["pokemon-species", pokemon.id],
      queryFn: () =>
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`).then(
          (r) => r.json(),
        ),
      staleTime: Infinity,
    })),
  });

  const pokemonsWithLocalizedNames = allPokemons.map((pokemon, index) => {
    const species = speciesQueries[index]?.data;
    const localizedName =
      species?.names?.find(
        (n: { language: { name: string }; name: string }) =>
          n.language.name === locale,
      )?.name ?? pokemon.name;

    return { ...pokemon, localizedName };
  });

  const searchQuery = useQuery({
    queryKey: ["pokemon", "search", debounceSearch],
    queryFn: () => getResourceById("pokemon", debounceSearch),
    enabled: debounceSearch.length >= DEBOUNCE_SEARCH_LENGHT,
  });

  const filteredPokemons = pokemonsWithLocalizedNames.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.localizedName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersectionObserver(handleLoadMore, {
    enabled: hasNextPage,
  });

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
      <section className="flex flex-col gap-6 w-full md:flex-row md:flex-wrap">
        <PokemonsResults
          isListLoading={isLoading}
          isSearchLoading={searchQuery.isLoading}
          isSearching={debounceSearch.length >= DEBOUNCE_SEARCH_LENGHT}
          searchData={searchQuery.data as Pokemon}
          filteredPokemons={filteredPokemons}
        />
        {searchQuery.isLoading ? null : (
          <div ref={sentinelRef}>
            {isFetchingNextPage && <LoadingCmp message={m.loading_message()} />}
          </div>
        )}
      </section>
    </div>
  );
}
