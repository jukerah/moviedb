import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { MovieCard } from "../index";
import { ContextProvider } from "../../../contexts";

describe("MovieCard component", () => {
  /**
   * 🧩 Utility setup
   *
   * Renders the MovieCard component wrapped with:
   * - `MemoryRouter`: to support internal <Link> navigation
   * - `ContextProvider`: to simulate global state context
   *
   * This ensures the component behaves as it does in production.
   *
   * @param {Partial<MovieCardProps>} props - Optional props to override defaults.
   * @returns {MovieCardProps} The final props used for rendering.
   */
  const setup = (props = {}) => {
    const defaultProps = {
      id: 603,
      title: "The Matrix",
      voteAverage: 8.7,
      posterPath: "/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
      ...props,
    };

    render(
      <ContextProvider>
        <MemoryRouter>
          <MovieCard {...defaultProps} />
        </MemoryRouter>
      </ContextProvider>
    );

    return defaultProps;
  };

  /**
   * ✅ Test 1 — Base structure and accessibility
   *
   * Verifies that:
   * - The <article> wrapper is rendered with correct ARIA label.
   * - The poster image is displayed with the proper alt text.
   * - Both navigation links (poster and title) point to `/movie/:id`.
   * - The TMDB rating badge displays the correct score.
   *
   * Why: Ensures the component meets accessibility and content standards.
   */
  it("renders the movie card structure correctly", () => {
    const { title, voteAverage } = setup();

    // 🎬 Article wrapper (semantic container for movie card)
    const article = screen.getByRole("article", {
      name: new RegExp(title, "i"),
    });
    expect(article).toBeInTheDocument();

    // 🖼️ Poster image
    const img = screen.getByRole("img", {
      name: new RegExp(`Poster de ${title}`, "i"),
    });
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("image.tmdb.org")
    );

    // 🔗 Poster link
    const posterLink = screen.getByRole("link", {
      name: new RegExp(`Ver o pôster e detalhes do filme ${title}`, "i"),
    });
    expect(posterLink).toHaveAttribute("href", `/movie/603`);

    // 🔗 Title link
    const titleLink = screen.getByRole("link", {
      name: new RegExp(`Abrir página de detalhes do filme ${title}`, "i"),
    });
    expect(titleLink).toHaveAttribute("href", `/movie/603`);

    // ⭐ Rating badge
    const rating = screen.getByLabelText(
      new RegExp(`Nota TMDB ${voteAverage}`, "i")
    );
    expect(rating).toHaveTextContent(voteAverage.toFixed(1));
  });

  /**
   * ✅ Test 2 — Placeholder rendering
   *
   * Ensures that when no `posterPath` is provided:
   * - The placeholder text "Poster do Filme" is visible.
   * - No <img> element is rendered.
   *
   * Why: Guarantees graceful fallback for missing poster images.
   */
  it("renders placeholder when no poster is available", () => {
    setup({ posterPath: null });

    const placeholder = screen.getByText(/poster do filme/i);
    expect(placeholder).toBeInTheDocument();

    const img = screen.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });

  /**
   * ✅ Test 3 — Favorite button (inactive state)
   *
   * Checks that the favorite button:
   * - Starts with `aria-pressed="false"`
   * - Has the correct ARIA label ("Adicionar aos favoritos")
   *
   * Why: Ensures accessibility compliance and proper initial state.
   */
  it("renders the favorite button and toggles state on click", async () => {
    // Mock the hook before dynamic import
    vi.doMock("../../../hooks/useFavorites", () => ({
      useFavorites: () => ({
        favorites: {},
        toggleFavorite: vi.fn(),
      }),
    }));

    const { MovieCard: MockedCard } = await import("../index");

    render(
      <MemoryRouter>
        <MockedCard id={1} title="Test Movie" voteAverage={7.5} />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", {
      name: /adicionar aos favoritos/i,
    });
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  /**
   * ✅ Test 4 — Favorite button (active state)
   *
   * Mocks the `useFavorites` hook so that the current movie ID is marked
   * as favorite. Then verifies that:
   * - The button shows the correct ARIA label ("Remover dos favoritos")
   * - The button has `aria-pressed="true"`
   *
   * Why: Ensures proper rendering when a movie is already favorited.
   */
  it("renders favorite button in active state when movie is already favorite", async () => {
    vi.resetModules(); // Clear cache before new mock
    const mockFavorites = { 42: true };

    vi.doMock("../../../hooks/useFavorites", () => ({
      useFavorites: () => ({
        favorites: mockFavorites,
        toggleFavorite: vi.fn(),
      }),
    }));

    const { MovieCard: MockedCard } = await import("../index");

    render(
      <MemoryRouter>
        <MockedCard id={42} title="Interstellar" voteAverage={9.1} />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", {
      name: /remover dos favoritos/i,
    });
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  /**
   * ✅ Test 5 — Link consistency
   *
   * Ensures both <Link> elements (poster and title) point
   * to the same movie details page URL.
   *
   * Why: Prevents navigation inconsistencies between UI elements.
   */
  it("renders both poster and title links with correct href", () => {
    const { id, title } = setup();

    const posterLink = screen.getByRole("link", {
      name: new RegExp(`Ver o pôster e detalhes do filme ${title}`, "i"),
    });
    const titleLink = screen.getByRole("link", {
      name: new RegExp(`Abrir página de detalhes do filme ${title}`, "i"),
    });

    expect(posterLink).toHaveAttribute("href", `/movie/${id}`);
    expect(titleLink).toHaveAttribute("href", `/movie/${id}`);
  });
});
