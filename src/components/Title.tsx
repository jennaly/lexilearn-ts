import { Link } from "react-router-dom";

const Title = () => {
  return (
    <Link to="/">
      <h1 className="w-fit mx-auto font-fredoka-one font-semibold uppercase text-yellow-700 tracking-widest text-5xl lg:text-7xl text-center text-yellow-700 hover:text-yellow-800">
        Lexi &bull; Learn
      </h1>
    </Link>
  );
};

export default Title;
