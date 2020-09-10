import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

class LollipopChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, barOpacity, barWidth, hoverTemplate, orientation, colorArray, markerSize,  
      textTemplate, markerMode, markerSymbol,
    } = this.props;

    try {
      const newColorArr = colorArray.split(',');
      let procData = [];
      let markerData = {
        x: [],
        y: [],
        type: 'scatter',
        mode: markerMode,
        marker: {
        color:  newColorArr[0],
        symbol: markerSymbol,
        size:  markerSize,
        opacity: barOpacity,
        },
        showlegend: false,
      };

      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);

        procData = keys.slice(1, 2).map((d, i) => ({
          x: [],
          y: [],
          marker: { color: newColorArr[1], opacity: barOpacity },
          type: 'bar',  
          width: barWidth === 0 || !barWidth ? null : barWidth,
          name: d,
          hovertemplate: hoverTemplate,
          texttemplate: textTemplate,
          orientation: orientation,
        }));

        dataset.forEach((field) => {
          procData.forEach((d) => {
            let y = field[keys[0]];
            let x = field[d.name];
            if(orientation == 'v')
              [y, x] = [x,y]
            markerData.y.push(y);
            markerData.x.push(x);
            d.y.push(y);
            d.x.push(x);
          });
        });
      }

      markerData.name = procData.name;
      procData.push(markerData);

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
          xaxis: {
            title: xAxisLabel,
            tickangle: xAxisTickAngle,
          },
          yaxis: {
            title: yAxisLabel,
            tickangle: yAxisTickAngle,
          },
          bargap: barGap,
          barmode: barMode,
          showlegend: showLegend,
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

LollipopChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  xAxisLabel: PropTypes.string, 
  yAxisLabel: PropTypes.string, 
  xAxisTickAngle: PropTypes.number, 
  yAxisTickAngle: PropTypes.number, 
  orientation: PropTypes.string,
  colorArray: PropTypes.string, 
  markerSize: PropTypes.number, 
  hoverTemplate : PropTypes.string, 
  showLegend : PropTypes.bool, 
  barWidth : PropTypes.number, 
  barOpacity : PropTypes.number, 
  textTemplate : PropTypes.string, 
  markerMode: PropTypes.string,
  markerSymbol: PropTypes.string
};

LollipopChart.defaultProps = {
  dataset: [],
  xAxisLabel:'', 
  yAxisLabel:'', 
  xAxisTickAngle: 45, 
  yAxisTickAngle: 0, 
  orientation: 'v',
  colorArray: 'purple,pink', 
  markerSize: 30, 
  hoverTemplate :'%{x}<br>%{y}', 
  showLegend : true, 
  barWidth : 0.08, 
  barOpacity : 0.8, 
  textTemplate : '%{x}<br>%{y}', 
  markerMode: 'markers',
  markerSymbol: 'circle',
};

// LollipopChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default LollipopChart;






































































