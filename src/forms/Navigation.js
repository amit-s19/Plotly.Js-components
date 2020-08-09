import React, {Component} from 'react';

import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export class Navigation extends Component{
    render(){
      return(
        <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#"> Chart Components </Navbar.Brand>
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
                </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      );
    }
}