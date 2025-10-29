import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GenericButton } from "../index";
import "@testing-library/jest-dom";

/**
 * 🧩 Test Suite: GenericButton Component
 *
 * Validates that the GenericButton component:
 * - Renders label correctly
 * - Applies optional icon when provided
 * - Accepts custom className
 * - Responds to click events
 * - Supports native button attributes like `disabled`
 */
describe("GenericButton component", () => {
  const mockLabel = "Click Me";
  const mockIcon = "⭐";

  /**
   * ✅ Test 1 — Renders label correctly
   *
   * Ensures that the label text is visible in the document.
   */
  it("should render the label correctly", () => {
    render(<GenericButton label={mockLabel} />);

    const button = screen.getByText(mockLabel);
    expect(button).toBeInTheDocument();
  });

  /**
   * ✅ Test 2 — Renders optional icon
   *
   * Ensures the icon appears when provided.
   */
  it("should render the icon when provided", () => {
    render(<GenericButton label={mockLabel} icon={mockIcon} />);

    const icon = screen.getByText(mockIcon);
    expect(icon).toBeInTheDocument();
  });

  /**
   * ✅ Test 3 — Applies custom className
   *
   * Ensures the wrapper contains the provided className.
   */
  it("should apply custom className", () => {
    render(<GenericButton label={mockLabel} className="custom-class" />);

    const button = screen.getByRole("button", { name: mockLabel });
    expect(button).toHaveClass("custom-class");
  });

  /**
   * ✅ Test 4 — Fires onClick event
   *
   * Ensures interaction behavior works as expected.
   */
  it("should fire onClick event when the button is clicked", () => {
    const handleClick = vi.fn();

    render(<GenericButton label={mockLabel} onClick={handleClick} />);

    const button = screen.getByRole("button", { name: mockLabel });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * ✅ Test 5 — Respects the disabled attribute
   *
   * Ensures the button cannot be clicked when disabled.
   */
  it("should not fire onClick when disabled", () => {
    const handleClick = vi.fn();

    render(<GenericButton label={mockLabel} disabled onClick={handleClick} />);

    const button = screen.getByRole("button", { name: mockLabel });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
