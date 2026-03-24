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
  const loadingArr = new Array({ length: 20 });
  if (isSearchLoading) return <LoadingCmp variant="spinner" />;
  if (isListLoading && !isSearching) {
    return (
      <>
        {loadingArr.map((_, index) => (
          <LoadingCmp variant="skeleton" key={index} />
        ))}
      </>
    );
  }
  if (isListError) return <ErrorCmp message="Error loading Pokemons" />;
  if (isSearchError) return <ErrorCmp message="Error searching Pokemon" />;

  if (isSearching && !searchData.length) return <h2>No results found</h2>;

  if (isSearching && searchData) {
    return (
      <>
        {searchData.map((pokemon) => (
          <PokemonImageCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </>
    );
  }

  return filteredPokemons.map((pokemon) => (
    <PokemonImageCard key={pokemon.id} pokemon={pokemon} />
  ));
}
