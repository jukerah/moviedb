import styles from "./styles.module.css";

type VoteAverageBadgeProps = {
  value: number;
};

/**
 * VoteAverageBadge component
 *
 * Displays the movie’s TMDB rating as a rounded badge with accessible labeling.
 *
 * ---
 * ### Features
 * - Shows the vote average with 1 decimal place formatting
 * - Visual indicator to quickly assess movie rating
 *
 * ---
 * ### Accessibility
 * - Uses `aria-label` to announce rating value for screen readers
 *
 * ---
 * ### Props
 * @typedef {Object} VoteAverageBadgeProps
 * @property {number} value - The TMDB vote average (0–10 scale)
 *
 * ---
 * @example
 * ```tsx
 * <VoteAverageBadge value={7.8} />
 * ```
 *
 * @returns {JSX.Element}
 */
export const VoteAverageBadge = ({ value }: VoteAverageBadgeProps) => {
  return (
    <span className={styles.badge} aria-label={`Nota TMDB ${value}`}>
      {value.toFixed(1)}
    </span>
  );
};
