import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CityInfo from "./../components/CityInfo";
import Weather from "./../components/Weather";
import WeatherDetails from "./../components/WeatherDetails";
import ForecastChart from "./../components/ForecastChart";
import Forecast from "./../components/Forecast";
import AppFrame from "./../components/AppFrame";

const CityPage = (props) => {
  const [data, setData] = useState(null);
  const [forecastItemList, setForecastItemList] = useState(null);

  const params = useParams();

  useEffect(() => {
    setData(dataExample);
    setForecastItemList(forecastItemListExample);
  }, []);

  const city = "Buenos Aires";
  const country = "Argentina";
  const state = "clear";
  const temperature = 20;
  const humidity = 70;
  const wind = 5;
  const dataExample = [
    {
      dayHour: "Jue 18",
      min: 14,
      max: 22,
    },
    {
      dayHour: "Vie 19",
      min: 10,
      max: 29,
    },
    {
      dayHour: "Sab 20",
      min: 3,
      max: 35,
    },
  ];
  const forecastItemListExample = [
    { hour: 5, state: "clear", temperature: 13, weekDay: "Jueves" },
    { hour: 15, state: "clear", temperature: 13, weekDay: "Jueves" },
    { hour: 2, state: "clear", temperature: 13, weekDay: "Jueves" },
    { hour: 4, state: "clear", temperature: 13, weekDay: "Jueves" },
  ];

  return (
    <AppFrame>
      <Grid container justify="space-around" direction="column" spacing={2}>
        <Grid item container xs={12} justify="center" alingItems="flex-end">
          <CityInfo city={city} country={country}></CityInfo>
        </Grid>

        <Grid container item xs={12} justify="center">
          <Weather state={state} temperature={temperature}></Weather>
          <WeatherDetails humidity={humidity} wind={wind}></WeatherDetails>
        </Grid>

        <Grid item>{data && <ForecastChart data={data} />}</Grid>

        <Grid item>
          {forecastItemList && <Forecast forecastItemList={forecastItemList} />}
        </Grid>
      </Grid>
    </AppFrame>
  );
};

export default CityPage;
