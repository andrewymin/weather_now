import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import locations from "../data/location_data.json";
import locations from "../data/compressed_data.json";
import { useData } from "@/context/dataContext";

function isStringNaN(value: string): boolean {
  return isNaN(Number(value));
}

function SearchLocal() {
  const { dataState, dispatch, getLocationWeather } = useData();
  // const [inputValue, setInputValue] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: "SEARCH_LOCATION", payload: value });

    // If input value is not empty, filter the cities based on the input value
    if (value.length >= 3) {
      const matchedCities: string[] = [];
      locations.forEach((location) => {
        location.cities.forEach((city) => {
          if (
            city.toLowerCase().includes(value.toLowerCase()) &&
            isStringNaN(location.state_code)
          ) {
            matchedCities.push(`${city}, ${location.state_code}`);
          }
        });
      });
      setFilteredCities(matchedCities.sort());
    } else {
      setFilteredCities([]); // Clear filtered cities if input is empty
    }
  };

  const handleCitySelect = (city: string) => {
    dispatch({ type: "SEARCH_LOCATION", payload: city });
    setFilteredCities([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setFilteredCities([]);
    e.preventDefault();
    getLocationWeather();
  };

  return (
    <search className="xs:col-start-1 xs:col-end-3">
      <form
        autoComplete="off"
        action="get"
        className="flex w-full max-w-sm items-center space-x-2 xs:min-w-[50vw]"
        onSubmit={handleSubmit}
      >
        <Input
          className="xs:text-[.75rem] text-black"
          value={dataState.searchLocation}
          onChange={handleChange}
          type="search"
          placeholder="zip or city with state"
        />
        <Button
          type="submit"
          className="bg-ten text-slate-950 hover:text-white hover:bg-darkerBlue"
        >
          🔎
        </Button>
      </form>
      {filteredCities.length > 0 && (
        <ul className="border max-h-40 max-w-[20%] xs:!max-w-[44%] absolute mt-4 text-black bg-white rounded z-10 scrollHide xs:mt-0">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              onClick={() => handleCitySelect(city)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </search>
  );
}

export default SearchLocal;
