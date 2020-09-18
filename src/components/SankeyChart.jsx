import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

let xcoord;
let ycoord;
let zcoord;

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
      
      const newColorArr = colorArray.split(',');

      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);
        xcoord = keys[0];
        ycoord = keys[1];
        zcoord = keys[2];
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

        uniqueLabels.forEach((key,i) => {
          dictLabels[uniqueLabels[i]] = i
        })
        
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
        onClick={(data)=>{
          let pts={};
          try{
            data.points.forEach((d)=>{
              pts[xcoord] = procData[0].node.label[procData[0].link.source[d.pointNumber]]
              pts[ycoord] = procData[0].node.label[procData[0].link.target[d.pointNumber]]
              pts[zcoord] = procData[0].link.value[d.pointNumber]
            })
          } catch{
            console.log("Please click a valid point")
          }
          console.log(pts);
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
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
  Arrangement: PropTypes.string, 
  colorArray: PropTypes.string
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
  Arrangement: 'snap', 
  colorArray: 'orange,green,blue,red,pink,indigo,violet,purple,brown,lightblue' 
};

// SankeyChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default SankeyChart;

