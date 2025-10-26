import styles from "./styles.module.css";

/**
 * Application footer component that displays:
 * - Copyright
 * - Educational disclaimer
 * - Attribution to The Movie Database (TMDB)
 *
 * Accessibility:
 * - Uses the semantic `<footer>` tag, automatically providing the ARIA `contentinfo` landmark.
 * - Contains descriptive text and accessible link for TMDB.
 *
 * Security:
 * - The TMDB link includes `rel="noopener noreferrer"` to prevent tab hijacking.
 * - Opens external links in a new tab for better UX.
 *
 * @component
 * @returns {JSX.Element} The footer section with copyright,
 * educational disclaimer, and TMDB attribution link.
 *
 * @example
 * ```tsx
 * import { Footer } from "./Footer";
 *
 * function App() {
 *   return (
 *     <div>
 *       <Footer />
 *     </div>
 *   );
 * }
 * ```
 */
export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        © 2025 MovieDB — Projeto sem fins lucrativos, desenvolvido apenas para
        fins educacionais.
      </p>
      <p>
        Este aplicativo utiliza a API do{" "}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Movie Database (TMDB)
        </a>
        , mas não é endossado ou certificado por ela.
      </p>
    </footer>
  );
};
