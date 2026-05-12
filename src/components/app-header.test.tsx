import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import AppHeader from "./app-header";

vi.mock("@/paraglide/messages", () => ({
  m: {
    index_page_title: () => "Pokédex",
  },
}));

vi.mock("@/components/language-selector", () => ({
  default: () => <div data-testid="language-selector">en</div>,
}));

describe("Header", () => {
  it("should render the title", () => {
    const { getByText } = render(<AppHeader />);
    const title = getByText("Pokédex");
    expect(title).toBeInTheDocument();
  });

  it("should render the language selector", () => {
    const { getByTestId } = render(<AppHeader />);
    const languageSelector = getByTestId("language-selector");
    expect(languageSelector).toBeInTheDocument();
  });
});
