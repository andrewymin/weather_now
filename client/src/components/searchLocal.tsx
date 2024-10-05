import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import locations from "../data/location_data.json";
import locations from "../data/compressed_data.json";

// const changeLocation = () => {
//   alert(cities["United States"].filter("aurora"));
// };

function SearchLocal() {
  const [inputValue, setInputValue] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // If input value is not empty, filter the cities based on the input value
    if (value.length >= 3) {
      const matchedCities: string[] = [];
      locations.forEach((location) => {
        location.cities.forEach((city) => {
          if (city.toLowerCase().includes(value.toLowerCase())) {
            matchedCities.push(`${city}, ${location.state_code}`);
          }
        });
      });
      setFilteredCities(matchedCities);
    } else {
      setFilteredCities([]); // Clear filtered cities if input is empty
    }
  };

  const handleCitySelect = (city: string) => {
    setInputValue(city);
    setFilteredCities([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`send ${inputValue} to server for weather data`);
  };

  return (
    <search>
      <form
        autoComplete="off"
        action="get"
        className="flex w-full max-w-sm items-center space-x-2"
        onSubmit={handleSubmit}
      >
        <Input
          value={inputValue}
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
        <ul className="border max-h-40 max-w-[20%] absolute mt-4 bg-white rounded z-10 scrollHide">
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
