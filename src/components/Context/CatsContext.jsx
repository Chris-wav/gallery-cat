import { createContext } from "react";

// Create a context to share cats data across the app
const CatsContext = createContext({
  cats: [], // All cats
  setCats: () => {}, // Function to update cats
  favouriteCats: [], // Filtered list of liked cats
  adoptedCats: [], // Filtered list of adopted cats
});

export default CatsContext;
