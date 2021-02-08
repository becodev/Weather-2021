import React from "react";
import Forecast from "./Forecast";
import { render } from "@testing-library/react";

test("Forecast Render", async () => {
  const forecastItemList = [
    { hour: 5, state: "sunny", temperature: 13, weekDay: "Jueves" },
    { hour: 15, state: "sunny", temperature: 13, weekDay: "Jueves" },
    { hour: 2, state: "sunny", temperature: 13, weekDay: "Jueves" },
    { hour: 4, state: "sunny", temperature: 13, weekDay: "Jueves" },
  ];
  const { findAllByTestId } = render(
    <Forecast forecastItemList={forecastItemList}></Forecast>
  );

  const forecastItems = await findAllByTestId("forecast-item-container");

  expect(forecastItems).toHaveLength(4);
});
