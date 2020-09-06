import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
//import {MixMatchData as acd} from '../compDummyData';

const Plot = createPlotlyComponent(Plotly);

let xcoord;

class MixMatch extends Component {
  constructor(props) {
    super(props);

    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, bar, line, area, scatter, xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle,
      textTemplate, hoverTemplate, barWidth, barOpacity, barMode, barGap, barColors, lineColors, 
      lineWidth, lineMarkerOpacity, lineStyle, lineShape, lineMarkerSize, lineMode,
    } = this.props;

    try {
      let procData = [];
      const barColorsArr = barColors.split(',');
      const lineColorsArr = lineColors.split(',');
      
      if (dataset && dataset.length > 0) {

        const keys = Object.keys(dataset[0]);

        if(bar) {
          for(let i=1 ; i<keys.length ; i++) {
            let obj = {
                x: [],
                y: [],
                marker: { color: barColorsArr[i-1], opacity: barOpacity },
                type: 'bar',  
                width: barWidth === 0 || !barWidth ? null : barWidth,
                name: keys[i],
                texttemplate: textTemplate,
                hovertemplate: hoverTemplate,
            }
            procData.push(obj);
          }
        }
        if(line) {
          for(let i=1 ; i<keys.length ; i++) {
            let obj = {
                x: [],
                y: [],
                name: keys[i],
                type: 'line',
                mode: lineMode,
                line: {
                  color: lineColorsArr[i], shape: lineShape, dash: lineStyle, width: lineWidth,
                },
                marker: { color: lineColorsArr[i], opacity: lineMarkerOpacity, size: lineMarkerSize },
                width: lineWidth,
                hovertemplate: hoverTemplate,
            }
            procData.push(obj);
          }
        }
        if(area) {
       
        }
        if(scatter) {
         
        }
        dataset.forEach((field) => {
          procData.forEach((d) => {
            d.x.push(field[keys[0]]);
            d.y.push(field[d.name]);
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
    const {
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, showLegend, barGap, barMode,
    } = this.props;

    return (
      <Plot
        data={procData}
        layout={{
          xaxis: {
            title: xAxisLabel,
            tickangle: xAxisTickAngle,
          },
          yaxis: {
            title: yAxisLabel,
            tickangle: yAxisTickAngle,
          },
          bargap: barGap,
          barmode: barMode,
          showlegend: showLegend,
          hovermode: 'closest',
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}

      />
    );
  }
}

// MixMatch.propTypes = {
//   dataset: PropTypes.arrayOf(PropTypes.shape({})),
//   areaFill: PropTypes.string,
//   areaMode: PropTypes.string,
//   xAxisLabel: PropTypes.string,
//   yAxisLabel: PropTypes.string,
//   xAxisTickAngle: PropTypes.number,
//   yAxisTickAngle: PropTypes.number,
//   markerOpacity: PropTypes.number,
//   markerSize: PropTypes.number,
//   lineWidth: PropTypes.number,
//   lineShape: PropTypes.string,
//   lineStyle: PropTypes.string,
//   colorArray: PropTypes.string,
//   showLegend: PropTypes.bool,
//   hoverTemplate: PropTypes.string,
// };

MixMatch.defaultProps = {
  dataset: [],
  // areaFill: 'tozeroy',
  // areaMode: 'scatter',
  // xAxisLabel: '',
  // yAxisLabel: '',
  // xAxisTickAngle: 45,
  // yAxisTickAngle: 0,
  // markerOpacity: 0.6,
  // markerSize: 8,
  // lineWidth: 2,
  // lineShape: 'linear',
  // lineStyle: 'solid',
  // colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
  // showLegend: true,
  // hoverTemplate: '%{x}<br>%{y}',
};

MixMatch.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/area+chart.svg';

export default MixMatch;
