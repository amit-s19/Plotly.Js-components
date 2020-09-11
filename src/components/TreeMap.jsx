import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, textTemplate, hoverTemplate, hoverInfo, traceName, colorArray, depthFade, treePacking, 
    } = this.props;

    try {
      let procData = [];
      let newColorArray = colorArray.split(',');
      if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        procData = [{
          type: "treemap",
          labels: [],
          parents: [],
          values:  [],
          name: traceName,
          texttemplate: textTemplate,
          hovertemplate: hoverTemplate,
          hoverinfo: hoverInfo,
          textinfo: "label+value+percent parent+percent entry",
          pathbar: {visible: true},
          marker: {
             colors: newColorArray,
             depthfade: depthFade,           
          },
          tiling: {
              packing: treePacking,
          }
        }];

        procData.forEach((d) => {
          dataset.forEach((field) => {
            d.labels.push(field[keys[0]]);
            d.parents.push(field[keys[1]]);
            d.values.push(field[keys[2]]);
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

RadarChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  textTemplate: PropTypes.string, 
  hoverTemplate: PropTypes.string, 
  hoverInfo: PropTypes.string, 
  traceName: PropTypes.string,
  colorArray: PropTypes.string, 
  depthFade: PropTypes.bool, 
  treePacking: PropTypes.string, 
  showLegend: PropTypes.bool
};

RadarChart.defaultProps = {
  dataset: [],
  textTemplate: '', 
  hoverTemplate: '', 
  hoverInfo: 'label+value+name', 
  traceName: 'Trace 0',
  colorArray: '', 
  depthFade: false, 
  treePacking: 'squarify', 
  showLegend: true,
};

// RadarChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/line+chart.svg';

export default RadarChart;
