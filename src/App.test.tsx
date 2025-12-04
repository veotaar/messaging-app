/// <reference lib="dom" />

import { expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";

function Button({ children }: { children: React.ReactNode }) {
  return <button type="button">{children}</button>;
}

test("renders button", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button").textContent).toBe("Click me");
});
