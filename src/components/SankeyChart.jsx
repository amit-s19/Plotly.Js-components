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
      dataset, colorArray, chartOpacity, textPosition, textTemplate, hoverTemplate,
      Orientation, nodeThickness, nodePad, Arrangement, 
    } = this.props;

    try {
      let procData = [];
      let labels = [];
      let uniqueLabels = [];
      let dictLabels = {};
      let k = 0;

      const newColorArr = colorArray.split(',');

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
             label: undefined,
             color: newColorArr,
                },
            
            link: {
              source: [],
              target: [], 
              value:  [],
              colorscales: {
                colorscale: 'Earth' 
              }  
            },
            arrangement: Arrangement,
        }];
        
        dataset.forEach((field) => {
          labels.push(field[keys[0]]);
          labels.push(field[keys[1]]);
          procData.forEach((d) => {
            d.link.value.push(field[keys[2]]);
          });
        });

        uniqueLabels = labels.filter((value, index, self) => self.indexOf(value) === index);
        procData[0].node.label = uniqueLabels;
        for(const key of uniqueLabels) {
          dictLabels[key] = k;
          k += 1;
        }
        
        dataset.forEach((field) => {
          procData.forEach((d) => {
            d.link.source.push(dictLabels[field[keys[0]]]);
            d.link.target.push(dictLabels[field[keys[1]]]);
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

SankeyChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  showLegend: PropTypes.bool, 
  chartOpacity: PropTypes.number, 
  hoverTemplate : PropTypes.string, 
  textTemplate : PropTypes.string, 
  textPosition: PropTypes.string, 
  Orientation: PropTypes.string, 
  nodeThickness: PropTypes.number, 
  nodePad: PropTypes.number, 
  colorArray: PropTypes.string,
  labelArray: PropTypes.string,
  linkArray: PropTypes.string, 
  Arrangement: PropTypes.string
};

SankeyChart.defaultProps = {
  dataset: [], 
  showLegend: true, 
  chartOpacity: 1, 
  hoverTemplate :'%{x}<br>%{y}', 
  textTemplate : '%{x}<br>%{y}', 
  textPosition: 'middle center', 
  Orientation: 'h', 
  nodeThickness: 20, 
  nodePad: 10, 
  colorArray: 'orange,green,blue,red,pink,indigo,violet,purple,brown,lightblue',
  labelArray: 'India,USA,Italy,Russia,Israel,Japan,China,Canada,Switzerland,Korea',
  linkArray: '', 
  Arrangement: 'snap', 
};



SankeyChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default SankeyChart;

