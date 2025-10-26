import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { Footer } from "../index";

/**
 * 🧩 Test Suite: Footer Component
 *
 * The Footer component displays:
 * - Copyright
 * - Educational disclaimer
 * - Reference link to The Movie Database (TMDB)
 *
 * These tests ensure that the footer is properly rendered, accessible, and compliant
 * with basic UX and security standards for external links.
 */
describe("Footer component", () => {
  /**
   * 🧱 Setup — Render the Footer before each test.
   * Ensures a fresh DOM for each assertion.
   */
  beforeEach(() => {
    render(<Footer />);
  });

  /**
   * ✅ Test 1 — Footer landmark
   *
   * Ensures that the <footer> element is rendered
   * and correctly marked with the ARIA role "contentinfo".
   *
   * Why: This role defines the global page footer landmark,
   * improving accessibility by helping screen readers identify the footer section.
   */
  it("should render the footer element", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  /**
   * ✅ Test 2 — Copyright
   *
   * Verifies that the footer includes the copyright notice:
   * "© 2025 MovieDB — Projeto sem fins lucrativos".
   *
   * Why: Confirms that the footer correctly attributes ownership
   * and communicates that the project is non-commercial.
   */
  it("should display the copyright text", () => {
    const paragraph = screen.getByText(
      /© 2025 MovieDB — Projeto sem fins lucrativos/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  /**
   * ✅ Test 3 — Educational disclaimer
   *
   * Checks that the footer mentions the educational purpose
   * (text containing "fins educacionais").
   *
   * Why: This clarifies the intent of the project and is a key part of its transparency,
   * making it clear that it's not for profit or commercial use.
   */
  it("should mention that the project is for educational purposes", () => {
    const text = screen.getByText(/fins educacionais/i);
    expect(text).toBeInTheDocument();
  });

  /**
   * ✅ Test 4 — TMDB link presence
   *
   * Ensures that a link to The Movie Database (TMDB) is present in the footer.
   * It should display the correct name and point to the expected URL.
   *
   * Why: TMDB attribution is required when using its API, so this test
   * guarantees compliance with TMDB’s usage guidelines.
   */
  it("should contain a link to The Movie Database (TMDB)", () => {
    const link = screen.getByRole("link", { name: /The Movie Database/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://www.themoviedb.org/");
  });

  /**
   * ✅ Test 5 — External link behavior
   *
   * Verifies that the TMDB link opens in a new tab using `target="_blank"`.
   *
   * Why: Opening external resources in a new tab preserves the user's context
   * within the MovieDB application.
   */
  it("should open the TMDB link in a new tab", () => {
    const link = screen.getByRole("link", { name: /The Movie Database/i });
    expect(link).toHaveAttribute("target", "_blank");
  });

  /**
   * ✅ Test 6 — Link security attributes
   *
   * Ensures the TMDB link includes `rel="noopener noreferrer"`.
   *
   * Why: This is a critical security measure for links opened in new tabs.
   * It prevents the new page from accessing the `window.opener` object,
   * which could otherwise lead to phishing or window hijacking attacks.
   */
  it("should use rel='noopener noreferrer' for security", () => {
    const link = screen.getByRole("link", { name: /The Movie Database/i });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  /**
   * ✅ Test 7 — TMDB disclaimer
   *
   * Confirms that the footer contains the disclaimer text:
   * "mas não é endossado ou certificado por ela".
   *
   * Why: This disclaimer fulfills TMDB’s attribution requirements
   * by clarifying that the app uses its data but is not affiliated with or endorsed by TMDB.
   */
  it("should include TMDB disclaimer text", () => {
    const disclaimer = screen.getByText(
      /mas não é endossado ou certificado por ela/i
    );
    expect(disclaimer).toBeInTheDocument();
  });

  /**
   * ✅ Test 8 — Styling verification
   *
   * Verifies that the footer element has the expected CSS class applied (`.footer`).
   *
   * Why: Ensures that the component is styled consistently with the design system.
   * This test only checks for class presence — not layout — to avoid brittleness.
   */
  it("should render the footer with the correct CSS class", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer.className).toMatch(/footer/);
  });
});
