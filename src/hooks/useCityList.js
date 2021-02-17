import { useEffect, useState } from "react";
import axios from "axios";
import { getCityCode, toCelsius } from "./../utils/utils";
import { getWeatherUrl } from "../utils/urls";

const useCityList = (cities) => {
  const [allWeather, setAllWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const setWeather = async (city, countryCode) => {
      const url = getWeatherUrl({ city, countryCode });

      try {
        const response = await axios.get(url);
        const { data } = response;
        const temperature = toCelsius(data.main.temp);

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

  return { allWeather, error, setError };
};

export default useCityList;
