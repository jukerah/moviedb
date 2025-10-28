import { useId } from "react";
import styles from "./styles.module.css";

type LabelPosition = "top" | "left";

export type GenericInputProps = {
  id?: string;
  label: string;
  labelPosition?: LabelPosition;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * GenericInput component
 *
 * A reusable and accessible text input component with configurable label placement.
 * Supports full customization through standard HTML attributes.
 *
 * ---
 * ### Features
 * - Custom label positioning: `"top"` (default) or `"left"`
 * - Forwards all native `<input>` attributes using rest props
 * - Automatically generates a unique `id` when not provided
 * - Works seamlessly as a controlled input with `value` and `onChange`
 *
 * ---
 * ### Accessibility
 * - Proper semantic mapping via `label` + `htmlFor`
 * - Screen-reader friendly: label is visually hidden using `srOnly`, but still conveyed
 * - Fully keyboard accessible with native input behaviors
 *
 * ---
 * ### Props
 * @typedef {Object} GenericInputProps
 * @property {string} [id] - Optional unique identifier for the input. Auto-generated if omitted.
 * @property {string} label - Text label describing the input purpose (required).
 * @property {"top" | "left"} [labelPosition="top"] - Layout option for label positioning.
 * @property {string} [className] - Additional CSS classes for wrapper customization.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} rest - Any other HTML input attributes (e.g., value, placeholder, type, onChange).
 *
 * ---
 * ### Example
 * @component
 * @example
 * ```tsx
 * <GenericInput
 *   label="Search Movies"
 *   placeholder="Buscar filmes..."
 *   value={search}
 *   autoComplete="off"
 *   onChange={(e) => setSearch(e.target.value)}
 * />
 * ```
 *
 * @returns {JSX.Element}
 */
export const GenericInput = ({
  id,
  label,
  labelPosition = "top",
  className = "",
  ...rest
}: GenericInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={`${styles.wrapper} ${styles[labelPosition]} ${className}`}>
      <label htmlFor={inputId} className={styles.srOnly}>
        {label}
      </label>
      <input id={inputId} className={styles.input} {...rest} />
    </div>
  );
};
