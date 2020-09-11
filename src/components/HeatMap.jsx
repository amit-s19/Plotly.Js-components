import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
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
        procData = [{
            x: [],
            y: [],
            z: [],
            name: traceName,
            type: 'heatmap',
            showscale: contScale,
            showlegend: true,
            opacity: contOpacity,
            colorscale: contColor,
        }];

        let newKeys = keys.slice(1, keys.length);
        procData.forEach((d) => {
            newKeys.forEach((key, i) => {d.x.push(newKeys[i])})
            dataset.forEach((field) => {
                let vect = [];
                d.y.push(field[keys[0]]);
                newKeys.forEach((key, i) => {vect.push(field[newKeys[i]])})
                d.z.push(vect);
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

HeatMap.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  traceName: PropTypes.string, 
  showLegend: PropTypes.bool, 
  contOpacity: PropTypes.number, 
  hoverTemplate : PropTypes.string,
  contColor: PropTypes.string, 
  contScale: PropTypes.bool
};

HeatMap.defaultProps = {
  dataset: [],
  traceName: 'Trace 0', 
  showLegend: true, 
  contOpacity: 0.9, 
  hoverTemplate :'',
  contColor: 'Hot', 
  contScale: false
};

//HeatMap.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default HeatMap;



