import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GenericInput } from "../index";
import { useState } from "react";
import "@testing-library/jest-dom";

/**
 * 🧩 Test Suite: GenericInput Component
 *
 * Validates that the GenericInput component:
 * - Renders label correctly and links to <input>
 * - Automatically hides label visually but keeps accessibility
 * - Handles provided or auto-generated IDs
 * - Supports custom label positioning (top/left)
 * - Respects controlled value + change handler
 */
describe("GenericInput component", () => {
  /**
   * ✅ Test 1 — Label is rendered and associated correctly
   *
   * Ensures that the `<label>` element references the `<input>` element
   * and that accessibility connection is valid.
   */
  it("should render a label linked to the input element", () => {
    render(<GenericInput label="Search" />);

    const input = screen.getByLabelText("Search");
    expect(input).toBeInTheDocument();
  });

  /**
   * ✅ Test 2 — Should use provided ID
   *
   * Ensures `<input>` uses explicit id
   * and `<label>` respects it via `htmlFor`.
   */
  it("should use the provided id when passed", () => {
    render(<GenericInput id="custom-id" label="Search" />);

    const input = screen.getByLabelText("Search");
    expect(input.id).toBe("custom-id");
  });

  /**
   * ✅ Test 3 — Should auto-generate ID when omitted
   *
   * Confirms `useId()` fallback is applied
   * and label references it correctly.
   */
  it("should generate a unique id when id is not provided", () => {
    render(<GenericInput label="Search" />);

    const input = screen.getByLabelText("Search");
    expect(input.id).toBeTruthy();
  });

  /**
   * ✅ Test 4 — Applies correct wrapper class for labelPosition="left"
   *
   * Validates that layout is controlled via CSS classes.
   */
  it("should apply correct CSS class when labelPosition is left", () => {
    render(<GenericInput label="Search" labelPosition="left" />);

    const wrapper = screen.getByLabelText("Search").parentElement!;
    expect(wrapper.className).toMatch(/left/);
  });

  /**
   * ✅ Test 5 — Controlled behavior respected
   *
   * Ensures that when `value` is passed,
   * it is properly reflected in the UI.
   */
  it("should set the controlled value when provided", () => {
    render(<GenericInput label="Search" value="Batman" />);

    const input = screen.getByLabelText("Search") as HTMLInputElement;
    expect(input.value).toBe("Batman");
  });

  /**
   * ✅ Test 6 — onChange updates controlled state
   *
   * Simulates typing and ensures new value is applied.
   */
  it("should call onChange and update value when typing", () => {
    const Wrapper = () => {
      const [value, setValue] = useState("");
      return (
        <GenericInput
          label="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };

    render(<Wrapper />);

    const input = screen.getByLabelText("Search") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Avatar" } });

    expect(input.value).toBe("Avatar");
  });
});
