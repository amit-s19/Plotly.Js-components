import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import { treeDummydata as tdd } from '../compDummyData';

const Plot = createPlotlyComponent(Plotly);

class SunburstChar extends Component {
  constructor(props) {
    super(props);

    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, textTemplate, hoverTemplate, hoverInfo, traceName, colorArray, setValue,
      textOrientation, leafOpacity, 
    } = this.props;

    try {
      let procData = [];
      let newColorArray = colorArray.split(',');
      if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        if(setValue ==='enabled') {
          procData = keys.slice(0, 1).map((d, i) => ({
            type: "sunburst",
            labels: [],
            parents: [],
            values: [],
            name: traceName,
            texttemplate: textTemplate,
            hovertemplate: hoverTemplate,
            hoverinfo: hoverInfo,
            textinfo: "label+value+percent parent+percent entry",
            pathbar: {visible: true},
            marker: {
               colors: newColorArray,        
            },
            insidetextorientation: textOrientation,
            leaf: {opacity: leafOpacity},

          }));
          console.log(textOrientation);

        procData.forEach((d, i) => {
            dataset.forEach((field) => {
                d.labels.push(field[keys[i]]);
                d.parents.push(field[keys[i+1]]);
                d.values.push(field[keys[i+2]]);
            });
          });
        }
        else {
          procData = keys.slice(0, 1).map((d, i) => ({
            type: "sunburst",
            labels: [],
            parents: [],
            name: traceName,
            texttemplate: textTemplate,
            hovertemplate: hoverTemplate,
            hoverinfo: hoverInfo,
            textinfo: "label+value+percent parent+percent entry",
            pathbar: {visible: true},
            marker: {
               colors: newColorArray,    
            },
            insidetextorientation: textOrientation,
            leaf: {opacity: leafOpacity},

        }));

        procData.forEach((d, i) => {
            dataset.forEach((field) => {
                d.labels.push(field[keys[i]]);
                d.parents.push(field[keys[i+1]]);
            });
          });
        }
        
          console.log(procData);
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
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, showLegend,
    } = this.props;

    return (
      <Plot
        data={procData}
        layout={{    
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

// SunburstChar.propTypes = {
//   dataset: PropTypes.arrayOf(PropTypes.shape({})),
//   xAxisLabel: PropTypes.string,
//   yAxisLabel: PropTypes.string,
//   xAxisTickAngle: PropTypes.number,
//   yAxisTickAngle: PropTypes.number,
//   markerOpacity: PropTypes.number,
//   markerSize: PropTypes.number,
//   lineWidth: PropTypes.number,
//   colorArray: PropTypes.string,
//   showLegend: PropTypes.bool,
//   hoverTemplate: PropTypes.string,
//   mode: PropTypes.string,
//   lineStyle: PropTypes.string,
//   lineShape: PropTypes.string,
// };

SunburstChar.defaultProps = {
  dataset: tdd,
//   xAxisLabel: '',
//   yAxisLabel: '',
//   xAxisTickAngle: 45,
//   yAxisTickAngle: 0,
//   colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
//   hoverTemplate: '%{x}<br>%{y}',
//   showLegend: true,
//   markerOpacity: 0.8,
//   markerSize: 6,
//   lineWidth: 2,
//   mode: 'lines',
//   lineStyle: 'lines',
//   lineShape: 'linear',
};

// SunburstChar.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/line+chart.svg';

export default SunburstChar;
