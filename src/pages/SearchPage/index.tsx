import { useSearch } from "../../hooks/useSearch";

const SearchPage = () => {
  const [searchValue] = useSearch();

  return (
    <section>
      <h1>SearchPage</h1>
      <p>{searchValue}</p>
    </section>
  );
};

export default SearchPage;
