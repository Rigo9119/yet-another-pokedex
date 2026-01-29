import { getResourceById, infinteScrollFetch } from "@/data/poke-api";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { type Pokemon } from "@/data/types";
import { useCallback, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import PokemonsResults from "@/components/pokemons-results";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import LoadingCmp from "@/components/loaders";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 300);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["pokemon", "infinite"],
      queryFn: ({ pageParam = 0 }) => infinteScrollFetch("pokemon", pageParam),
      getNextPageParam: (lastPage) => lastPage.nextOffset,
      initialPageParam: 0,
    });
  const allPokemons = data?.pages.flatMap((page) => page.pokemons) ?? [];
  const searchQuery = useQuery({
    queryKey: ["pokemon", "search", debounceSearch],
    queryFn: () => getResourceById("pokemon", debounceSearch),
    enabled: debounceSearch.length >= 3,
  });

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
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
          placeholder="Search pokemons..."
          className="bg-white border border-transparent rounded-md px-4 py-2"
          value={search}
          onChange={handleSearch}
        />
      </section>
      <section className="flex flex-col gap-6 w-full md:flex-row md:flex-wrap">
        <PokemonsResults
          isListLoading={isLoading}
          isSearchLoading={searchQuery.isLoading}
          isSearching={debounceSearch.length >= 3}
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
