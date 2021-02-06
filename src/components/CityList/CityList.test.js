import React from "react";
import { render } from "@testing-library/react";
import CityList from "./CityList";

const cities = [
  { city: "BUenos Aires", country: "Argentina" },
  { city: "Rosario", country: "Argentina" },
  { city: "Concordia", country: "Argentina" },
  { city: "Colon", country: "Argentina" },
];

test("CityList renders", async () => {
  const { findAllByRole } = render(<CityList cities={cities}></CityList>);

  const items = await findAllByRole("listitem");

  expect(items).toHaveLength(4);
});
