import React from "react";
import Forecast from "./Forecast";

export default {
  title: "Forecast",
  component: Forecast,
};

const forecastItemList = [
  { hour: 5, state: "sunny", temperature: 13, weekDay: "Jueves" },
  { hour: 15, state: "sunny", temperature: 13, weekDay: "Jueves" },
  { hour: 2, state: "sunny", temperature: 13, weekDay: "Jueves" },
  { hour: 4, state: "sunny", temperature: 13, weekDay: "Jueves" },
];

export const ForecastExample = () => (
  <Forecast forecastItemList={forecastItemList}></Forecast>
);
