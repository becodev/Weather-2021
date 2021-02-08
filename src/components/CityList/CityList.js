import React from "react";
import PropTypes from "prop-types";
import CityInfo from "../CityInfo";
import Weather from "../Weather";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const renderCityAndCountry = (eventOnClickCity) => (cityAndCountry) => {
  const { city, country } = cityAndCountry;

  return (
    <ListItem key={city} onClick={eventOnClickCity}>
      <Grid container justify="center" alignItems="center">
        <Grid item md={8} xs={12}>
          <CityInfo city={city} country={country} />
        </Grid>

        <Grid item md={4} xs={12}>
          <Weather temperature={10} state={"sunny"} />
        </Grid>
      </Grid>
    </ListItem>
  );
};

const CityList = ({ cities, onClickCity }) => {
  return (
    <List>
      {cities.map((cityAndCountry) =>
        renderCityAndCountry(onClickCity)(cityAndCountry)
      )}
    </List>
  );
};

CityList.propTypes = {
  cities: PropTypes.array.isRequired,
  onClickCity: PropTypes.func.isRequired,
};

export default CityList;
