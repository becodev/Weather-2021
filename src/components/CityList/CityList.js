import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import convertUnits from "convert-units";
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
          <Weather
            temperature={weather && weather.temperature}
            state={weather && weather.state}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

const CityList = ({ cities, onClickCity }) => {
  const [allWeather, setAllWeather] = useState({});

  useEffect(() => {
    const setWeather = (city, country, countryCode) => {
      const appid = "4d66756d2f1463d481841de10d882e5a";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`;
      axios.get(url).then((response) => {
        //si la respuesta es correcta...
        const { data } = response;
        const temperature = Number(
          convertUnits(data.main.temp).from("K").to("C").toFixed(0)
        );
        const state = "clear";
        /*

        ¡¡¡¡¡¡BUG A ARREGLAR!!!!!


        */
        console.log(data.weather[0].main.toLowerCase());
        // obtenemos los datos desde la api (temperatura y state)
        const propName = `${city}-${country}`; // Ej. [Ciudad de Mexico-Mexico]
        const propValue = { temperature, state }; // Ej. {temperature: 10, state: "sunny"}

        /*
          {
            [Ciudad de Mexico-Mexico]: {temperature: 10, state: "sunny"}
          }
        */
        setAllWeather((allWeather) => {
          const result = { ...allWeather, [propName]: propValue };
          return result;
        });
      });
    };

    cities.forEach(({ city, country, countryCode }) => {
      setWeather(city, country, countryCode);
    });
  }, [cities]);
  //end useEffect

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
      countryCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickCity: PropTypes.func.isRequired,
};

export default CityList;
