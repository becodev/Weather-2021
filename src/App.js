import React, { useState, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MainPage from "./pages/MainPage";
import CityPage from "./pages/CityPage";
import NotFoundPage from "./pages/NotFoundPage";
import Grid from "@material-ui/core/Grid";

const App = () => {
  const [allWeather, setAllWeather] = useState({});

  const onSetAllWeather = useCallback( (weatherCity) => {
      setAllWeather((allWeather) => {
        return { ...allWeather, ...weatherCity }
    },
    [setAllWeather]);


    const actions = useMemo( () => (
      {
        onSetAllWeather
      }
    ), [onSetAllWeather] );

    const data = useMemo( () => (
      {
        allWeather
      }
    ), [allWeather]);

  return (
    <Grid container justify="center" direction="row">
      <Grid item xs={12} sm={11} md={10} lg={8}>
        <Router>
          <Switch>
            <Route exact path="/">
              <WelcomePage />
            </Route>
            <Route path="/main">
              <MainPage
                data={data}
                actions={actions}
              />
            </Route>
            <Route path="/city/:countryCode/:city">
              <CityPage
                data={data}
                actions={actions}
              />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </Grid>
    </Grid>
  );
};

export default App;
