import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

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
          procData = [{
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
          }];
        procData.forEach((d, i) => {
          dataset.forEach((field) => {
            d.labels.push(field[keys[i]]);
            d.parents.push(field[keys[i+1]]);
            d.values.push(field[keys[i+2]]);
          });
        });
      } else {
          procData = [{
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
          }];
        procData.forEach((d, i) => {
          dataset.forEach((field) => {
            d.labels.push(field[keys[i]]);
            d.parents.push(field[keys[i+1]]);
          });
          });
        }
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
    const { setValue } = this.props;

    return (
      <Plot
        data={procData}
        layout={{    
        }}
        onClick = {(data) => {
          if (setValue === 'enabled') {
            let pts = {};
            data.points.forEach((d, i) => {
              let index = data.points[i];
              pts[index.data.labels[index.pointNumber]] = index.data.values[index.pointNumber];
            })
            console.log(pts);
          }
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

SunburstChar.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  textTemplate: PropTypes.string, 
  hoverTemplate: PropTypes.string, 
  hoverInfo: PropTypes.string, 
  traceName: PropTypes.string,
  colorArray: PropTypes.string, 
  setValue: PropTypes.string, 
  textOrientation: PropTypes.string, 
  leafOpacity: PropTypes.number,
};

SunburstChar.defaultProps = {
  dataset: [],
  textTemplate: '', 
  hoverTemplate: '', 
  hoverInfo: 'label+value+name', 
  traceName: 'Trace 0',
  colorArray: '', 
  setValue: 'disabled', 
  textOrientation: 'auto', 
  leafOpacity: 0.7,
};

// SunburstChar.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/line+chart.svg';

export default SunburstChar;
