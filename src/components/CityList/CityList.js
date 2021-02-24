import React from "react";
import PropTypes from "prop-types";
import useCityList from "./../../hooks/useCityList";
import { getCityCode } from "./../../utils/utils";
import Alert from "@material-ui/lab/Alert";
import CityInfo from "../CityInfo";
import Weather from "../Weather";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const renderCityAndCountry = (eventOnClickCity) => (
  cityAndCountry,
  weather
) => {
  const { city, country, countryCode } = cityAndCountry;

  return (
    <ListItem
      key={getCityCode(city, countryCode)}
      onClick={() => eventOnClickCity(city, countryCode)}
    >
      <Grid container justify="center" alignItems="center">
        <Grid item md={8} xs={12}>
          <CityInfo city={city} country={country} />
        </Grid>

        <Grid item md={4} xs={12}>
          <Weather
            temperature={weather && weather.temperature}
            state={weather && weather.state}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

const CityList = ({ cities, onClickCity, actions, data }) => {
  const { allWeather } = data;

  const { onSetAllWeather } = actions;

  const { error, setError } = useCityList(cities, onSetAllWeather, allWeather);

  return (
    <div>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {" "}
          {error}{" "}
        </Alert>
      )}
      <List>
        {cities.map((cityAndCountry) =>
          renderCityAndCountry(onClickCity)(
            cityAndCountry,
            allWeather[
              getCityCode(cityAndCountry.city, cityAndCountry.countryCode)
            ]
          )
        )}
      </List>
    </div>
  );
};

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      countryCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickCity: PropTypes.func.isRequired,
};

export default CityList;
