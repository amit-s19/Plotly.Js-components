import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
//import {lineChartData as lcd} from '../compDummyData';

const Plot = createPlotlyComponent(Plotly);

let xcoord;

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, hoverTemplate, lineWidth, mode, colorArray, markerOpacity, markerSize,
      lineStyle, lineShape,
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
          name: d,
          type: 'line',
          mode,
          line: {
            color: colorArray[i], shape: lineShape, dash: lineStyle, width: lineWidth,
          },
          marker: { color: newColorArr[i], opacity: markerOpacity, size: markerSize },
          width: lineWidth,
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
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, showLegend,
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

LineChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  xAxisTickAngle: PropTypes.number,
  yAxisTickAngle: PropTypes.number,
  markerOpacity: PropTypes.number,
  markerSize: PropTypes.number,
  lineWidth: PropTypes.number,
  colorArray: PropTypes.string,
  showLegend: PropTypes.bool,
  hoverTemplate: PropTypes.string,
  mode: PropTypes.string,
  lineStyle: PropTypes.string,
  lineShape: PropTypes.string,
};

LineChart.defaultProps = {
  dataset: [],
  xAxisLabel: '',
  yAxisLabel: '',
  xAxisTickAngle: 45,
  yAxisTickAngle: 0,
  colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
  hoverTemplate: '%{x}<br>%{y}',
  showLegend: true,
  markerOpacity: 0.8,
  markerSize: 6,
  lineWidth: 2,
  mode: 'lines',
  lineStyle: 'lines',
  lineShape: 'linear',
};

LineChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/line+chart.svg';

export default LineChart;
