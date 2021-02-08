import React from "react";
import { useHistory } from "react-router-dom";
import CityList from "./../components/CityList";

const cities = [
  { city: "Buenos Aires", country: "Argentina" },
  { city: "Rosario", country: "Argentina" },
  { city: "Concordia", country: "Argentina" },
  { city: "Colon", country: "Argentina" },
];

const MainPage = (props) => {
  const history = useHistory();
  const onClickHandler = () => {
    //history.push permite alternar la URL por programacion
    history.push("/city");
  };

  return (
    <div>
      <h2>Lista de ciudades</h2>
      <CityList cities={cities} onClickCity={onClickHandler} />
    </div>
  );
};

export default MainPage;
