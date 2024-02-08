import { FavoriteWord } from "@/context/FavoriteWordsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFavoriteWordsContext } from "../hooks/useFavoriteWordsContext";
import { useWordDataContext } from "../hooks/useWordDataContext";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCard: React.Dispatch<React.SetStateAction<boolean>>;
};

const Favorites = ({ setLoading, setShowCard }: Props) => {
  const { user } = useAuthContext();
  const { favoriteWords, dispatch } = useFavoriteWordsContext();
  const { dataDispatch } = useWordDataContext();

  const getWordData = async (word: string) => {
    const res = await fetch(
      `https://lexilearn-server.cyclic.app/api/dictionary/${word}`
    );

    const data = await res.json();

    return data;
  };

  const handleSubmit = async (word: string) => {
    setLoading(true);

    const data = await getWordData(word);
    setLoading(false);
    dataDispatch({ type: "GET_WORD_DATA", payload: data });
    setShowCard(true);
  };

  const removeWordFromFavorites = (
    e: React.MouseEvent<HTMLButtonElement>,
    word: FavoriteWord
  ) => {
    e.stopPropagation();

    if (user) {
      const removeWordFromDB = async (word: FavoriteWord) => {
        const { _id } = word;

        const res = await fetch(
          `https://lexilearn-server.cyclic.app/api/favoriteWords/${_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          dispatch({ type: "DELETE_FAVORITE_WORD", payload: data });
        }
      };

      removeWordFromDB(word);
    } else {
      dispatch({ type: "DELETE_FAVORITE_WORD", payload: word });
    }
  };

  return (
    <div className="max-w-sm my-5 lg:max-w-xl mx-auto flex flex-wrap gap-8 justify-center">
      {favoriteWords.length > 0 &&
        favoriteWords.map((word, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSubmit(favoriteWords[index].term)}
              className="inline-block lg:mx-4 py-4 px-8 font-gaegu text-yellow-700 text-xl sticky-note relative"
            >
              <span className="p-2">{word.term}</span>
              <div className="absolute -right-2 -top-2">
                <button
                  onClick={(e) => removeWordFromFavorites(e, word)}
                  className="rounded-full bg-base-100 p-2 hover:border hover:border-yellow-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Favorites;
