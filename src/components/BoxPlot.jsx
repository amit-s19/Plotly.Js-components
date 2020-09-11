import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

class BoxPlot extends Component {
  constructor(props) {
    super(props);

    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, orientation, colorArray, opacity, quartileMethod, boxWidth, lineWidth,
      boxMean, boxPoints, boxMode,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');

      const commonProps = {
        type: 'box',
        width: boxWidth,
        orientation,
        opacity,
        quartilemethod: quartileMethod,
        line: { width: lineWidth },
        boxmean: !boxMean ? '' : (boxMean === 'sd' ? boxMean : true),
        boxpoints: boxPoints,
      };

      if (boxMode === 'group' && dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        procData = keys.slice(1, keys.length).map((d, i) => ({
          x: [],
          y: [],
          name: d,
          marker: {
            color: newColorArr[i],
            outliercolor: 'rgba(219, 64, 82, 0.6)',
            line: {
              outliercolor: 'rgba(219, 64, 82, 1.0)',
              outlierwidth: 2,
            },
          },
          ...commonProps,
        }));

        dataset.forEach((field) => {
          procData.forEach((d) => {
            d.x.push(orientation === 'h' ? field[d.name] : field[keys[0]]);
            d.y.push(orientation === 'h' ? field[keys[0]] : field[d.name]);
          });
        });
      } else if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        const unique = Array.from(new Set(dataset.map((d) => d[keys[0]])));
        unique.forEach((u, i) => {
          procData.push({
            x: orientation === 'h' ? dataset.filter((f) => f[keys[0]] === u).map((ff) => ff[keys[1]]).sort() : null,
            y: orientation === 'v' ? dataset.filter((f) => f[keys[0]] === u).map((ff) => ff[keys[1]]).sort() : null,
            name: u,
            marker: {
              color: newColorArr[i],
              outliercolor: 'rgba(219, 64, 82, 0.6)',
              line: {
                outliercolor: 'rgba(219, 64, 82, 1.0)',
                outlierwidth: 2,
              },
            },
            ...commonProps,
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
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, showLegend, boxMode,
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
          boxmode: boxMode,
          showlegend: showLegend,
          hovermode: 'closest',
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        onClick = {(data) => {
          var pts = {};
          data.points.forEach((elem, i) => {
            let index = data.points[i];
            pts['x'] = index.x 
          })
          console.log(pts);
        }}
      />
    );
  }
}

BoxPlot.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  xAxisTickAngle: PropTypes.number,
  yAxisTickAngle: PropTypes.number,
  colorArray: PropTypes.string,
  showLegend: PropTypes.bool,
  orientation: PropTypes.string,
  quartileMethod: PropTypes.string,
  lineWidth: PropTypes.number,
  boxWidth: PropTypes.number,
  opacity: PropTypes.number,
  boxMean: PropTypes.string,
  boxMode: PropTypes.string,
  boxPoints: PropTypes.string,
};

BoxPlot.defaultProps = {
  dataset: [],
  xAxisLabel: '',
  yAxisLabel: '',
  xAxisTickAngle: 45,
  yAxisTickAngle: 0,
  colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
  showLegend: true,
  orientation: 'h',
  boxWidth: null,
  lineWidth: 2,
  quartileMethod: 'linear',
  opacity: 0.8,
  boxMode: 'group',
  boxMean: '',
  boxPoints: 'all',
};

BoxPlot.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/horizontal+plot.svg';

export default BoxPlot;
