import { useContext } from "react";
import CatCard from "./CatCard";
import CatsContext from "./Context/CatsContext";
import ErrorHandling from "./ErrorHandling";
import styles from "./FavouriteCats.module.css";

/**
 * Component to display favourite cats
 * @param {function} handleToggle - Toggle function for showing/hiding additional info
 * @param {string|null} selectedCatId - ID of the currently selected cat
 */
const FavouriteCats = ({ handleToggle, selectedCatId }) => {
  const { favouriteCats } = useContext(CatsContext);

  return (
    <>
      {favouriteCats.length === 0 ? (
        // Show message when no favourite cats
        <ErrorHandling message="No favourite cats yet!" />
      ) : (
        // Container for all cat cards
        <div className={styles.cardsContainer}>
          {favouriteCats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              isInfoShown={selectedCatId === cat.id} // Check if this card should be expanded
              onToggle={() => handleToggle(cat.id)} // Toggle info visibility
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FavouriteCats;
