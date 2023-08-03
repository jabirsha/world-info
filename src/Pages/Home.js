import "./Home.css";
import { useEffect, useState } from "react";
import { getAllCountries } from "../Services";
import CountryCard from "../Components/CountryCard";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import React from "react";

function Home() {
  const [allCountriesList, setCountriesList] = useState([]);
  const [filteredCountriesList, setFilteredCountriesList] = useState([]);
  const [region, setRegion] = React.useState("");
  const [countryName, setCountryName] = React.useState("");

  useEffect(() => {
    getAllCountries().then((result) => {
      const countries = result.data;
      setCountriesList(countries);
      setFilteredCountriesList(countries);
    });
  }, []);

  useEffect(() => {
    console.log("Region or countryName changed: ", region, countryName);
    if (region === "" && countryName === "") {
      setFilteredCountriesList(allCountriesList);
    } else {
      let filteredCountries = allCountriesList;

      // Filtering based on the region
      if (region.length) {
        filteredCountries = filteredCountries.filter((country) => {
          if (country.region === region) return true;
          return false;
        });
      }
      
      // Filtering based on the region
      if (countryName.length) {
        filteredCountries = filteredCountries.filter((country) => {
          const lowerCaseName = country.name.toLowerCase();
          if (lowerCaseName.includes(countryName.toLowerCase())) return true;
          return false;
        });
      }
      setFilteredCountriesList(filteredCountries);
    }
  }, [region, allCountriesList, countryName]);

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value);
  };

  return (
    <div className="">
      <div className="filters-wrapper">
        <TextField
          id="outlined-basic"
          label="Filter by Name"
          variant="outlined"
          onChange={handleCountryNameChange}
          value={countryName}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">
            Filter by Region
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Filter by Region"
            onChange={handleRegionChange}
          >
            <MenuItem value={"Africa"}>Africa</MenuItem>
            <MenuItem value={"Americas"}>Americas</MenuItem>
            <MenuItem value={"Asia"}>Asia</MenuItem>
            <MenuItem value={"Europe"}>Europe</MenuItem>
            <MenuItem value={"Oceania"}>Oceania</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="country-card-wrapper">
        {filteredCountriesList.map((country) => (
          <Link
            to={`/countries/${country.alpha3Code}`}
            key={country.alpha3Code}
            style={{ textDecoration: "none" }}
          >
            <CountryCard
              name={country.name}
              capital={country.capital}
              population={country.population}
              flagUrl={country.flags.png}
              key={country.alpha3Code}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
