import { describe, expect, it } from "vitest";
import PokemonTypeAbility, {
  PokemonTypeAbilityProps,
} from "./pokemon-type-ability";
import { render, screen } from "@testing-library/react";

describe("PokemonTypeAbility", () => {
  const propsType: PokemonTypeAbilityProps = {
    title: "Ability",
    listItems: [
      {
        slot: 1,
        type: { name: "type-1", url: "https://pokeapi.co/api/v2/type/1" },
      },
      {
        slot: 2,
        type: { name: "type-2", url: "https://pokeapi.co/api/v2/type/2" },
      },
    ],
  };

  const propsAbility: PokemonTypeAbilityProps = {
    title: "Ability",
    listItems: [
      {
        slot: 1,
        is_hidden: false,
        ability: {
          name: "ability-1",
          url: "https://pokeapi.co/api/v2/ability/1",
        },
      },
      {
        slot: 2,
        is_hidden: true,
        ability: {
          name: "ability-2",
          url: "https://pokeapi.co/api/v2/ability/2",
        },
      },
    ],
  };

  it("renders the title", () => {
    render(<PokemonTypeAbility {...propsType} />);
    expect(screen.getByText(propsType.title)).toBeInTheDocument();
  });

  it("renders the list items with pokemon type props", () => {
    render(<PokemonTypeAbility {...propsType} />);
    expect(screen.getByText("type-1")).toBeInTheDocument();
    expect(screen.getByText("type-2")).toBeInTheDocument();
  });

  it("renders the list items with ability props", () => {
    render(<PokemonTypeAbility {...propsAbility} />);
    expect(screen.getByText("ability-1")).toBeInTheDocument();
    expect(screen.getByText("ability-2")).toBeInTheDocument();
  });
});
