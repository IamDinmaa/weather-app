import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";
function SearchBar({ onSearchChange }) {
  const [search, setSearch] = useState("");
  const getOptions = (inputValue) => {
    console.log("geourl", GEO_API_URL);
    console.log("options", geoApiOptions);
    console.log("IO", inputValue);
    if (inputValue) {
      return fetch(
        `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
        geoApiOptions
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data);
          return {
            options: response.data.map((city) => {
              return {
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name} ${city.countryCode}`,
              };
            }),
            hasMore: response.data.length > 1,
          };
        })
        .catch((err) => console.error(err));
    }
    return {
      options: [],
      hasMore: false,
    };
  };

  const handleOnChange = (searchData) => setSearch(searchData);

  return (
    <AsyncPaginate
      type="text"
      placeholder="Enter a location"
      debounceTimeout={600}
      value={search}
      onInputChange={handleOnChange}
      loadOptions={getOptions}
    />
  );
}

export default SearchBar;
