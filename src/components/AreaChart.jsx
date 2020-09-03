import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
//import {areaChartData as acd} from '../compDummyData';

const Plot = createPlotlyComponent(Plotly);

let xcoord;

class AreaChart extends Component {
  constructor(props) {
    super(props);

    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, areaFill, areaMode, markerOpacity, markerSize, lineWidth, lineShape, lineStyle,
      colorArray, hoverTemplate,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');

      if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        xcoord = keys[0];
        procData = keys.slice(1, keys.length).map((d, i) => ({
          x: [],
          y: [],
          marker: { color: newColorArr[i], opacity: markerOpacity, size: markerSize },
          line: {
            color: newColorArr[i], width: lineWidth, shape: lineShape, dash: lineStyle,
          },
          fill: areaFill,
          mode: areaMode,
          name: d,
          hovertemplate: hoverTemplate,
        }));

        dataset.forEach((field) => {
          procData.forEach((d) => {
            d.x.push(field[keys[0]]);
            d.y.push(field[d.name]);
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
    const {
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, showLegend, xAxisRange, yAxisRange, 
    } = this.props;
    let xrange = xAxisRange.split(',');
    let yrange = yAxisRange.split(',');
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
            title: `${xAxisLabel}`,
            tickangle: `${xAxisTickAngle}`,
            range: xrange,
          },
          yaxis: {
            title: `${yAxisLabel}`,
            tickangle: `${yAxisTickAngle}`,
            range: yrange,
          },
          showlegend: showLegend,
          hovermode: 'closest',
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        onClick = {(data) => {
          var pts = '';
          for(var i=0; i < data.points.length; i++){
              pts = xcoord+' : '+data.points[i].x +'\n'+data.points[i].data.name+' : '+
              data.points[i].y + '\n\n';
          }
          alert('The values are:\n'+pts);
        }}
      />
    );
  }
}

AreaChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  areaFill: PropTypes.string,
  areaMode: PropTypes.string,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  xAxisTickAngle: PropTypes.number,
  yAxisTickAngle: PropTypes.number,
  markerOpacity: PropTypes.number,
  markerSize: PropTypes.number,
  lineWidth: PropTypes.number,
  lineShape: PropTypes.string,
  lineStyle: PropTypes.string,
  colorArray: PropTypes.string,
  showLegend: PropTypes.bool,
  hoverTemplate: PropTypes.string,
};

AreaChart.defaultProps = {
  dataset: [],
  areaFill: 'tozeroy',
  areaMode: 'scatter',
  xAxisLabel: '',
  yAxisLabel: '',
  xAxisTickAngle: 45,
  yAxisTickAngle: 0,
  markerOpacity: 0.6,
  markerSize: 8,
  lineWidth: 2,
  lineShape: 'linear',
  lineStyle: 'solid',
  colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
  showLegend: true,
  hoverTemplate: '%{x}<br>%{y}',
};

AreaChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/area+chart.svg';

export default AreaChart;
