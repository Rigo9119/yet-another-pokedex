import { describe, expect, vi, test, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonEvolutionChain from "./pokemon-evolution-chain";
import { PokemonLocalized } from "@/data/types";

vi.mock("@/paraglide/messages", () => ({
  m: {
    evolutions_chain_title: () => "Evolutions",
  },
}));

vi.mock("@/components/pokemon-image-card", () => ({
  default: ({ pokemon }: { pokemon: PokemonLocalized }) => (
    <div data-testid="pokemon-card">{pokemon.name}</div>
  ),
}));

describe("PokemonEvolutionChain", () => {
  const mockEvolutions: PokemonLocalized[] = [
    {
      id: 1,
      name: "bulbasaur",
      sprites: {
        back_default: "",
        back_female: "",
        back_shiny: "",
        back_shiny_female: "",
        front_default: "",
        front_female: "",
        front_shiny: "",
        front_shiny_female: "",
      },
      types: [],
      stats: [],
      abilities: [],
      moves: [],
      height: 12,
      weight: 12,
      order: 1,
      base_experience: 123,
      is_default: false,
      species: { url: "", name: "bulbasaur" },
      cries: { latest: "", legacy: "" },
      forms: [],
      game_indices: { game_index: 12, version: { url: "", name: "" } },
      held_items: [],
      location_area_encounters: "",
      past_abilities: [],
      past_types: [],
      localized_name: "bulbasaur",
      flavor_text: "",
      evolution_chain_url: "",
    },
    {
      id: 2,
      name: "ivysaur",
      sprites: {
        back_default: "",
        back_female: "",
        back_shiny: "",
        back_shiny_female: "",
        front_default: "",
        front_female: "",
        front_shiny: "",
        front_shiny_female: "",
      },
      types: [],
      stats: [],
      abilities: [],
      moves: [],
      height: 12,
      weight: 12,
      order: 2,
      base_experience: 123,
      is_default: false,
      species: { url: "", name: "ivysaur" },
      cries: { latest: "", legacy: "" },
      forms: [],
      game_indices: { game_index: 12, version: { url: "", name: "" } },
      held_items: [],
      location_area_encounters: "",
      past_abilities: [],
      past_types: [],
      localized_name: "ivysaur",
      flavor_text: "",
      evolution_chain_url: "",
    },
    {
      id: 3,
      name: "venusaur",
      sprites: {
        back_default: "",
        back_female: "",
        back_shiny: "",
        back_shiny_female: "",
        front_default: "",
        front_female: "",
        front_shiny: "",
        front_shiny_female: "",
      },
      types: [],
      stats: [],
      abilities: [],
      moves: [],
      height: 12,
      weight: 12,
      order: 3,
      base_experience: 123,
      is_default: false,
      species: { url: "", name: "venusaur" },
      cries: { latest: "", legacy: "" },
      forms: [],
      game_indices: { game_index: 12, version: { url: "", name: "" } },
      held_items: [],
      location_area_encounters: "",
      past_abilities: [],
      past_types: [],
      localized_name: "venusaur",
      flavor_text: "",
      evolution_chain_url: "",
    },
  ];

  beforeEach(() => {
    render(<PokemonEvolutionChain evolutions={mockEvolutions} />);
  });

  test("renders component title", () => {
    expect(screen.getByText("Evolutions")).toBeInTheDocument();
  });

  test("pokemons cards should be of length 3", () => {
    expect(screen.getAllByTestId("pokemon-card")).toHaveLength(3);
  });
});
