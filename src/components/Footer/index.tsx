import styles from "./styles.module.css";

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
