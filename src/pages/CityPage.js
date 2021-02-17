import React, { useState, useEffect } from "react";
import useCityPage from "./../hooks/useCityPage";
import Grid from "@material-ui/core/Grid";
import CityInfo from "./../components/CityInfo";
import Weather from "./../components/Weather";
import WeatherDetails from "./../components/WeatherDetails";
import ForecastChart from "./../components/ForecastChart";
import Forecast from "./../components/Forecast";
import AppFrame from "./../components/AppFrame";

const CityPage = () => {
  const { city, chartData, forecastItemList } = useCityPage();

  const country = "Argentina";
  const state = "clear";
  const temperature = 20;
  const humidity = 70;
  const wind = 5;

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

        <Grid item>{chartData && <ForecastChart data={chartData} />}</Grid>

        <Grid item>
          {forecastItemList && <Forecast forecastItemList={forecastItemList} />}
        </Grid>
      </Grid>
    </AppFrame>
  );
};

export default CityPage;
