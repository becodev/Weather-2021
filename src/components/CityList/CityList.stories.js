import React from "react";
import CityList from "./CityList";

export default {
  title: "CityList dsf",
  component: CityList,
};

const cities = [
  { city: "Buenos Aires", country: "Argentina" },
  { city: "Rosario", country: "Argentina" },
  { city: "Concordia", country: "Argentina" },
  { city: "Colon", country: "Argentina" },
];

export const CityListExample = () => <CityList cities={cities} />;
