import BarGraphForm from './forms/BarGraphForm';
import BubbleChartForm from './forms/BubbleChartForm';
import AreaChartForm from './forms/AreaChartForm';
import LineChartForm from './forms/LineChartForm';
import BoxPlotForm from './forms/BoxPlotForm';
import PieChartForm from './forms/PieChartForm';
import IndicatorTraceForm from './forms/IndicatorTraceForm';

import {Navigation} from "./forms/Navigation";
import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import "./App.css";



function App() {
  return (
    
    <Router >
      <div>
        <Navigation />
        <Switch>
          <Route exact path ="/BarGraph" >
            <BarGraphForm />
          </Route>
          <Route exact path ="/BubbleChart" >
            <BubbleChartForm />
          </Route>
          <Route exact path ="/AreaChart" >
            <AreaChartForm />
          </Route>
          <Route exact path ="/LineChart" >
            <LineChartForm />
          </Route>
          <Route exact path ="/BoxPlot" >
            <BoxPlotForm />
          </Route>
          <Route exact path ="/PieChart" >
            <PieChartForm />
          </Route>
          <Route exact path ="/IndicatorTrace" >
            <IndicatorTraceForm />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
