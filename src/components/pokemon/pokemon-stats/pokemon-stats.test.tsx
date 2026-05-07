import { describe, expect, vi, test, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonStats from "./pokemon-stats";

vi.mock("@/paraglide/messages", () => ({
  m: {
    stats_title: () => "Stats",
  },
}));

describe("PokemonStats", () => {
  const mockStats = [
    { base_stat: 10, effort: 10, stat: { name: "stat1", url: "" } },
    { base_stat: 20, effort: 20, stat: { name: "stat2", url: "" } },
    { base_stat: 30, effort: 30, stat: { name: "stat3", url: "" } },
  ];

  beforeEach(() => {
    render(<PokemonStats stats={mockStats} />);
  });

  test("renders stats title", () => {
    expect(screen.getByText("Stats")).toHaveTextContent("Stats");
  });

  test("renders stats", () => {
    expect(screen.getByText(/stat1/)).toHaveTextContent("stat1");
    expect(screen.getByText(/stat2/)).toHaveTextContent("stat2");
    expect(screen.getByText(/stat3/)).toHaveTextContent("stat3");
  });
});
