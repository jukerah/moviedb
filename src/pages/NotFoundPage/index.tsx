import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const NotFoundPage = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>
          Ops! A página que você está procurando não existe.
        </p>
        <Link to="/" className={styles.homeLink}>
          Voltar para a página inicial
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
