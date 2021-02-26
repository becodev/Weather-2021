import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconState from "../IconState";
import { IconContext } from "react-icons";

const Weather = ({ temperature, state }) => {
  const iconContextSize = useMemo(() => ({ size: "6em" }), []);
  return (
    <Grid
      container
      item
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <IconContext.Provider value={iconContextSize}>
        {state ? (
          <IconState state={state} />
        ) : (
          <Skeleton variant="circle" height={80} width={80} />
        )}
      </IconContext.Provider>

      {temperature ? (
        <Typography display="inline" variant="h2">
          {" "}
          {temperature}{" "}
        </Typography>
      ) : (
        <Skeleton variant="rect" height={80} width={80} />
      )}
    </Grid>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number,
};

export default Weather;
