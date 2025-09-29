import { useContext } from "react";
import CatCard from "./CatCard";
import styles from "./AdoptedCats.module.css";
import CatsContext from "./Context/CatsContext";
import ErrorHandling from "./ErrorHandling";

const AdoptedCats = ({ handleToggle, selectedCatId }) => {
  // Get adopted cats from context
  const { adoptedCats } = useContext(CatsContext);

  return (
    <>
      {adoptedCats.length === 0 ? (
        // Show error message if no adopted cats
        <ErrorHandling message="No adopted cats yet!" />
      ) : (
        // Display all adopted cats
        <div className={styles.cardsContainer}>
          {adoptedCats.map((cat) => (
            <CatCard
              key={cat.id} // unique key for React
              cat={cat} // cat data
              isInfoShown={selectedCatId === cat.id} // toggle info panel if selected
              onToggle={() => handleToggle(cat.id)} // toggle info on button click
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AdoptedCats;
