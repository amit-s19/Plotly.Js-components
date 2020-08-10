import React, {Component} from 'react';
import './LandingPage.css';

class LandingPage extends Component {
    render() {
        return (
        <>
        <div class="wrapper">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="title">
                <span>Plotly Components</span>
                <br></br>
                <span>Cogniviz</span>
            </div>
        </div>
        </>
        );
    }
}

export default LandingPage;