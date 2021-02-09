import React from "react";
import ForecastItem from "./ForecastItem";
import { render } from "@testing-library/react";

test("ForecastItem render", async () => {
  //tarea se deben renderizar los diferentes textos.
  const { findByRole } = render(
    <ForecastItem weekDay="Lunes" hour={10} temperature={20} state="clear" />
  );

  const day = await findByRole("heading");

  expect(day).toHaveTextContent("Lunes");
});
