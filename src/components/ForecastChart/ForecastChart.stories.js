import React from "react";
import ForecastChart from "./ForecastChart";

export default {
  title: "ForecastChart",
  component: ForecastChart,
};

const data = [
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

export const ForecastChartExample = () => <ForecastChart data={data} />;
