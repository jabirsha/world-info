import React from "react";
import "./CountryDetail.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountryDetail } from "../Services";

function CountryDetail(props) {
  const { countryCode } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getCountryDetail(countryCode).then((result) => {
      console.log("result.datA: ", result.data);
      setDetail(result.data);
    });
  }, [countryCode]);
  console.log("countryCoDE", countryCode);
  return (
    <div className="country-detail-wrapper">
      <div>
        <img
          className="country-detail-img"
          src={detail.flags?.png}
          alt={detail.name}
        />
      </div>
      <div>
        <div>Name: {detail.name} </div>
        <div>Capital: {detail.capital} </div>
        <div>Population: {detail.population} </div>
        <div>
          Currencies:{" "}
          {detail.currencies?.map((currency) => currency.name).join(",")}
        </div>
        <div>Region: {detail.region} </div>
        <div>Timezone: {detail.timezones} </div>
      </div>
    </div>
  );
}

export default CountryDetail;
