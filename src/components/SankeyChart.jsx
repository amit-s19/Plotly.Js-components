import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import {sanDummydata as sdd} from '../compDummyData';
const Plot = createPlotlyComponent(Plotly);

let xcoord, ycoord;

class SankeyChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, colorArray, labelArray, chartOpacity, textPosition, textTemplate, hoverTemplate,
      Orientation, nodeThickness, nodePad, linkArray, Arrangement, 
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');
      const newLabelArr = labelArray.split(',');
      const newLinkArr = linkArray.split(',');

      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);
        xcoord = keys[0];
        ycoord = keys.slice(1, keys.length);
        procData = [{
          type: "sankey",
          mode: 'text',
          orientation: Orientation,
          texttemplate: textTemplate,
          hovertemplate: hoverTemplate,
          textposition: textPosition,
          opacity: chartOpacity,
            node: {
              pad: nodePad,
              thickness: nodeThickness,
              line: {
                color: 'black',
                width: 0.5
              },
             label: newLabelArr,
             color: newColorArr,
                },
            
            link: {
              source: [],
              target: [], 
              value:  [],
              colorscales: {
                label: ['India','USA','Italy','Russia','Israel','Japan','China','Canada','Switzerland','Korea'],
                colorscale: 'Earth' 
              }  
            },
            arrangement: Arrangement,
        }];

        
        dataset.forEach((field) => {
          procData.forEach((d) => {
            d.link.source.push(field[keys[0]]);
            d.link.target.push(field[keys[1]]);
            d.link.value.push(field[keys[2]]);
          });
        });

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
          hovermode: 'closest',
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        onClick = {(data) => {
          var pts = '';
          for(var i=0; i < data.points.length; i++){
              pts = xcoord+' : '+data.points[i].x +'\n'+' : '+
              data.points[i].y + '\n\n';
          }
          alert('The values are:\n'+pts);
        }}
      />
    );
  }
}

// SankeyChart.propTypes = {
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

SankeyChart.defaultProps = {
  dataset: sdd,
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



SankeyChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default SankeyChart;

