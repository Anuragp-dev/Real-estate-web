import React from "react";
import "./SearchBar.scss";
const SearchBar = () => {
  const types = ["buy", "rent"];

  const [query, setQuery] = React.useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0
  })

  const switchType = (value) => {
    setQuery((prev) => ({ ...prev, type: value }))
  }

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button className={query.type === type ? "active" : ""} key={type} onClick={() => switchType(type)}>{type}</button>
        ))}
      </div>
      <form>
        <input type="text" name="location" placeholder="Enter City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={100000000}
          placeholder="Enter Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={100000000}
          placeholder="Enter Max Price"
        />
        <button>
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
