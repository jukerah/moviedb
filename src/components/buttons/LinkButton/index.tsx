import { Link, type LinkProps } from "react-router-dom";
import styles from "./styles.module.css";

export type LinkButtonProps = {
  label: string;
  className?: string;
  icon?: React.ReactNode;
} & LinkProps;

/**
 * LinkButton component
 *
 * A reusable styled link that behaves like a button.
 * Can display an optional icon and supports full customization through
 * standard React Router `Link` props.
 *
 * ---
 * ### Features
 * - Works as a link with `to` prop while visually styled as a button
 * - Optional icon support
 * - Accepts any standard `Link` props (e.g., `replace`, `target`, `state`)
 * - Customizable styling via `className`
 *
 * ---
 * ### Accessibility
 * - Screen-reader friendly: uses semantic `<a>` tag via `Link`
 * - Icon is decorative; label is always visible for assistive tech
 * - Fully keyboard navigable
 *
 * ---
 * ### Props
 * @typedef {Object} LinkButtonProps
 * @property {string} label - Text label displayed inside the link button
 * @property {string} [className] - Optional CSS class to customize styling
 * @property {React.ReactNode} [icon] - Optional icon displayed before label
 * @property {LinkProps} rest - Any other props supported by React Router `Link`
 *
 * ---
 * ### Example
 * @component
 * @example
 * ```tsx
 * <LinkButton
 *   to="/"
 *   label="Go Home"
 *   icon="🏠"
 *   className="myCustomClass"
 *   target="_blank"
 * />
 * ```
 *
 * ---
 * @returns {JSX.Element} A styled link element that behaves like a button
 */
export const LinkButton = ({
  label,
  className = "",
  icon,
  ...rest
}: LinkButtonProps) => {
  return (
    <Link className={`${styles.linkButton} ${className}`} {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </Link>
  );
};
