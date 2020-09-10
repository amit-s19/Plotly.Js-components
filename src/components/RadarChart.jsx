import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, radarOpacity, radarMode, textPosition, textTemplate, hoverTemplate, markerType, markerSize,
      radarDash, radarShape, radarFill, 
    } = this.props;

    try {
      let procData = [];
      
      if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        procData = keys.slice(1, keys.length).map((d, i) => ({
          r: [],
          theta : [],
          fill: radarFill,
          type: 'scatterpolar',
          mode: radarMode,
          name: d,
          opacity: radarOpacity,
          textpostion: textPosition,
          texttemplate: textTemplate,
          hovertemplate: hoverTemplate,
          marker: {
              symbol: markerType,
              size: markerSize,
          },
          line: {
              dash: radarDash,
              shape: radarShape, 
          }
        }));

        dataset.forEach((field) => {
          procData.forEach((d, i) => {
            d.r.push(field[keys[0]]);
            d.theta.push(field[keys[i+1]]);
          });
        });
      }

      this.setState({ procData });
    } catch (error) {
      console.log(error);
      this.setState({ procData: undefined });
    }
  }

  componentDidMount = () => {
    const { dataset } = this.props;

    if (dataset && dataset.length) this.processData();
  }

  componentDidUpdate = (prevProps) => {
    const { dataset } = this.props;
    const { procData } = this.state;

    if (Object.is(this.props, prevProps)) {
      return;
    }

    if (dataset && dataset.length) this.processData();
    else if (!dataset && prevProps.dataset && procData) this.processData();
  }

  render() {
    const { procData } = this.state;

    return (
      <Plot
        data={procData}
        layout={{
            polar: {
            radialaxis: {
              visible: true,
            }
         }
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

RadarChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  radarOpacity: PropTypes.number, 
  radarMode: PropTypes.string, 
  textTemplate : PropTypes.string, 
  hoverTemplate : PropTypes.string, 
  markerSize: PropTypes.number, 
  markerType: PropTypes.string, 
  radarDash: PropTypes.string,
  radarShape: PropTypes.string, 
  radarFill: PropTypes.string, 
  showLegend: PropTypes.bool
};

RadarChart.defaultProps = {
  dataset: [],
  radarOpacity: 0.8, 
  radarMode: 'lines+markers', 
  textTemplate : '', 
  hoverTemplate :'', 
  markerSize: 10, 
  markerType: 'circle', 
  radarDash: 'solid',
  radarShape: 'linear', 
  radarFill: 'toself', 
  showLegend: true,
};

// RadarChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/line+chart.svg';

export default RadarChart;
