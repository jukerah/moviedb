import styles from "./styles.module.css";
import { RouteList } from "../routes/RouteList";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

function App() {
  return (
    <div className={styles.container}>
      <Header />

      <main>
        <RouteList />
      </main>

      <Footer />
    </div>
  );
}

export default App;
