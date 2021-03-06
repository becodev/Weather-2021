import React from "react";
import Weather from "./Weather";

export default {
  title: "Weather",
  component: Weather,
};

export const WeatherExample = () => (
  <Weather state="clear" temperature={10}></Weather>
);
