import React from 'react'
import './filter.scss'

const Filter = () => {
  return (
    <div className='filter'>
      <h1>Search results for <b>london</b></h1>
      <div className="top">
        <div className="item">
          <label htmlFor='city'>Location</label>
          <input type='text' id='city' placeholder='city location' />
        </div>
      </div>
      <div className="bottom">
      <div className="item">
          <label htmlFor='type'>Type</label>
          <select name="type" id="type">
            <option value="all">All</option>
            <option value="buy"> Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor='property'>Property</label>
          <select name="property" id="property">
            <option value="all">All</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor='min price'>Min Price</label>
          <input type='number' id='min price' placeholder='min price' />
        </div>

        <div className="item">
          <label htmlFor='max price'>Max price</label>
          <input type='number' id='max price' placeholder='max price' />
        </div>

        <div className="item">
          <label htmlFor='city'>Bedroom</label>
          <input type='text' id='bedroom' placeholder='bedroom' />
        </div>
        <button>
          <img src="/search.png" alt="search" />
        </button>
      </div>
    </div>
  )
}

export default Filter
