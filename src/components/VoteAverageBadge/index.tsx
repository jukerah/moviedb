import styles from "./styles.module.css";

type VoteAverageBadgeProps = {
  value: number;
};

export const VoteAverageBadge = ({ value }: VoteAverageBadgeProps) => {
  return (
    <span className={styles.badge} aria-label={`Nota TMDB ${value}`}>
      {value.toFixed(1)}
    </span>
  );
};
