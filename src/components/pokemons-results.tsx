import { type PokemonLocalized } from "@/data/types";
import PokemonImageCard from "./pokemon-image-card";

export interface PokemonsResultsProps {
  isSearchLoading: boolean;
  isListLoading: boolean;
  isSearching: boolean;
  searchData: PokemonLocalized[];
  filteredPokemons: PokemonLocalized[];
}

export default function PokemonsResults({
  isSearchLoading,
  isListLoading,
  isSearching,
  searchData,
  filteredPokemons,
}: PokemonsResultsProps) {
  if (isSearchLoading) return <h4>Loading search...</h4>;
  if (isListLoading) return <h4>Loading Pokemon...</h4>;

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
