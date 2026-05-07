import { describe, expect, vi, test, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonEvolutionChain from "./pokemon-evolution-chain";

vi.mock("@/paraglide/messages", () => ({
  m: {
    evolutions_chain_title: () => "Evolutions",
  },
}));
