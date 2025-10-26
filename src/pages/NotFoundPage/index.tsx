import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>Desculpe, essa página não existe.</h1>
      <br />
      <Link to={"/"}>Página inicial</Link>
    </>
  );
};

export default NotFoundPage;
