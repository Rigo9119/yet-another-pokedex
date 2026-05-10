import { describe, expect, it } from "vitest";
import PokemonImage, { PokemonImageProps } from "./pokemon-image";
import { render } from "@testing-library/react";

describe("PokemonImage", () => {
  const props: PokemonImageProps = {
    frontAlt: "front",
    frontSrc: "front src",
    backAlt: "back",
    backSrc: "back src",
  };

  it("renders the front and back images", () => {
    const { getByAltText } = render(<PokemonImage {...props} />);

    expect(getByAltText("front")).toBeInTheDocument();
    expect(getByAltText("back")).toBeInTheDocument();
  });
});
