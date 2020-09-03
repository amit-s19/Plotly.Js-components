import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

let xcoord, ycoord;

const Plot = createPlotlyComponent(Plotly);

class BubbleChart extends Component {
  constructor(props) {
    super(props);

    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, colorArray, opacity,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');

      if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        xcoord = keys[1];
        ycoord = keys[2];
        procData = [{
          x: [],
          y: [],
          text: [],
          marker: {
            color: newColorArr, size: [], sizemode: 'area', opacity,
          },
          mode: 'markers',
          type: 'scatter',
        }];
        
        dataset.forEach((field) => {
          procData.forEach((d) => {
            d.text.push(`Name: ${field[keys[0]]}<br />X: ${field[keys[1]]}<br />Y: ${field[keys[2]]}<br />Size: ${field[keys[3]]}`);
            d.x.push(field[keys[1]]);
            d.y.push(field[keys[2]]);
            d.marker.size.push(field[keys[3]]);
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
              pts = xcoord+' : '+data.points[i].x +'\n'+ycoord+' : '+
              data.points[i].y + '\n\n';
          }
          alert('The values are:\n'+pts);
        }}
      />
    );
  }
}

BubbleChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  xAxisTickAngle: PropTypes.number,
  yAxisTickAngle: PropTypes.number,
  colorArray: PropTypes.string,
  opacity: PropTypes.number,
  showLegend: PropTypes.bool,
};

BubbleChart.defaultProps = {
  dataset: [],
  xAxisLabel: '',
  yAxisLabel: '',
  xAxisTickAngle: 45,
  yAxisTickAngle: 0,
  colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
  opacity: 0.9,
  showLegend: false,
};

//BubbleChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bubble+chart.svg';

export default BubbleChart;
