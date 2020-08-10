import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import {candleDummydata as cdd} from '../compDummyData';
const Plot = createPlotlyComponent(Plotly);


class CandleChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, colorArray, calType, 
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');
     
      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);

        procData = keys.slice(1, 2).map(() => ({
          x: [],
          open: [],
          close: [],
          high: [],
          low: [],
          type: 'candlestick', 
          increasing: {line: {color: newColorArr[0]}, fillcolor: newColorArr[1]}, 
          whiskerwidth: 0,
          decreasing: {line: {color: newColorArr[2]}, fillcolor: newColorArr[3]},
          xcalendar: calType,
        }));
        
          procData.forEach((d) => {
            dataset.forEach((field) => {
              d.x.push(field[keys[0]]);
              d.open.push(field[keys[1]]);
              d.close.push(field[keys[2]]);
              d.high.push(field[keys[3]]);
              d.low.push(field[keys[4]]);
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
    
    
    if ((Object.is(this.props, prevProps))) {
      return;
    }

    if (dataset && dataset.length) this.processData();
    else if (!dataset && prevProps.dataset && procData) this.processData();
  }

  render() {
    const { procData } = this.state;
    const {
        xAxisLabel, xAxisTickAngle, yAxisLabel, yAxisTickAngle, showLegend,
    } = this.props;

    return (
      <Plot
        data={procData}
        layout= {{
          dragmode: 'zoom', 
          margin: {
            r: 150, 
            t: 25, 
            b: 40, 
            l: 150
          }, 
          showlegend: showLegend, 
          xaxis: {
            title: xAxisLabel, 
            tickangle: xAxisTickAngle,
            type: 'date'
          }, 
          yaxis: {
            title: yAxisLabel,
            tickangle: yAxisTickAngle,
            type: 'linear'
          }
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

// CandleChart.propTypes = {
//   dataset: PropTypes.arrayOf(PropTypes.shape({})),
//   colorArray: PropTypes.string, 
//   tableAlign: PropTypes.string, 
//   showLegend: PropTypes.bool,
// };

CandleChart.defaultProps = {
  dataset: cdd,
  // colorArray:'grey,lightgrey,white', 
  // tableAlign: 'center', 
  // showLegend: true,
};



// CandleChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default CandleChart;




