import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import CityInfo from "../CityInfo";
import Weather from "../Weather";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const renderCityAndCountry = (eventOnClickCity) => (
  cityAndCountry,
  weather
) => {
  const { city, country } = cityAndCountry;
  //const { temperature, state } = weather;

  return (
    <ListItem key={city} onClick={eventOnClickCity}>
      <Grid container justify="center" alignItems="center">
        <Grid item md={8} xs={12}>
          <CityInfo city={city} country={country} />
        </Grid>

        <Grid item md={4} xs={12}>
          {weather ? (
            <Weather temperature={weather.temperature} state={weather.state} />
          ) : (
            "No hay datos."
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
};

const CityList = ({ cities, onClickCity }) => {
  const [allWeather, setAllWeather] = useState({});

  useEffect(() => {
    const setWeather = (city) => {
      const appid = "4d66756d2f1463d481841de10d882e5a";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`;
      axios.get(url).then((response) => {
        //si la respuesta es correcta...
        const { data } = response;
      });
    };

    cities.forEach(({ city, country }) => {
      setWeather(city);
    });

    //end useEffect
  }, [cities]);

  //const weather = { temperature: 10, state: "sunny" };

  return (
    <List>
      {cities.map((cityAndCountry) =>
        renderCityAndCountry(onClickCity)(
          cityAndCountry,
          allWeather[`${cityAndCountry.city}-${cityAndCountry.country}`]
        )
      )}
    </List>
  );
};

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickCity: PropTypes.func.isRequired,
};

export default CityList;
