import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

let open;
let close;
let high;
let low;

class CandleChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, colorArray, calType, calName,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');
     
      if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        open = keys[1]
        close = keys[2]
        high = keys[3]
        low = keys[4]
        procData = [{          
          x: [],
          open: [],
          close: [],
          high: [],
          low: [],
          type: 'candlestick',
          name: calName, 
          increasing: {line: {color: newColorArr[0]}, fillcolor: newColorArr[1]}, 
          whiskerwidth: 0,
          decreasing: {line: {color: newColorArr[2]}, fillcolor: newColorArr[3]},
          xcalendar: calType,
        }];
        
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
        onClick = {(data) => {
          var pts = {};
          data.points.forEach((elem, i) => {
            let index = data.points[i];
            pts[open] = index.data.open[index.pointNumber]
            pts[close] = index.data.close[index.pointNumber]
            pts[high] = index.data.high[index.pointNumber]
            pts[low] = index.data.low[index.pointNumber]
          })
          console.log(pts);
        }}
      />
    );
  }
}

CandleChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  colorArray: PropTypes.string, 
  xAxisLabel: PropTypes.string, 
  yAxisLabel: PropTypes.string, 
  xAxisTickAngle: PropTypes.number, 
  yAxisTickAngle: PropTypes.number, 
  calType: PropTypes.string, 
  showLegend: PropTypes.number, 
  calName: PropTypes.string,
};

CandleChart.defaultProps = {
  dataset: [], 
  colorArray:'black,orange', 
  xAxisLabel:'', 
  yAxisLabel:'', 
  xAxisTickAngle: 0, 
  yAxisTickAngle: 0, 
  calType: 'gregorian', 
  showLegend: true, 
  calName: 'Trace 0',
};

// CandleChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default CandleChart;




