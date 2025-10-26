import { Footer } from "../components/Footer";
import { RouteList } from "../routes/RouteList";
import styles from "./styles.module.css";

function App() {
  return (
    <div className={styles.container}>
      <header>
        <h2>MovieDB</h2>
      </header>

      <main>
        <RouteList />
      </main>

      <Footer />
    </div>
  );
}

export default App;
