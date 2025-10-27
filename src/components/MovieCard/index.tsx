import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useFavorites } from "../../hooks/useFavorites";

type MovieCardProps = {
  id: number;
  title: string;
  voteAverage: number;
  posterPath?: string | null;
  /** Optional custom action button (e.g., trash for favorites page) */
  actionButton?: {
    icon: React.ReactNode;
    label: string;
    onClick: (id: number) => void;
    isActive?: boolean;
  };
};

/**
 * MovieCard component that displays a single movie item.
 *
 * It shows:
 * - The movie poster (with link to the movie details page)
 * - The title (also linked)
 * - The TMDB rating badge
 * - An action button (heart by default or custom via `actionButton`)
 *
 * ---
 * ### Behavior
 * - By default, the card includes a **heart icon** button that toggles the movie as favorite
 *   using the global `useFavorites` context.
 * - You can optionally provide a **custom `actionButton`** (e.g., a trash icon)
 *   to replace the default heart button — perfect for use on the Favorites page.
 * - The poster and title both navigate to the movie’s details page (`/movie/:id`).
 * - The tooltip automatically repositions to stay visible within the screen boundaries.
 *
 * ---
 * ### Props
 * @typedef {Object} MovieCardProps
 * @property {number} id - The unique movie ID from TMDB.
 * @property {string} title - The movie title.
 * @property {number} voteAverage - The average TMDB rating (0–10 scale).
 * @property {string | null} [posterPath] - Optional relative path to the movie poster image.
 * @property {Object} [actionButton] - (Optional) Custom action button configuration.
 * @property {React.ReactNode} actionButton.icon - The icon or element to render (e.g., 🗑).
 * @property {string} actionButton.label - Accessible label and tooltip text for the button.
 * @property {(id: number) => void} actionButton.onClick - Callback executed when the button is clicked.
 * @property {boolean} [actionButton.isActive] - Optional active state flag for styling or accessibility.
 *
 * ---
 * ### Accessibility
 * - Each card is wrapped in an `<article>` with an `aria-label` describing the movie.
 * - The action button uses `aria-pressed` when toggling favorites.
 * - Tooltips and labels are dynamically generated for assistive technologies.
 * - Tooltip position adjusts automatically when close to screen edges.
 *
 * ---
 * ### Usage Examples
 * ```tsx
 * // Default usage (heart toggle)
 * <MovieCard
 *   id={603}
 *   title="The Matrix"
 *   voteAverage={8.7}
 *   posterPath="/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
 * />
 *
 * // Custom button (trash icon for removing from favorites)
 * <MovieCard
 *   id={603}
 *   title="The Matrix"
 *   voteAverage={8.7}
 *   posterPath="/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
 *   actionButton={{
 *     icon: "🗑",
 *     label: "Remover dos favoritos",
 *     onClick: (id) => removeFavorite(id),
 *   }}
 * />
 * ```
 *
 * @component
 * @returns {JSX.Element} The styled movie card with poster, title, rating, and optional custom action button.
 */

export const MovieCard = ({
  id,
  title,
  voteAverage,
  posterPath,
  actionButton,
}: MovieCardProps) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = !!favorites[id];
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<{
    x: number;
    y: number;
    align: "center" | "left" | "right";
  }>({
    x: 0,
    y: 0,
    align: "center",
  });

  const posterSrc = posterPath
    ? `https://image.tmdb.org/t/p/w300/${posterPath}`
    : undefined;

  const handleClick = () => {
    if (actionButton) {
      actionButton.onClick(id);
    } else {
      toggleFavorite(id);
    }
  };

  // Tooltip positioning with edge detection
  const handleMouseEnter = () => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;

    const tooltipWidth = 160; // approximate tooltip width in px
    const margin = 40;
    const screenWidth = window.innerWidth;

    let align: "center" | "left" | "right" = "center";
    let x = rect.left + rect.width / 2;

    // Check for right edge overflow
    if (x + tooltipWidth / 2 + margin > screenWidth) {
      x = screenWidth - tooltipWidth / 2 - margin;
      align = "right";
    }
    // Check for left edge overflow
    else if (x - tooltipWidth / 2 - margin < 0) {
      x = tooltipWidth / 2 + margin;
      align = "left";
    }

    const y = rect.top + rect.height + 10;
    setTooltipStyle({ x, y, align });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => setTooltipVisible(false);

  const ariaLabel = actionButton
    ? actionButton.label
    : isFavorite
    ? "Remover dos favoritos"
    : "Adicionar aos favoritos";

  const icon = actionButton ? actionButton.icon : "❤";

  return (
    <article className={styles.card} aria-label={`Filme: ${title}`}>
      <div className={styles.posterWrapper}>
        {posterSrc ? (
          <Link
            to={`/movie/${id}`}
            aria-label={`Ver o pôster e detalhes do filme ${title}`}
          >
            <img
              src={posterSrc}
              alt={`Poster de ${title}`}
              className={styles.poster}
              loading="lazy"
            />
          </Link>
        ) : (
          <div className={styles.posterPlaceholder} aria-hidden="true">
            Poster do Filme
          </div>
        )}

        <button
          ref={btnRef}
          type="button"
          className={`${styles.favBtn} ${
            isFavorite && !actionButton ? styles.favActive : ""
          }`}
          aria-pressed={isFavorite}
          aria-label={ariaLabel}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className={styles.favIcon} aria-hidden="true">
            {icon}
          </span>
        </button>

        {/* Tooltip fora do botão */}
        {tooltipVisible && (
          <span
            className={`${styles.tooltip} ${
              styles[`align-${tooltipStyle.align}`]
            }`}
            style={{
              left: `${tooltipStyle.x}px`,
              top: `${tooltipStyle.y}px`,
            }}
          >
            {ariaLabel}
          </span>
        )}
      </div>

      <footer className={styles.cardFooter}>
        <Link
          to={`/movie/${id}`}
          className={styles.title}
          aria-label={`Abrir página de detalhes do filme ${title}`}
        >
          {title}
        </Link>
        <div>
          <span
            className={styles.badge}
            aria-label={`Nota TMDB ${voteAverage}`}
          >
            {voteAverage.toFixed(1)}
          </span>
        </div>
      </footer>
    </article>
  );
};
