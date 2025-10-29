import React from "react";
import styles from "./styles.module.css";

export type GenericButtonProps = {
  label: string;
  className?: string;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * GenericButton component
 *
 * A reusable and accessible button component that supports full
 * customization through native HTML button attributes.
 *
 * ---
 * ### Features
 * - Semantic `<button>` for correct accessibility behavior
 * - Optional left-aligned icon
 * - Easily styled using `className`
 * - Works with controlled behaviors via `onClick`, `disabled`, etc.
 *
 * ---
 * ### Accessibility
 * - Fully keyboard accessible using native button behavior
 * - Screen-reader friendly: label text is always exposed
 * - Supports accessible states automatically when using `disabled`, `type`, etc.
 *
 * ---
 * ### Props
 * @typedef {Object} GenericButtonProps
 * @property {string} label - Visible text content of the button
 * @property {string} [className] - Additional CSS classes to customize styling
 * @property {React.ReactNode} [icon] - Optional icon rendered before the label
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} rest - Any other native button props (e.g. `onClick`, `disabled`, `type`)
 *
 * ---
 * ### Example
 * @component
 * @example
 * ```tsx
 * <GenericButton
 *   label="Add to Favorites"
 *   icon="⭐"
 *   onClick={() => console.log("Favorited!")}
 * />
 * ```
 *
 * ---
 * @returns {JSX.Element} A styled and flexible button element
 */
export const GenericButton = ({
  label,
  className = "",
  icon,
  ...rest
}: GenericButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </button>
  );
};
