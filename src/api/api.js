// api.js
export const fetchCats = async () => {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch cats");

    const data = await response.json();

    return data.map((cat) => ({
      ...cat,
      image: cat.image || { url: "/fallback-cat.png" },
    }));
  } catch (error) {
    console.error("Failed to fetch cats:", error);
    return [];
  }
};

export const getFilteredCats = async (query) => {
  const cats = await fetchCats();
  if (!query || query.trim() === "") return cats;

  return cats.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase().trim())
  );
};
