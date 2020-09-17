import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);
let xcoord;
let ycoord;
class WaterfallChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, traceName, Orientation, Opacity, barWidth, Measure, barText, customOptions, 
      hoverTemplate, textTemplate, textPosition, colorArray, lineWidth, 
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');

      if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        xcoord = keys[0];
        ycoord = keys[1];
        procData = [{
          name: traceName,
          type: 'waterfall',
          x: [],
          y: [],
          measure: [],
          text: barText,
          orientation: Orientation,
          opacity: Opacity, 
          width: barWidth,
          hovertemplate: hoverTemplate,
          texttemplate: textTemplate,
          textposition: textPosition,
          increasing: {
            marker: { 
              color: newColorArr[0],
              line: {
                color: newColorArr[1],
                width: lineWidth,
              }
            }
          },
          decreasing: {
            marker: { 
              color: newColorArr[2],
              line: {
                color: newColorArr[3],
                width: lineWidth,
              }
            }
          },
          totals: {
            marker: { 
              color: newColorArr[4],
              line: {
                color: newColorArr[5],
                width: lineWidth,
              }
            }
          },
        }];

        if(Measure === 'custom') {
          dataset.forEach((field) => {
            procData.forEach((d) => {
              let X = field[keys[0]];
              let Y = field[keys[1]];
              if(Orientation === 'h')
                [X, Y] = [Y, X];
              d.x.push(X);
              d.y.push(Y);
            });
          });
          procData.forEach((d) => {
            d.measure = customOptions.split(','); 
          });
        } else {
          dataset.forEach((field) => {
            procData.forEach((d) => {
              let X = field[keys[0]];
              let Y = field[keys[1]];
              if(Orientation === 'h')
                [X, Y] = [Y, X];
              d.x.push(X);
              d.y.push(Y);
              d.measure.push(Measure);
            });
          });
        }
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
    const {
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, 
    } = this.props;

    return (
      <Plot
        data={procData}
        layout={{
            title: undefined,
            xaxis: {
                title: xAxisLabel,
                tickangle: xAxisTickAngle
            },
            yaxis: {
                title: yAxisLabel,
                tickangle: yAxisTickAngle
            },
            autosize: true,
            hovermode: 'closest',
            showlegend: true
        }}
        onClick = {(data) => {
          var pts = {};
          data.points.forEach((elem, i) => {
            let index = data.points[i];
            pts[xcoord] = index.x;
            pts[ycoord] = index.y;
          });
          console.log(pts);
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

WaterfallChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  showLegend: PropTypes.bool, 
  traceName: PropTypes.string, 
  Orientation: PropTypes.string, 
  Opacity: PropTypes.number, 
  barWidth: PropTypes.number,
  Measure: PropTypes.string, 
  barText: PropTypes.string, 
  customOptions: PropTypes.string, 
  hoverTemplate: PropTypes.string, 
  textTemplate: PropTypes.string, 
  xAxisLabel: PropTypes.string, 
  yAxisLabel: PropTypes.string, 
  xAxisTickAngle: PropTypes.number, 
  yAxisTickAngle: PropTypes.number,  
  textPosition: PropTypes.string, 
  colorArray: PropTypes.string, 
  lineWidth: PropTypes.number,
};

WaterfallChart.defaultProps = {
  dataset: [],
  showLegend: true, 
  traceName: 'Trace 0', 
  Orientation: 'v', 
  Opacity: 1, 
  barWidth: 0.7,
  Measure: 'relative', 
  barText: '', 
  customOptions: '', 
  hoverTemplate: '', 
  textTemplate: '', 
  xAxisLabel: 'X-Axis Label', 
  yAxisLabel: 'Y-Axis Label', 
  xAxisTickAngle: 0, 
  yAxisTickAngle: 0,  
  textPosition: 'inside', 
  colorArray: '', 
  lineWidth: 0,
};

//WaterfallChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bubble+chart.svg';

export default WaterfallChart;
