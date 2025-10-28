import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { GenresList } from "../index";

/**
 * 🧩 Test Suite: GenresList Component
 *
 * The GenresList component displays:
 * - A horizontal set of genre labels
 * - Styled using CSS modules
 *
 * It is used inside cards and detail pages to visually represent movie genres.
 */
describe("GenresList component", () => {
  const mockGenres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
  ];

  /**
   * 🧱 Setup — Render with a default mock list before each test.
   */
  beforeEach(() => {
    render(<GenresList genres={mockGenres} />);
  });

  /**
   * ✅ Test 1 — Render container with proper accessibility
   *
   * Ensures that the list is rendered with an accessible `aria-label`.
   */
  it("should render a container with an aria-label", () => {
    const container = screen.getByLabelText("Gêneros do filme");
    expect(container).toBeInTheDocument();
  });

  /**
   * ✅ Test 2 — Render all genre items
   *
   * Ensures that all genre names are displayed.
   */
  it("should render all genres provided", () => {
    mockGenres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });
  });

  /**
   * ✅ Test 3 — Apply styling class
   *
   * Ensures that the component uses the expected CSS class (`.genres`).
   */
  it("should include the proper container CSS class", () => {
    const container = screen.getByLabelText("Gêneros do filme");
    expect(container.className).toMatch(/genres/);
  });

  /**
   * ✅ Test 4 — Individual genre items have the correct class
   */
  it("should apply genre styling class to each item", () => {
    const genresRendered = screen.getAllByText(/Action|Adventure/);
    genresRendered.forEach((el) => {
      expect(el.className).toMatch(/genre/);
    });
  });

  /**
   * ✅ Test 5 — Component hides when no genres exist
   *
   * Ensures that passing an empty array results in no rendering.
   */
  it("should return null when genres list is empty", () => {
    const { container } = render(<GenresList genres={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
