import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getForecastUrl } from "../utils/urls";
import getChartData from "../utils/transform/getChartData";
import getForecastItemData from "../utils/transform/getForecastItemData";

const useCityPage = () => {
  const [chartData, setChartData] = useState(null);
  const [forecastItemList, setForecastItemList] = useState(null);

  const { city, countryCode } = useParams();

  useEffect(() => {
    const getForecast = async () => {
      const url = getForecastUrl({ city, countryCode });
      try {
        const { data } = await axios.get(url);

        const dataAux = getChartData(data);

        setChartData(dataAux);

        const forecastItemListAux = getForecastItemData(data);

        setForecastItemList(forecastItemListAux);
      } catch (error) {
        console.log(error);
      }
    };

    getForecast();
  }, [city, countryCode]);
  //end useEffect
  return { city, chartData, forecastItemList, countryCode };
};

export default useCityPage;
