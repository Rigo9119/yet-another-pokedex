import { type Pokemon } from "@/data/types";
import PokemonImageCard from "./pokemon-image-card";

export interface PokemonsResultsProps {
  isSearchLoading: boolean;
  isListLoading: boolean;
  isSearching: boolean;
  searchData: Pokemon;
  filteredPokemons: Pokemon[];
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
    return <PokemonImageCard pokemon={searchData} />;
  }

  return filteredPokemons.map((pokemon, index) => (
    <PokemonImageCard key={index} pokemon={pokemon as Pokemon} />
  ));
}
