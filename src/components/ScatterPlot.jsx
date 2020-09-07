import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import {barDummydata as bdd} from '../compDummyData';
const Plot = createPlotlyComponent(Plotly);

let xcoord, ycoord;

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, colorArray, markerSize, markerSymbol, markerOpacity, hoverTemplate, textPosition, textTemplate,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');

      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);
        xcoord = keys[0];
        ycoord = keys.slice(1, keys.length);
        procData = keys.slice(1, keys.length).map((d, i) => ({
          x: [],
          y: [],
          mode: 'markers',
          opacity: markerOpacity,
          type: 'scatter',
          name: d,
          texttemplate: textTemplate,
          textposition: textPosition,
          hovertemplate: hoverTemplate,
          textfont: {
            family:  'Raleway, sans-serif'
          },
          marker: { 
                size: markerSize,
                symbol: markerSymbol,
                color: newColorArr[i]
            }
        }));

        
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
    
    
    if ((Object.is(this.props, prevProps))) {
      return;
    }

    if (dataset && dataset.length) this.processData();
    else if (!dataset && prevProps.dataset && procData) this.processData();
  }

  render() {
    const { procData } = this.state;
    const {
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, barGap, showLegend, barMode,
    } = this.props;

    return (
      <Plot
        data={procData}
        layout={{
          title: undefined,
          height: undefined,
          width: undefined,
          autosize: true,
          margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4,
          },
          showlegend: showLegend,
          hovermode: 'closest',
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        onClick = {(data) => {
          var pts = '';
          for(var i=0; i < data.points.length; i++){
              pts = xcoord+' : '+data.points[i].x +'\n'+data.points[i].data.name+' : '+
              data.points[i].y + '\n\n';
          }
          alert('The values are:\n'+pts);
        }}
      />
    );
  }
}

// ScatterPlot.propTypes = {
//   dataset: PropTypes.arrayOf(PropTypes.shape({})),
//   orientation: PropTypes.string,
//   textPosition: PropTypes.string,
//   xAxisLabel: PropTypes.string,
//   yAxisLabel: PropTypes.string,
//   xAxisTickAngle: PropTypes.number,
//   yAxisTickAngle: PropTypes.number,
//   barGap: PropTypes.number,
//   barOpacity: PropTypes.number,
//   barWidth: PropTypes.number,
//   colorArray: PropTypes.string,
//   showLegend: PropTypes.bool,
//   hoverTemplate: PropTypes.string,
//   textTemplate: PropTypes.string,
//   barMode: PropTypes.string,
// };

ScatterPlot.defaultProps = {
  dataset: [],
//   xAxisLabel: '',
//   yAxisLabel: '',
//   xAxisTickAngle: 45,
//   yAxisTickAngle: 0,
//   orientation: 'v',
//   barGap: 0.2,
//   textPosition: 'inside',
//   colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
//   hoverTemplate: '%{x}<br>%{y}',
//   textTemplate: '%{x}<br>%{y}',
//   showLegend: true,
//   barWidth: null,
//   barOpacity: 0.8,
//   barMode: 'group',
};



ScatterPlot.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default ScatterPlot;