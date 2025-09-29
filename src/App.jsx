import Header from "./components/Header";
import Main from "./components/Main";
import TaskBar from "./components/taskbar/TaskBar";
import FavouriteCats from "./components/FavouriteCats";
import AdoptedCats from "./components/AdoptedCats";
import { useState } from "react";

/**
 * Root component of the application
 * Manages global state for search, view mode, and selected cat
 */
function App() {
  // State for storing search results
  const [searchedCatResults, setSearchedCatResults] = useState([]);
  // Current search string
  const [searchedCat, setSearchedCat] = useState("");
  // Current view: "home", "favourites", or "adopted"
  const [view, setView] = useState("home");
  // ID of currently selected cat to show extra info
  const [selectedCatId, setSelectedCatId] = useState(null);

  /**
   * Toggle the info display for a cat
   * @param {string|number} id - The cat's ID
   */
  const handleToggle = (id) => {
    setSelectedCatId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* App header */}
      <Header />

      {/* Task bar for search and view switching */}
      <TaskBar
        setSearchedCatResults={setSearchedCatResults}
        searchedCat={searchedCat}
        setView={setView}
        setSearchedCat={setSearchedCat}
      />

      {/* Render the appropriate view */}
      {view === "home" && (
        <Main
          searchedCatResults={searchedCatResults}
          searchedCat={searchedCat}
          handleToggle={handleToggle}
          selectedCatId={selectedCatId}
        />
      )}
      {view === "favourites" && (
        <FavouriteCats
          handleToggle={handleToggle}
          selectedCatId={selectedCatId}
        />
      )}
      {view === "adopted" && (
        <AdoptedCats
          handleToggle={handleToggle}
          selectedCatId={selectedCatId}
        />
      )}
    </>
  );
}

export default App;
