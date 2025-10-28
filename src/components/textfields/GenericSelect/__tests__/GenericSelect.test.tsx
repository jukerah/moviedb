import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GenericSelect } from "../index";
import { useState } from "react";
import "@testing-library/jest-dom";

/**
 * 🧩 Test Suite: GenericSelect Component
 *
 * Validates that the GenericSelect component:
 * - Renders label correctly and links to <select>
 * - Displays provided options inside dropdown
 * - Handles provided or auto-generated IDs
 * - Supports custom label positioning (top/left)
 * - Respects controlled value + change handler
 */
describe("GenericSelect component", () => {
  const mockOptions = [
    { label: "Action", value: "action" },
    { label: "Drama", value: "drama" },
  ];

  /**
   * ✅ Test 1 — Labels are rendered and associated correctly
   *
   * Ensures that the `<label>` element references the `<select>` element
   * and both appear visibly in the document.
   */
  it("should render a label linked to the select element", () => {
    render(<GenericSelect label="Genre" options={mockOptions} />);

    const label = screen.getByText("Genre");
    const select = screen.getByLabelText("Genre");

    expect(label).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  /**
   * ✅ Test 2 — Options are rendered properly
   *
   * Ensures all provided options appear inside the `<select>` element.
   */
  it("should render all provided options in the dropdown", () => {
    render(<GenericSelect label="Genre" options={mockOptions} />);

    mockOptions.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  /**
   * ✅ Test 3 — Should respect custom ID when passed
   *
   * Ensures the select element uses the provided id
   * and the label references it correctly.
   */
  it("should use the provided id when passed", () => {
    render(
      <GenericSelect id="custom-id" label="Genre" options={mockOptions} />
    );

    const select = screen.getByLabelText("Genre");
    expect(select.id).toBe("custom-id");
  });

  /**
   * ✅ Test 4 — Should generate a unique id when not provided
   *
   * Confirms that `useId()` fallback applies a valid id
   * and accessibility link is maintained.
   */
  it("should generate a unique id when id is not provided", () => {
    render(<GenericSelect label="Genre" options={mockOptions} />);

    const select = screen.getByLabelText("Genre");
    const label = screen.getByText("Genre");

    expect(select.id).toBeTruthy();
    expect(label).toHaveAttribute("for", select.id);
  });

  /**
   * ✅ Test 5 — Should apply wrapper CSS classes based on label position
   *
   * When labelPosition="left", ensures layout class is applied.
   */
  it("should apply correct CSS class when labelPosition is left", () => {
    render(
      <GenericSelect label="Genre" options={mockOptions} labelPosition="left" />
    );

    const wrapper = screen.getByText("Genre").parentElement!;
    expect(wrapper.className).toMatch(/left/);
  });

  /**
   * ✅ Test 6 — Respects the controlled value behavior
   *
   * Ensures that when `value` is provided,
   * the select reflects the selection correctly.
   */
  it("should set the controlled value when provided", () => {
    render(<GenericSelect label="Genre" options={mockOptions} value="drama" />);

    const select = screen.getByLabelText("Genre") as HTMLSelectElement;
    expect(select.value).toBe("drama");
  });

  /**
   * ✅ Test 7 — Updates value when user selects another option
   *
   * Simulates a selection change in a controlled component
   * and validates that the select reflects the new value.
   */
  it("should call onChange when a different option is selected", () => {
    const Wrapper = () => {
      const [value, setValue] = useState("action");
      return (
        <GenericSelect
          label="Genre"
          options={mockOptions}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };

    render(<Wrapper />);

    const select = screen.getByLabelText("Genre") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "drama" } });

    expect(select.value).toBe("drama");
  });
});
