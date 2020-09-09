import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

// let xcoord, ycoord;

const Plot = createPlotlyComponent(Plotly);

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
        // xcoord = keys[1];
        // ycoord = keys[2];
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

        if(Measure == 'custom') {
            dataset.forEach((field) => {
                procData.forEach((d) => {
                  let X = field[keys[0]];
                  let Y = field[keys[1]];
                  if(Orientation == 'h')
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
                  if(Orientation == 'h')
                      [X, Y] = [Y, X];
                  d.x.push(X);
                  d.y.push(Y);
                  d.measure.push(Measure);
                });
              });
        }
        
       

        console.log(procData)
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
    const { Orientation } = this.state;
    const {
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, showLegend,
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
            showlegend: true
        }}
        config= {{
          responsive: true
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

// WaterfallChart.propTypes = {
//   dataset: PropTypes.arrayOf(PropTypes.shape({})),
//   xAxisLabel: PropTypes.string,
//   yAxisLabel: PropTypes.string,
//   xAxisTickAngle: PropTypes.number,
//   yAxisTickAngle: PropTypes.number,
//   colorArray: PropTypes.string,
//   opacity: PropTypes.number,
//   showLegend: PropTypes.bool,
// };

WaterfallChart.defaultProps = {
  dataset: [],
//   xAxisLabel: '',
//   yAxisLabel: '',
//   xAxisTickAngle: 45,
//   yAxisTickAngle: 0,
//   colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
//   opacity: 0.9,
//   showLegend: false,
};

//WaterfallChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bubble+chart.svg';

export default WaterfallChart;
