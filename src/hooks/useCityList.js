import { useEffect, useState } from "react";
import axios from "axios";
import { getWeatherUrl } from "../utils/urls";
import { getAllWeather } from "../utils/transform/getAllWeather";

const useCityList = (cities, onSetAllWeather) => {
  //const [allWeather, setAllWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const setWeather = async (city, countryCode) => {
      const url = getWeatherUrl({ city, countryCode });

      try {
        const response = await axios.get(url);

        const allWeatherAux = getAllWeather(response, city, countryCode);

        //setAllWeather((allWeather) => ());

        onSetAllWeather(allWeatherAux);
      } catch (error) {
        if (error.response) {
          setError("Hay un error con el servidor.");
        } else if (error.request) {
          setError("Verifique la conexion a internet.");
        } else {
          setError("Error al cargar los datos.");
        }
      }
    };

    cities.forEach(({ city, countryCode }) => {
      setWeather(city, countryCode);
    });
  }, [cities, onSetAllWeather]);

  return { error, setError };
};

export default useCityList;
