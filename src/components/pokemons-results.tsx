import { type PokemonLocalized } from "@/data/types";
import PokemonImageCard from "./pokemon-image-card";
import LoadingCmp from "./loaders";
import ErrorCmp from "./error-cmp";

export interface PokemonsResultsProps {
  isSearchLoading: boolean;
  isListLoading: boolean;
  isSearching: boolean;
  isListError: boolean;
  isSearchError: boolean;
  searchData: PokemonLocalized[];
  filteredPokemons: PokemonLocalized[];
}

export default function PokemonsResults({
  isSearchLoading,
  isListLoading,
  isSearching,
  isListError,
  isSearchError,
  searchData,
  filteredPokemons,
}: PokemonsResultsProps) {
  const loadingArr = Array.from({ length: 20 });
  if (isSearchLoading) return <LoadingCmp variant="spinner" />;
  if (isListLoading && !isSearching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-7">
        {loadingArr.map((_, index) => (
          <LoadingCmp variant="skeleton" key={index} />
        ))}
      </div>
    );
  }
  if (isListError) return <ErrorCmp message="Error loading Pokemons" />;
  if (isSearchError) return <ErrorCmp message="Error searching Pokemon" />;

  if (isSearching && !searchData.length) return <h2>No results found</h2>;

  if (isSearching && searchData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-7">
        {searchData.map((pokemon) => (
          <PokemonImageCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-7">
      {filteredPokemons.map((pokemon) => (
        <PokemonImageCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
