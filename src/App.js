// Importing Plotly Components.
import BarGraphForm from './forms/BarGraphForm';
import BubbleChartForm from './forms/BubbleChartForm';
import AreaChartForm from './forms/AreaChartForm';
import LineChartForm from './forms/LineChartForm';
import BoxPlotForm from './forms/BoxPlotForm';
import PieChartForm from './forms/PieChartForm';
import IndicatorTraceForm from './forms/IndicatorTraceForm';
import DotPlotForm from './forms/DotPlotForm';
import TableChartForm from './forms/TableChartForm';
import CandleChartForm from './forms/CandleChartForm';
import HistogramForm from './forms/HistogramForm';
import OhlcChartForm from './forms/OhlcChartForm';
import FunnelChartForm from './forms/FunnelChartForm';
import ParallelCategoryForm from './forms/ParallelCategoryForm';
import ContourPlotForm from './forms/ContourPlotForm';
import HeatMapForm from './forms/HeatMapForm';
import RadarChartForm from './forms/RadarChartForm';
import TreeMapForm from './forms/TreeMapForm';
import SunburstChartForm from './forms/SunburstChartForm';
import LollipopChartForm from './forms/LollipopChartForm';
import ViolinChartForm from './forms/ViolinChartForm';
import WaterfallChartForm from './forms/WaterfallChartForm';
import ScatterPlotForm from './forms/ScatterPlotForm';
import SankeyChartForm from './forms/SankeyChartForm';

// Importing Navigation.
import {Navigation} from './forms/Navigation';

// Importing Styling for the Landing Page.
import LandingPage from './LandingPage';
import "./App.css";

// Importing React Components.
import React from "react";

// Importing Routing Components.
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

// Driver Function.
function App() {
  return (   
    <Router >
      <div>
        <Navigation />
        <Switch>
          <Route exact path ="/" >
            <LandingPage />
          </Route>
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
          <Route exact path ="/DotPlot" >
            <DotPlotForm />
          </Route>
          <Route exact path ="/TableChart" >
            <TableChartForm />
          </Route>
          <Route exact path ="/CandleChart" >
            <CandleChartForm />
          </Route>
          <Route exact path ="/Histogram" >
            <HistogramForm />
          </Route>
          <Route exact path ="/OhlcChart" >
            <OhlcChartForm />
          </Route>
          <Route exact path ="/FunnelChart" >
            <FunnelChartForm />
          </Route>
          <Route exact path ="/ParallelCategory" >
            <ParallelCategoryForm />
          </Route>
          <Route exact path ="/ContourPlot" >
            <ContourPlotForm />
          </Route>
          <Route exact path ="/HeatMap" >
            <HeatMapForm />
          </Route>
          <Route exact path ="/RadarChart" >
            <RadarChartForm />
          </Route>
          <Route exact path ="/TreeMap" >
            <TreeMapForm />
          </Route>
          <Route exact path ="/SunburstChart" >
            <SunburstChartForm />
          </Route>
          <Route exact path ="/LollipopChart" >
            <LollipopChartForm />
          </Route>
          <Route exact path ="/ViolinChart" >
            <ViolinChartForm />
          </Route>
          <Route exact path ="/WaterfallChart" >
            <WaterfallChartForm />
          </Route>
          <Route exact path ="/ScatterPlot" >
            <ScatterPlotForm />
          </Route>
          <Route exact path ="/SankeyChart" >
            <SankeyChartForm />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
