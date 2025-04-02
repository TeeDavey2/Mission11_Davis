import { useEffect, useState } from "react";
import "./CategoryFilter.css";

//API
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  // const [sortByTitle, setSortByTitle] = useState<boolean>(false);

  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://mission13-davis-backend.azurewebsites.net/Book/GetBookCategories"
        );
        const data = await response.json();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Functions
  // const handleSortToggle = () => {
  //   setSortByTitle(!sortByTitle);
  // };

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? // If true
        selectedCategories.filter((c) => c !== target.value)
      : // If false
        [...selectedCategories, target.value];

    //Pass to selected categories
    setSelectedCategories(updatedCategories);
  }

  // Render
  return (
    <div className="category-filter">
      <h5>Categories</h5>
      <div className="category-list">
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              name={c}
              value={c}
              className="category-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
      {/* Sort Button */}
      {/* <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-primary" onClick={handleSortToggle}>
            {sortByTitle ? "Unsort" : "Sort by Title"}
          </button>
        </div> */}
    </div>
  );
}

export default CategoryFilter;
