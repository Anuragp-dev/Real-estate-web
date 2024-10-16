import React from "react";

const SearchBar = () => {
  return (
    <div className="searchBar">
      <div className="type">
        <button>Buy</button>
        <button>Rent</button>
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
