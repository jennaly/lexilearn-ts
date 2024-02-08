import { useState } from "react";
import { useWordDataContext } from "../hooks/useWordDataContext";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCard: React.Dispatch<React.SetStateAction<boolean>>;
};
const Searchbar = ({ setLoading, setShowCard }: Props) => {
  const [searchWord, setSearchWord] = useState("");
  const { dataDispatch } = useWordDataContext();

  const getWordData = async (word: string) => {
    const res = await fetch(
      `https://lexilearn-server.cyclic.app/api/dictionary/${word}`
    );

    const data = await res.json();

    return data;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data = await getWordData(searchWord);
    setLoading(false);
    setShowCard(true);

    if (data.definitions) {
      dataDispatch({ type: "GET_WORD_DATA", payload: data });
      setSearchWord("");
    } else {
      dataDispatch({ type: "RESET_WORD_DATA", payload: {} });
    }
  };

  return (
    <div className="max-w-sm my-6 lg:max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row bg-base-100 rounded-full items-center"
      >
        <img src="../../search-icon.png" className="h-11 aspect-auto" />
        <input
          type="search"
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Type here"
          className="w-full bg-base-100 mx-1 lg:mx-2 focus:outline-none font-gaegu text-yellow-700 text-xl lg:text-2xl"
          value={searchWord}
        />
        <button
          type="submit"
          className="bg-yellow-700 m-1 rounded-full text-base-100 tracking-widest font-gaegu hover:bg-yellow-800 hover:border-yellow-800"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
