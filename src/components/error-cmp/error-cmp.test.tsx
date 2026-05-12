import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import ErrorCmp from "./error-cmp";
import { ReactNode } from "react";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => (
    <a data-testid="home-link">{children}</a>
  ),
}));

describe("ErrorCmp", () => {
  it("should render the display button when displayBtn is true", () => {
    const { getByText } = render(
      <ErrorCmp displayBtn message="Error message" />,
    );
    expect(getByText("Go back to home")).toBeInTheDocument();
  });
  it("should not render the display button when displayBtn is false", () => {
    const { queryByText } = render(
      <ErrorCmp displayBtn={false} message="Error message" />,
    );
    expect(queryByText("Go back to home")).toBeNull();
  });
  it("should render the error message", () => {
    const { getByText } = render(<ErrorCmp message="Error message" />);
    expect(getByText("Error message")).toBeInTheDocument();
  });
});
