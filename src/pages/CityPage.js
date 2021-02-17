import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
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

  const { city, countryCode } = useParams();

  useEffect(() => {
    const getForecast = async () => {
      const appid = "4d66756d2f1463d481841de10d882e5a";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${appid}`;
      try {
        const { data } = await axios.get(url);
        console.log("data", data);

        const daysAhead = [0, 1, 2, 3, 4, 5];
        const days = daysAhead.map((d) => moment().add(d, "d"));
        const dataAux = days.map((day) => {
          const tempObjArray = data.list.filter((item) => {
            const dayOfYear = moment.unix(item.dt).dayOfYear();
            return dayOfYear === day.dayOfYear();
          });
          console.log(day.dayOfYear());
          console.log("Array ", tempObjArray);
          //dayHour, min, max
          return {
            dayHour: day.format("ddd"),
            min: 10,
            max: 30,
          };
        });
        setData(dataAux);
        setForecastItemList(forecastItemListExample);
      } catch (error) {
        console.log(error);
      }
    };

    getForecast();
  }, [city, countryCode]);

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
