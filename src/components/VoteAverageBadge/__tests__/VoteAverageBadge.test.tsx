import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { VoteAverageBadge } from "../index";

/**
 * 🧩 Test Suite: VoteAverageBadge Component
 *
 * The VoteAverageBadge component displays:
 * - TMDB movie rating rounded to one decimal place
 * - Styled badge
 * - Accessible rating text via aria-label
 */
describe("VoteAverageBadge component", () => {
  const mockValue = 7.83;

  /**
   * ✅ Test 1 — Render rating value
   *
   * Ensures the rating appears formatted with one decimal place.
   */
  it("should display the rating value formatted to one decimal place", () => {
    render(<VoteAverageBadge value={mockValue} />);
    expect(screen.getByText("7.8")).toBeInTheDocument();
  });

  /**
   * ✅ Test 2 — Ensure aria-label contains the correct text
   *
   * Improves accessibility support for screen reader users.
   */
  it("should include an accessible aria-label describing the rating", () => {
    render(<VoteAverageBadge value={mockValue} />);

    const badge = screen.getByLabelText(`Nota TMDB ${mockValue}`);
    expect(badge).toBeInTheDocument();
  });

  /**
   * ✅ Test 3 — Ensure styling class is applied
   *
   * Confirms that the badge styling is present and consistent.
   */
  it("should apply the correct CSS class to the element", () => {
    render(<VoteAverageBadge value={mockValue} />);

    const badge = screen.getByText("7.8");
    expect(badge.className).toMatch(/badge/);
  });
});
