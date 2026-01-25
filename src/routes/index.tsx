import { getResourceById, getResources } from "@/data/poke-api";
import { createFileRoute } from "@tanstack/react-router";
import { useQueries, useQuery } from "@tanstack/react-query";
import { type Pokemon, Resource } from "@/data/types";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import PokemonsResults from "@/components/pokemons-results";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => getResources("pokemon"),
});

function App() {
  const pokemons = Route.useLoaderData();
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 300);
  const pokemonsQueries = useQueries({
    queries: (pokemons ?? []).map((pokemon: Resource) => ({
      queryKey: ["pokemon", pokemon.name],
      queryFn: () => fetch(pokemon.url).then((res) => res.json()),
    })),
  });
  const isListLoading = pokemonsQueries.some((query) => query.isLoading);
  const searchQuery = useQuery({
    queryKey: ["pokemon", "search", debounceSearch],
    queryFn: () => getResourceById("pokemon", debounceSearch),
    enabled: debounceSearch.length >= 3,
  });

  const filteredPokemons = pokemonsQueries.filter((query) =>
    query.data?.name.toLowerCase().includes(search.toLowerCase()),
  );

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
      <section className="flex flex-col gap-6 w-full">
        <PokemonsResults
          isListLoading={isListLoading}
          isSearchLoading={searchQuery.isLoading}
          isSearching={debounceSearch.length >= 3}
          searchData={searchQuery.data as Pokemon}
          filteredPokemons={filteredPokemons}
        />
      </section>
    </div>
  );
}
