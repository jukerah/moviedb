import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import { VoteAverageBadge } from "../VoteAverageBadge";

type MovieCardProps = {
  id: number;
  title: string;
  voteAverage: number;
  posterPath?: string | null;
  search?: string;
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
 * - The title (also linked), including automatic highlight when matching `search`
 * - The TMDB rating badge
 * - An action button (heart by default or custom via `actionButton`)
 *
 * ---
 * ### Behavior
 * - When the `search` prop is provided, matching text inside the title is **visually highlighted**
 *   to support search result context.
 * - By default, the card includes a **heart icon** button that toggles the movie as favorite.
 * - You can optionally supply a **custom `actionButton`** (e.g., trash icon) which overrides
 *   the default favorite button. This is useful when rendering a list of movies already marked
 *   as favorites.
 * - The poster and title both navigate to the movie’s details page (`/movie/:id`).
 * - The tooltip automatically repositions to stay visible inside the screen boundaries.
 *
 * ---
 * ### Props
 * @typedef {Object} MovieCardProps
 * @property {number} id - The unique movie ID from TMDB.
 * @property {string} title - The movie title.
 * @property {number} voteAverage - The average TMDB rating (0–10 scale).
 * @property {string | null} [posterPath] - Optional relative path to the movie poster image.
 * @property {string} [search] - Optional search term. When provided, any matching text found in the title
 *   will be highlighted to improve visibility in search results.
 * @property {Object} [actionButton] - Optional custom action button configuration.
 * @property {React.ReactNode} actionButton.icon - The icon or element to render (e.g., 🗑).
 * @property {string} actionButton.label - Accessible label and tooltip text for the button.
 * @property {(id: number) => void} actionButton.onClick - Callback executed when the button is clicked.
 * @property {boolean} [actionButton.isActive] - Optional active state flag for styling or accessibility.
 *
 * ---
 * ### Accessibility
 * - Each card is wrapped in an `<article>` with `aria-label` describing the movie.
 * - The action button exposes `aria-pressed` when toggling favorite state.
 * - Tooltips and labels support assistive technologies.
 * - Tooltip position adjusts automatically when close to screen edges.
 *
 * @component
 * @returns {JSX.Element} The styled movie card with poster, highlightable title, rating, and custom action button support.
 */
export const MovieCard = ({
  id,
  title,
  voteAverage,
  posterPath,
  search,
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

  const removeAccents = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const getHighlightedTitle = () => {
    if (!search || search.trim() === "") return title;

    const normalizedSearch = removeAccents(search).toLowerCase();
    const normalizedTitle = removeAccents(title);

    const regex = new RegExp(`(${normalizedSearch})`, "gi");

    const parts = normalizedTitle.split(regex);

    let currentIndex = 0;
    return parts.map((part, index) => {
      const originalPart = title.slice(
        currentIndex,
        currentIndex + part.length
      );
      currentIndex += part.length;

      return regex.test(part) ? (
        <span key={index} className={styles.highlight}>
          {originalPart}
        </span>
      ) : (
        originalPart
      );
    });
  };

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
          {getHighlightedTitle()}
        </Link>

        <VoteAverageBadge value={voteAverage} />
      </footer>
    </article>
  );
};
