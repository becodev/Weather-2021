import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getForecastUrl } from "../utils/urls";
import getChartData from "../utils/transform/getChartData";
import getForecastItemData from "../utils/transform/getForecastItemData";

const useCityPage = (onSetChartData, onSetForecastItemList) => {
  //const [chartData, setChartData] = useState(null);
  //const [forecastItemList, setForecastItemList] = useState(null);

  const { city, countryCode } = useParams();

  useEffect(() => {
    const getForecast = async () => {
      const url = getForecastUrl({ city, countryCode });
      try {
        const { data } = await axios.get(url);

        const dataAux = getChartData(data);

        onSetChartData(dataAux);

        const forecastItemListAux = getForecastItemData(data);

        onSetForecastItemList(forecastItemListAux);
      } catch (error) {
        console.log(error);
      }
    };

    getForecast();
  }, [city, countryCode, onSetChartData, onSetForecastItemList]);
  //end useEffect
  return { city, countryCode };
};

export default useCityPage;
