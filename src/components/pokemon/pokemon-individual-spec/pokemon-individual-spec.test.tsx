import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import PokemonIndividualSpec, {
  PokemonIndividualSpecProps,
} from "./pokemon-individual-spec";

describe("PokemonIndividualSpec", () => {
  const props: PokemonIndividualSpecProps = {
    specTitle: "Spec title",
    specData: 100,
  };
  it("renders the individual specifications", () => {
    const { getByText } = render(<PokemonIndividualSpec {...props} />);

    expect(getByText("Spec title")).toBeInTheDocument();
    expect(getByText(100)).toBeInTheDocument();
  });
});
