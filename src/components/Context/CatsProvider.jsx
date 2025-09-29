import CatsContext from "./CatsContext";
import { useState, useMemo, useEffect } from "react";

const CatsProvider = ({ children }) => {
  const [cats, setCats] = useState([]);

  // Fetch breeds and make sure each cat has a url
  useEffect(() => {
    const fetchCats = async () => {
      const res = await fetch("https://api.thecatapi.com/v1/breeds");
      const data = await res.json();

      const catsWithImages = await Promise.all(
        data.map(async (cat) => {
          if (cat.image?.url) {
            return { ...cat, url: cat.image.url };
          }

          if (cat.reference_image_id) {
            try {
              const imgRes = await fetch(
                `https://api.thecatapi.com/v1/images/${cat.reference_image_id}`
              );
              const imgData = await imgRes.json();
              return { ...cat, url: imgData.url || null };
            } catch (error) {
              console.error("Error fetching image:", error);
              return { ...cat, url: null };
            }
          }

          return { ...cat, url: null };
        })
      );

      setCats(catsWithImages);
    };

    fetchCats();
  }, []);

  // Derived state: favourite cats (liked)
  const favouriteCats = useMemo(() => cats.filter((cat) => cat.liked), [cats]);

  // Derived state: adopted cats
  const adoptedCats = useMemo(() => cats.filter((cat) => cat.adopted), [cats]);

  return (
    <CatsContext.Provider value={{ cats, setCats, favouriteCats, adoptedCats }}>
      {children}
    </CatsContext.Provider>
  );
};

export default CatsProvider;
