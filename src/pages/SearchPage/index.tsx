import { useSearch } from "../../hooks/useSearch";

const SearchPage = () => {
  const { search } = useSearch();

  return (
    <section>
      <h1>SearchPage</h1>
      <p>{search}</p>
    </section>
  );
};

export default SearchPage;
