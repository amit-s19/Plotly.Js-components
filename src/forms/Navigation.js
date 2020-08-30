import React, {Component} from 'react';

import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export class Navigation extends Component{
    render(){
      return(
        <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/"> Chart Components </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown title="Charts" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/BarGraph">Bar Graph </NavDropdown.Item>
                <NavDropdown.Item href="/BubbleChart">Bubble Chart </NavDropdown.Item>
                <NavDropdown.Item href="/AreaChart">Area Chart </NavDropdown.Item>
                <NavDropdown.Item href="/LineChart">Line Chart </NavDropdown.Item>
                <NavDropdown.Item href="/BoxPlot">Box Plot </NavDropdown.Item>
                <NavDropdown.Item href="/PieChart">Pie Chart </NavDropdown.Item>
                <NavDropdown.Item href="/IndicatorTrace">Indicator Trace </NavDropdown.Item>
                <NavDropdown.Item href="/DotPlot">Dot Plot </NavDropdown.Item>
                <NavDropdown.Item href="/TableChart">Table Chart </NavDropdown.Item>
                <NavDropdown.Item href="/CandleChart">Candlestick Chart </NavDropdown.Item>
                <NavDropdown.Item href="/Histogram">Histogram </NavDropdown.Item>
                <NavDropdown.Item href="/OhlcChart">Ohlc Chart </NavDropdown.Item>
                <NavDropdown.Item href="/FunnelChart">Funnel Chart </NavDropdown.Item>
                <NavDropdown.Item href="/ParallelCategory">Parallel Category Chart </NavDropdown.Item>
                <NavDropdown.Item href="/ContourPlot">Contour Plot </NavDropdown.Item>
                <NavDropdown.Item href="/HeatMap">Heat Map </NavDropdown.Item>
                <NavDropdown.Item href="/RadarChart">Radar Chart </NavDropdown.Item>
                <NavDropdown.Item href="/TreeMap">Tree Map </NavDropdown.Item>
                <NavDropdown.Item href="/SunburstChart">Sunburst Chart </NavDropdown.Item>
                <NavDropdown.Item href="/LollipopChart">Lollipop Chart </NavDropdown.Item>
                </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      );
    }
}