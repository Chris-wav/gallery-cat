import { useContext, useEffect } from "react";
import { fetchCats } from "../api/api";
import CatCard from "./CatCard";
import styles from "./Main.module.css";
import CatsContext from "./Context/CatsContext";

/**
 * Main component to display all cats or filtered search results
 * @param {string|null} selectedCatId - ID of the currently selected cat
 * @param {function} handleToggle - Function to toggle info display for a cat
 * @param {array} searchedCatResults - Array of cats matching search query
 * @param {string} searchedCat - Current search string
 */
const Main = ({
  selectedCatId,
  handleToggle,
  searchedCatResults,
  searchedCat,
}) => {
  const { cats, setCats } = useContext(CatsContext);

  // Fetch all cats on component mount
  useEffect(() => {
    const getCats = async () => {
      const data = await fetchCats();
      if (!data) return;
      // Add default properties to each cat
      const updated = data.map((cat) => ({
        ...cat,
        liked: false,
        adopted: false,
      }));
      setCats(updated);
    };
    getCats();
  }, [setCats]);

  return (
    <div className={styles.cardsContainer}>
      {searchedCatResults.length > 0 && searchedCat
        ? // Show filtered search results if available
          searchedCatResults.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              isInfoShown={selectedCatId === cat.id} // Expand if selected
              onToggle={() => handleToggle(cat.id)}
            />
          ))
        : // Otherwise show all cats
          cats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              isInfoShown={selectedCatId === cat.id} // Expand if selected
              onToggle={() => handleToggle(cat.id)}
            />
          ))}
    </div>
  );
};

export default Main;
