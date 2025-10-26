import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { useSearch } from "../../hooks/useSearch";

/**
 * Application header component that renders:
 * - The MovieDB logo
 * - Search bar (connected to global search context)
 * - Navigation links for Home and Favorites
 * - A responsive mobile menu with slide animation
 *
 * Accessibility:
 * - Uses proper ARIA roles and labels
 * - Provides keyboard and screen reader support
 *
 * @component
 * @returns {JSX.Element} The header layout with navigation and search.
 */
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { search, setSearch } = useSearch();

  return (
    <header className={styles.header} role="banner">
      {/* 🎬 LOGO */}
      <NavLink
        to="/"
        className={styles.logoArea}
        aria-label="Página inicial do MovieDB"
      >
        <span aria-hidden="true" className={styles.logoIcon}>
          🎬
        </span>
        <span className={styles.logoText}>MovieDB</span>
      </NavLink>

      {/* 🍔 MENU ICON (mobile only) */}
      <button
        className={`${styles.menuIcon} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={
          menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
        }
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        <span aria-hidden="true"></span>
      </button>

      {/* 🔍 SEARCH BAR */}
      <div className={styles.searchArea}>
        <label htmlFor="search" className={styles.srOnly}>
          Buscar filmes
        </label>
        <input
          id="search"
          type="text"
          placeholder="Buscar filmes..."
          className={styles.searchInput}
          aria-label="Campo de busca de filmes"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* 🧭 DESKTOP NAVIGATION */}
      <nav className={styles.nav} aria-label="Navegação principal do site">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          Favoritos
        </NavLink>
      </nav>

      {/* 📱 MOBILE NAVIGATION OVERLAY */}
      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${
          menuOpen ? styles.showMobileNav : ""
        }`}
        aria-label="Navegação móvel"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.mobileActive : ""}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.mobileActive : ""}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Favoritos
        </NavLink>
      </nav>
    </header>
  );
};
