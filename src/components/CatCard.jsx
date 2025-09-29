import { useContext, useState } from "react";
import styles from "./CatCard.module.css";
import CatsContext from "./Context/CatsContext";

const CatCard = ({ cat, isInfoShown, onToggle }) => {
  const { setCats } = useContext(CatsContext);
  const [imgError, setImgError] = useState(false);

  const handleLike = (id) => {
    setCats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c))
    );
  };

  const handleAdopt = (id) => {
    setCats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, adopted: !c.adopted } : c))
    );
  };

  const imageUrl = !imgError && cat.url ? cat.url : null;
  console.log(cat);

  return (
    <div className={styles.card}>
      <div className={styles.catImageWrapper}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={cat.name || "Cat"}
            className={styles.catImage}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            🐱
            <p className={styles.placeholderText}>No cute cat photo yet! 😸</p>
          </div>
        )}
      </div>

      <h2 className={styles.breed}>{cat.name}</h2>
      <h4 className={styles.origin}>From: {cat.origin}</h4>
      <h4 className={styles.lifespan}>Lifespan: {cat.life_span} years</h4>

      <div className={styles.buttonsContainer}>
        <button className={styles.favourite} onClick={() => handleLike(cat.id)}>
          {cat.liked ? "❤️" : "🤍"}
        </button>
        <button
          className={styles.adoptButton}
          onClick={() => handleAdopt(cat.id)}
        >
          {cat.adopted ? "Adopted ✔️" : "Adopt"}
        </button>
      </div>

      <button onClick={onToggle}>
        {isInfoShown ? "Hide info 🔽" : "Show info 🔼"}
      </button>

      <div
        className={`${styles.infoContainer} ${isInfoShown ? styles.show : ""}`}
      >
        <h3>Cuddles: {"❤️".repeat(cat.affection_level)}</h3>
        <h3>Child Friendly: {"👶".repeat(cat.child_friendly)}</h3>
        <h3>Energetic: {"⚡".repeat(cat.energy_level)}</h3>
        <h3>Intelligence: {"🧠".repeat(cat.intelligence)}</h3>
      </div>
    </div>
  );
};

export default CatCard;
