import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import convertUnits from "convert-units";
import Alert from "@material-ui/lab/Alert";
import CityInfo from "../CityInfo";
import Weather from "../Weather";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const getCityCode = (city, countryCode) => `${city}-${countryCode}`;

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

const CityList = ({ cities, onClickCity }) => {
  const [allWeather, setAllWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const setWeather = async (city, countryCode) => {
      const appid = "4d66756d2f1463d481841de10d882e5a";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`;

      try {
        const response = await axios.get(url);
        const { data } = response;
        const temperature = Number(
          convertUnits(data.main.temp).from("K").to("C").toFixed(0)
        );
        const state = "clear";
        /*

        ¡¡¡¡¡¡BUG A ARREGLAR!!!!!
        no coincide el parametro "state" que manda la API con lo que tenemos definido en el codigo.
        console.log(data.weather[0].main.toLowerCase());
        */
        const propName = getCityCode(city, countryCode); // Ej. [Ciudad de Mexico-Mexico]
        const propValue = { temperature, state }; // Ej. {temperature: 10, state: "sunny"}
        setAllWeather((allWeather) => ({
          ...allWeather,
          [propName]: propValue,
        }));
      } catch (error) {
        if (error.response) {
          //errores que responde el servidor
          setError("Hay un error con el servidor.");
        } else if (error.request) {
          //Errores que no llegamos al servidor
          setError("Verifique la conexion a internet.");
        } else {
          //errores imprevistos
          setError("Error al cargar los datos.");
        }
      }
    };

    cities.forEach(({ city, countryCode }) => {
      setWeather(city, countryCode);
    });
  }, [cities]);
  //end useEffect

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
