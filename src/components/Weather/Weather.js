import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import IconState, { validValues } from "../IconState";
import { IconContext } from "react-icons";

const Weather = ({ temperature, state }) => {
  return (
    <div>
      <IconContext.Provider value={{ size: "5em" }}>
        <IconState state={state} />
      </IconContext.Provider>

      <Typography display="inline" variant="h2">
        {" "}
        {temperature}{" "}
      </Typography>
    </div>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
};

export default Weather;
