import React, { useReducer, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import MainPage from "./pages/MainPage";
import CityPage from "./pages/CityPage";
import NotFoundPage from "./pages/NotFoundPage";
import Grid from "@material-ui/core/Grid";

const initialValue = {
  allWeather: {},
  allChartData: {},
  allForecastItemList: {},
};

const App = () => {
  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case "SET_ALL_WEATHER":
        const weatherCity = action.payload;
        const newAllWeather = { ...state.allWeather, ...weatherCity };
        return { ...state, allWeather: newAllWeather };

      case "SET_CHART_DATA":
        const chartDataCity = action.payload;
        const newAllChartData = { ...state.allChartData, ...chartDataCity };
        return { ...state, allChartData: newAllChartData };

      case "SET_FORECAST_ITEM_LIST":
        const forecastItemList = action.payload;
        const newAllForecastItemList = {
          ...state.allForecastItemList,
          ...forecastItemList,
        };
        return { ...state, allForecastItemList: newAllForecastItemList };

      default:
        return state;
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <Grid container justify="center" direction="row">
      <Grid item xs={12} sm={11} md={10} lg={8}>
        <Router>
          <Switch>
            <Route exact path="/">
              <WelcomePage />
            </Route>
            <Route path="/main">
              <MainPage data={state} actions={dispatch} />
            </Route>
            <Route path="/city/:countryCode/:city">
              <CityPage data={state} actions={dispatch} />
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
