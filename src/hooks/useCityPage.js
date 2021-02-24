import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getForecastUrl } from "../utils/urls";
import { getCityCode } from "./../utils/utils";
import getChartData from "../utils/transform/getChartData";
import getForecastItemData from "../utils/transform/getForecastItemData";

const useCityPage = (
  allChartData,
  allForecastItemList,
  onSetChartData,
  onSetForecastItemList
) => {
  const { city, countryCode } = useParams();

  useEffect(() => {
    const getForecast = async () => {
      const url = getForecastUrl({ city, countryCode });
      const cityCode = getCityCode(city, countryCode);
      try {
        const { data } = await axios.get(url);

        const dataAux = getChartData(data);

        onSetChartData({ [cityCode]: dataAux });

        const forecastItemListAux = getForecastItemData(data);

        onSetForecastItemList({ [cityCode]: forecastItemListAux });
      } catch (error) {
        console.log(error);
      }
    };
    const cityCode = getCityCode(city, countryCode);

    if (
      allChartData &&
      allForecastItemList &&
      !allChartData[cityCode] &&
      !allForecastItemList[cityCode]
    ) {
      getForecast();
    }
  }, [
    city,
    countryCode,
    onSetChartData,
    onSetForecastItemList,
    allChartData,
    allForecastItemList,
  ]);
  //end useEffect
  return { city, countryCode };
};

export default useCityPage;
