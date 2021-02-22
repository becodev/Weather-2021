import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MainPage from "./pages/MainPage";
import CityPage from "./pages/CityPage";
import NotFoundPage from "./pages/NotFoundPage";
import Grid from "@material-ui/core/Grid";

const App = () => {
  const [allWeather, setAllWeather] = useState({});

  const onSetAllWeather = useMemo(
    () => (weatherCity) => {
      setAllWeather((allWeather) => ({ ...allWeather, ...weatherCity }));
    },
    [setAllWeather]
  );
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
                allWeather={allWeather}
                onSetAllWeather={onSetAllWeather}
              />
            </Route>
            <Route path="/city/:countryCode/:city">
              <CityPage
                allWeather={allWeather}
                onSetAllWeather={onSetAllWeather}
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
