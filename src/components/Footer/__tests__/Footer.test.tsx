import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { Footer } from "../index";

describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("should render the footer element", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("should display the copyright text", () => {
    const paragraph = screen.getByText(
      /© 2025 MovieDB — Projeto sem fins lucrativos/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("should mention that the project is for educational purposes", () => {
    const text = screen.getByText(/fins educacionais/i);
    expect(text).toBeInTheDocument();
  });

  it("should contain a link to The Movie Database (TMDB)", () => {
    const link = screen.getByRole("link", { name: /The Movie Database/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://www.themoviedb.org/");
  });

  it("should open the TMDB link in a new tab", () => {
    const link = screen.getByRole("link", { name: /The Movie Database/i });
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("should use rel='noopener noreferrer' for security", () => {
    const link = screen.getByRole("link", { name: /The Movie Database/i });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should include TMDB disclaimer text", () => {
    const disclaimer = screen.getByText(
      /mas não é endossado ou certificado por ela/i
    );
    expect(disclaimer).toBeInTheDocument();
  });

  it("should render the footer with the correct CSS class", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer.className).toMatch(/footer/);
  });
});
