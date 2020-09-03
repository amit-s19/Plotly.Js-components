import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import { HeatDummydata as hdd } from '../compDummyData';
const Plot = createPlotlyComponent(Plotly);

let labels;

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
        dataset, contScale, traceName, contOpacity, contColor,
    } = this.props;

    try {
      let procData = [];

      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);
        labels = keys;
        procData = keys.slice(0, 1).map((d, i) => ({
            x: [],
            y: [],
            z: [],
            name: traceName,
            type: 'heatmap',
            showscale: contScale,
            showlegend: true,
            opacity: contOpacity,
            colorscale: contColor,

        }));    

        procData.forEach((d,i) => {
            let newKeys = keys.slice(1, keys.length);
            for(let key in newKeys )
                d.x.push(newKeys[key]);
            dataset.forEach((field, j) => {
                let vect = [];
                d.y.push(field[keys[0]]);
                for(let key in newKeys) {
                    vect.push(field[newKeys[key]]);
                }
                d.z.push(vect);
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
      help,
    } = this.props;
    return (
      <Plot
        data={procData}
        layout={{
            hovermode: 'closest',
          }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        onClick = {(data) => {
          var pts = '';
          for(var i=0; i < data.points.length; i++){
              let Data = data.points[i];
              pts = labels[Data.x]+' : '+Data.z+'\nX : '+Data.x +'\nY : '+
              Data.y + '\n\n';
          }
          alert('The values are:\n'+pts);
        }}
      />
    );
  }
}

// HeatMap.propTypes = {
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

HeatMap.defaultProps = {
  dataset: hdd,
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



//HeatMap.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default HeatMap;



