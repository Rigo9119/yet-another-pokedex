import { describe, expect, vi, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonStats from "./pokemon-stats";
import { Stat } from "@/data/types";

vi.mock("@/paraglide/messages", () => ({
  m: {
    stats_title: () => "Stats",
  },
}));

describe("PokemonStats", () => {
  const mockStats: Stat[] = [
    { base_stat: 10, effort: 10, stat: { name: "stat1", url: "" } },
    { base_stat: 20, effort: 20, stat: { name: "stat2", url: "" } },
    { base_stat: 30, effort: 30, stat: { name: "stat3", url: "" } },
  ];

  it("renders stats title", () => {
    render(<PokemonStats stats={mockStats} />);
    expect(screen.getByText("Stats")).toBeInTheDocument();
  });

  it("renders stats", () => {
    render(<PokemonStats stats={mockStats} />);
    expect(screen.getByText(/stat1/)).toBeInTheDocument();
    expect(screen.getByText(/stat2/)).toBeInTheDocument();
    expect(screen.getByText(/stat3/)).toBeInTheDocument();
  });

  it("stats array its empty it should not render the component", () => {
    const { queryByText } = render(<PokemonStats stats={[]} />);
    expect(queryByText(/stat1/)).toBeNull();
  });
});
