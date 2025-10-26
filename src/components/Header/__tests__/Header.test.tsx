import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Header } from "../index";
import { ContextProvider } from "../../../contexts";

describe("Header component", () => {
  /**
   * Utility function to render the Header component wrapped
   * with both Router and ContextProvider.
   *
   * This ensures the component behaves the same way as in the real app,
   * since Header relies on:
   * - `NavLink` from react-router-dom
   * - `useSearch()` from the global Context.
   */
  const setup = () => {
    render(
      <ContextProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ContextProvider>
    );
  };

  /**
   * ✅ Test 1 — Header landmark
   *
   * Ensures that the <header> element is rendered
   * and correctly marked with the ARIA `role="banner"`.
   *
   * Why: The "banner" role defines the page's global header landmark,
   * improving accessibility for screen reader navigation.
   */
  it("renders the header banner", () => {
    setup();
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  /**
   * ✅ Test 2 — Logo accessibility
   *
   * Verifies that the MovieDB logo is displayed and
   * accessible through the ARIA label.
   *
   * Why: This link is a key navigation element (to the home page)
   * and must be labeled for accessibility, even though it uses an emoji.
   */
  it("renders the MovieDB logo with correct label", () => {
    setup();
    const logoLink = screen.getByRole("link", {
      name: /página inicial do moviedb/i,
    });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveTextContent("MovieDB");
  });

  /**
   * ✅ Test 3 — Navigation links
   *
   * Confirms that both "Home" and "Favoritos" links exist.
   *
   * Why: The header renders navigation twice — once for desktop,
   * and once for mobile. Using `getAllByRole` ensures both are detected.
   * This verifies consistent navigation availability across devices.
   */
  it("renders navigation links for Home and Favorites", () => {
    setup();
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    const favoritesLinks = screen.getAllByRole("link", { name: /favoritos/i });

    expect(homeLinks.length).toBeGreaterThan(0);
    expect(favoritesLinks.length).toBeGreaterThan(0);
  });

  /**
   * ✅ Test 4 — Search bar functionality
   *
   * Validates that the search input:
   * - Exists and is accessible by its ARIA label.
   * - Starts empty.
   * - Updates its value when typing.
   *
   * Why: The search input is bound to the global `useSearch` context.
   * This ensures typing updates the shared state correctly.
   */
  it("renders the search input and allows typing", () => {
    setup();
    const input = screen.getByRole("textbox", {
      name: /campo de busca de filmes/i,
    });

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "Matrix" } });
    expect(input).toHaveValue("Matrix");
  });

  /**
   * ✅ Test 5 — Mobile menu toggle
   *
   * Checks the open/close behavior of the hamburger menu button.
   * - Initially closed (`aria-expanded="false"`)
   * - Opens on first click (`true`)
   * - Closes again on second click (`false`)
   *
   * Why: Verifies proper ARIA state management and that the mobile
   * navigation responds correctly to user interaction.
   */
  it("toggles the mobile menu when clicking the hamburger button", () => {
    setup();
    const button = screen.getByRole("button", {
      name: /abrir menu de navegação/i,
    });

    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  /**
   * ✅ Test 6 — Auto-closing mobile menu
   *
   * Simulates the user opening the mobile menu and clicking a link inside it.
   * Ensures that after the click, the menu closes automatically.
   *
   * Why: This improves user experience (UX) on mobile by not requiring
   * a second click to close the menu, and keeps ARIA state consistent.
   */
  it("should close mobile menu when clicking on a mobile nav link", () => {
    setup();
    const button = screen.getByRole("button", {
      name: /abrir menu de navegação/i,
    });

    fireEvent.click(button);
    const mobileLink = screen.getAllByRole("link", { name: /home/i })[1];
    fireEvent.click(mobileLink);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
