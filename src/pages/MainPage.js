import React from "react";
import { useHistory } from "react-router-dom";
import CityList from "./../components/CityList";
import AppFrame from "./../components/AppFrame";
import Paper from "@material-ui/core/Paper";

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
    <AppFrame>
      <Paper elevation={3}>
        <CityList cities={cities} onClickCity={onClickHandler} />
      </Paper>
    </AppFrame>
  );
};

export default MainPage;
