import React from 'react'
import { useEffect, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";

export default function playGround() {
    const initialCities = [
        {
          id: 1,
          name: "London",
        },
        {
          id: 2,
          name: "Tokyo",
        },
        {
          id: 3,
          name: "New York",
        },
        {
          id: 4,
          name: "Paris",
        },
        {
          id: 5,
          name: "Toronto",
        },
    ]      
    const handleClick = () => {
      if (city.trim()) sessionStorage.setItem("searchedCity", city);
      addCity(city);
      setCity("");
    };
    const handleButton = (city) => {
      setActiveBtn(city);
      console.log(city);
    };
  return (
    <div>
              <div className="flex flex-row max-w-full w-auto justify-center items-center mt-10">
        <input
          type="text"
          value={city}
          className="w-1/3 p-2 text-xl text-gray-700"
          placeholder="search"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="w-20 h-12 bg-sky-600 rounded-sm shadow-sm text-white"
          onClick={handleClick}
        >
          search
        </button>
      </div>
      <div className="flex flex-row max-w-[800px] mx-auto overflow-scroll h-16 justify-center items-center border-spacing-2 border-gray-500 bg-blue-900">
        {cities.map((city) => (
          <button
            className={`hidden sm:flex  cursor-pointer bg-blue-500 rounded-xl shadow-sm text-white w-16 h-12 mr-2 flex-shrink-1 md:text-lg truncate text-sm font-medium  ${
              activeBtn === city.name ? "scale-95" : ""
            } ${activeBtn === city.name ? "rounded-b-md" : ""} ${
              activeBtn === city.name ? "border-b-8 border-b-yellow-500" : ""
            }  `}
            key={city.id}
            onClick={() => handleButton(city.name)}
          >
            {city.name}
          </button>
        ))}
        {cities.map((city) => (
          <button
            className="flex sm:hidden w-20 h-10 justify-center items-center overflow-scroll"
            key={city.id}
            onClick={() => handleButton(city.name)}
          >
           {
            activeBtn === city.name ? (<FaCircle />) : (<FaRegCircle />)
           }
          </button>
        ))}
      </div>
    </div>
  )
}
