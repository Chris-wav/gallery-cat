import styles from "./TaskBar.module.css";
import { getFilteredCats } from "../../api/api";
import { useEffect } from "react";

const TaskBar = ({
  setSearchedCatResults, // function to update filtered cat results
  searchedCat, // current search input
  setView, // function to switch view (home/favourites/adopted)
  setSearchedCat, // function to update the search input state
}) => {
  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchedCat.trim()) {
        // Fetch filtered cats from API
        const results = await getFilteredCats(searchedCat);
        setSearchedCatResults(results);
      } else {
        // Clear results if input is empty
        setSearchedCatResults([]);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer); // cleanup previous timer
  }, [searchedCat, setSearchedCatResults]);

  // Update search input state
  const handleInput = (e) => {
    setSearchedCat(e.target.value.toLowerCase());
  };

  return (
    <div className={styles.navContainer}>
      {/* Search input */}
      <div className={styles.searchWrapper}>
        <input
          className={styles.searchBar}
          type="text"
          value={searchedCat}
          placeholder="cat breed"
          onChange={handleInput}
        />
      </div>

      {/* View buttons */}
      <div className={styles.buttonWrapper}>
        <button
          className={styles.favouritesButton}
          onClick={() => setView("favourites")}
        >
          Show favourites
        </button>
        <button
          className={styles.adoptedButton}
          onClick={() => setView("adopted")}
        >
          Show adopted
        </button>
        <button
          className={styles.backToHomeButton}
          onClick={() => {
            setView("home");
            setSearchedCat("");
            setSearchedCatResults([]);
          }}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default TaskBar;
