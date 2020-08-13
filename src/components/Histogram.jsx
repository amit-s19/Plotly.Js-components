import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import {histDummydata as hdd} from '../compDummyData';
const Plot = createPlotlyComponent(Plotly);


class Histogram extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, barOpacity, hoverTemplate, orientation, colorArray,
      histCumulative, histFunc, histNorm, histNames,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');
      const newNames = histNames.split(',');

      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);

        procData = keys.slice(0, (keys.length/2)).map((d, i) => ({
            x: [],
            y: [],
            name: newNames[i],
            histfunc: histFunc, 
            histnorm: histNorm, 
            marker: { color: newColorArr[i] },
            hovertemplate: hoverTemplate, 
            cumulative: {enabled: histCumulative},
            opacity: barOpacity, 
            type: "histogram", 
            orientation: orientation,
  
        }));

        dataset.forEach((field) => {
          let j = 0;
          procData.forEach((d, i) => {
            d.x.push(field[keys[(i+j)]]);
            d.y.push(field[keys[(i+j+1)]]);
            j += 1;
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
            bargap: barGap, 
            bargroupgap: 0.2, 
            barmode: barMode, 
            xaxis: {
              title: xAxisLabel,
              tickangle: xAxisTickAngle
            }, 
            yaxis: {
              title: yAxisLabel,
              tickangle: yAxisTickAngle
            },
            showlegend: showLegend,
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

Histogram.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  histNames: PropTypes.string, 
  xAxisLabel: PropTypes.string, 
  yAxisLabel: PropTypes.string, 
  xAxisTickAngle: PropTypes.number, 
  yAxisTickAngle: PropTypes.number,
  orientation: PropTypes.string, 
  barGap: PropTypes.number, 
  colorArray: PropTypes.string, 
  barMode: PropTypes.string, 
  hoverTemplate: PropTypes.string,
  showLegend : PropTypes.bool, 
  barOpacity : PropTypes.number, 
  histCumulative: PropTypes.bool,
  histFunc: PropTypes.string, 
  histNorm: PropTypes.string,
};

Histogram.defaultProps = {
  dataset: hdd, 
  histNames: 'Trace 0,Trace 1,Trace 2,Trace 3', 
  xAxisLabel:'', 
  yAxisLabel:'', 
  xAxisTickAngle: 45, 
  yAxisTickAngle: 0,
  orientation: 'v', 
  barGap: 0.2, 
  colorArray: 'black,orange', 
  barMode: 'group', 
  hoverTemplate :'%{x}<br>%{y}',
  showLegend : true, 
  barOpacity : 0.8, 
  histCumulative: true,
  histFunc: 'count', 
  histNorm: 'percent',
};

// Histogram.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default Histogram;

