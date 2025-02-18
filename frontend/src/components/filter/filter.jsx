import React, { useState } from 'react'
import './filter.scss'
import { useSearchParams } from 'react-router-dom'

const Filter = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value
    })
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className='filter'>
      <h1>Search results for <b>{searchParams.get("city")}</b></h1>
      <div className="top">
        <div className="item">
          <label htmlFor='city'>Location</label>
          <input type='text' name='city' id='city' placeholder='city ' onChange={handleChange} defaultValue={query.city} />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor='type'>Type</label>
          <select name="type" id="type" onChange={handleChange} defaultValue={query.type}>
            <option value="all">All</option>
            <option value="buy"> Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor='property'>Property</label>
          <select name="property" id="property" onChange={handleChange} defaultValue={query.property}>
            <option value="all">All</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor='min price'>Min Price</label>
          <input type='number' name='minPrice' id='min price' placeholder='min price' onChange={handleChange} defaultValue={query.minPrice} />
        </div>

        <div className="item">
          <label htmlFor='max price'>Max price</label>
          <input type='number' name='maxPrice' id='max price' placeholder='max price' onChange={handleChange} defaultValue={query.maxPrice} />
        </div>

        <div className="item">
          <label htmlFor='city'>Bedroom</label>
          <input type='text' id='bedroom' name='bedroom' placeholder='bedroom' onChange={handleChange} defaultValue={query.bedroom} />
        </div>
        <button onClick={handleFilter}> 
          <img src="/search.png" alt="search" />
        </button>
      </div>
    </div>
  )
}

export default Filter
