import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CityList from "./CityList";

const cities = [
  { city: "BUenos Aires", country: "Argentina" },
  { city: "Rosario", country: "Argentina" },
  { city: "Concordia", country: "Argentina" },
  { city: "Colon", country: "Argentina" },
];

test("CityList renders", async () => {
  const { findAllByRole } = render(<CityList cities={cities}></CityList>);

  const items = await findAllByRole("button");

  expect(items).toHaveLength(4);
});

test("CityList Click on item", async () => {
  //debemos simular una accion del usuario: click sobre un item
  //utilizar funcion mock

  const fnClickOnItem = jest.fn();

  const { findAllByRole } = render(
    <CityList cities={cities} onClickCity={fnClickOnItem}></CityList>
  );

  const items = await findAllByRole("button");

  fireEvent.click(items[0]);

  expect(fnClickOnItem).toHaveBeenCalledTimes(1);
});
