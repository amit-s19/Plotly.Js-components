import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

let labels;

class ContourPlot extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, traceName, showLegend, contOpacity, hoverTemplate, contSmoothing, contDash, contWidth,
      contColor, contScale, contType, showLabels,
    } = this.props;

    try {
      let procData = [];
      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);
        labels = keys;

        procData = [{
          z: [],
          type: 'contour',
          name: traceName,
          showlegend: showLegend,
          opacity: contOpacity,
          hovertemplate: hoverTemplate,
          line: {
              color: 'black',
              smoothing: contSmoothing,
              dash: contDash,
              width: contWidth,
          },
          colorscale: contColor,
          showscale: contScale,
          contours: {
              coloring: contType,
              showlabels: showLabels,
              labelfont: {color: 'white',}
          }
        }];

        procData.forEach((d) => {
          dataset.forEach((field) => {
            let x = [];
            keys.forEach((key, i) => {
              x.push(field[keys[i]])
            });
            d.z.push(x);
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
        onClick = {(data) => {
          var pts = {};
          data.points.forEach((elem, i) => {
            let index = data.points[i];
            pts['x'] = index.x;  
            pts['y'] = index.y;  
            pts[labels[index.x]] = index.z;  
          })
          console.log(pts);
        }}
      />
    );
  }
}

ContourPlot.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  traceName: PropTypes.string, 
  contOpacity: PropTypes.number, 
  hoverTemplate : PropTypes.string, 
  contSmoothing: PropTypes.number,
  contDash: PropTypes.string, 
  contWidth: PropTypes.number, 
  contColor: PropTypes.string, 
  contScale: PropTypes.bool, 
  contType: PropTypes.string, 
  showLabels: PropTypes.bool,
  showLegend: PropTypes.bool
};

ContourPlot.defaultProps = {
  dataset: [],
  traceName: '', 
  contOpacity: 0.9, 
  hoverTemplate :'', 
  contSmoothing: 0.7,
  contDash: 'solid', 
  contWidth: 0.8, 
  contColor: 'Jet', 
  contScale: true, 
  contType: 'fill', 
  showLabels: false,
  showLegend: true
};

//ContourPlot.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default ContourPlot;



