import React from "react";
import PropTypes from "prop-types";
import {
  WiCloudy,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiRaindrop,
  WiThunderstorm,
} from "react-icons/wi";

export const validValues = [
  "clouds",
  "snow",
  "clear",
  "rain",
  "drizzle",
  "thunderstorm",
];

const stateByName = {
  clouds: WiCloudy,
  clear: WiDaySunny,
  rain: WiRain,
  snow: WiSnow,
  drizzle: WiRaindrop,
  thunderstorm: WiThunderstorm,
};

const IconState = ({ state }) => {
  const StateByName = stateByName[state];
  return <StateByName />;
};

IconState.propTypes = {
  state: PropTypes.oneOf(validValues).isRequired,
};

export default IconState;
