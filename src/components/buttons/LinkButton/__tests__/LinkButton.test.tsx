import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LinkButton } from "../index";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

/**
 * 🧩 Test Suite: LinkButton Component
 *
 * Validates that the LinkButton component:
 * - Renders the label correctly
 * - Applies optional icon when provided
 * - Accepts custom className
 * - Properly passes `to` and other Link props
 * - Works with React Router navigation
 */
describe("LinkButton component", () => {
  const mockLabel = "Go Home";
  const mockIcon = "🏠";

  /**
   * ✅ Test 1 — Renders label correctly
   *
   * Ensures that the label text is visible in the document.
   */
  it("should render the label correctly", () => {
    render(
      <MemoryRouter>
        <LinkButton to="/" label={mockLabel} />
      </MemoryRouter>
    );

    const button = screen.getByText(mockLabel);
    expect(button).toBeInTheDocument();
  });

  /**
   * ✅ Test 2 — Renders optional icon
   *
   * Ensures the icon appears when provided.
   */
  it("should render the icon when provided", () => {
    render(
      <MemoryRouter>
        <LinkButton to="/" label={mockLabel} icon={mockIcon} />
      </MemoryRouter>
    );

    const icon = screen.getByText(mockIcon);
    expect(icon).toBeInTheDocument();
  });

  /**
   * ✅ Test 3 — Applies custom className
   *
   * Ensures the wrapper contains the provided className.
   */
  it("should apply custom className", () => {
    render(
      <MemoryRouter>
        <LinkButton to="/" label={mockLabel} className="custom-class" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: mockLabel });
    expect(link).toHaveClass("custom-class");
  });

  /**
   * ✅ Test 4 — Passes `to` prop correctly
   *
   * Ensures the link navigates to the intended URL.
   */
  it("should have the correct `to` prop", () => {
    render(
      <MemoryRouter>
        <LinkButton to="/test" label={mockLabel} />
      </MemoryRouter>
    );

    const link = screen.getByText(mockLabel).closest("a");
    expect(link).toHaveAttribute("href", "/test");
  });

  /**
   * ✅ Test 5 — Renders multiple Link props without error
   *
   * Ensures that additional props like `target` are forwarded correctly.
   */
  it("should forward additional Link props", () => {
    render(
      <MemoryRouter>
        <LinkButton to="/test" label={mockLabel} target="_blank" />
      </MemoryRouter>
    );

    const link = screen.getByText(mockLabel).closest("a");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
