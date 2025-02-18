import React from "react";
import "./SearchBar.scss";
import { Link } from 'react-router-dom'
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

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button className={query.type === type ? "active" : ""} key={type} onClick={() => switchType(type)}>{type}</button>
        ))}
      </div>
      <form>
        <input type="text" name="city" placeholder="Enter City Name" onChange={handleChange} />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={100000000}
          placeholder="Enter Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={100000000}
          placeholder="Enter Max Price"
          onChange={handleChange}
        />
        <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
          <button>
            <img src="/search.png" alt="" />
          </button>

        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
