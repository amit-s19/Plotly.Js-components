import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

let xcoord, ycoord;

class ViolinChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, violinOpacity, violinWidth, hoverText, hoverInfo, hoverTemplate,
      violinOrientation, colorArray, markerSymbol, markerSize, Bandwidth, hoverOn, violinJitter,
      showLegend,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');
      let uniqueLabels = [];

      if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        xcoord = keys[0];
        ycoord = keys[1];
        procData = [{
          type: 'violin',
          x: [],
          y: [],
          name: keys[0],
          width: violinWidth,
          text: 'hello world',
          opacity: violinOpacity,
          points: 'none',
          hovertext: hoverText,
          hoverinfo: hoverInfo,
          orientation: violinOrientation,
          bandwith: Bandwidth,
          hoveron : hoverOn,
          jitter: violinJitter,
          hovertemplate : hoverTemplate,
          showlegend: showLegend,
          box: {
            visible: true,
          },
          marker: {
            outliercolor: newColorArr[newColorArr.length-2],
            symbol: markerSymbol,
            size: markerSize,
          },
          meanline: {
            visible: true,
            color: newColorArr[newColorArr.length-1],
          },
          transforms: [{
            type: 'groupby',
          groups: [],
          styles: []
          }]
        }];
        dataset.forEach((field) => {
          procData.forEach((d) => {
            let x = field[keys[0]];
            let y = field[keys[1]];
            if (violinOrientation === 'h')
              [x, y] = [y, x];
            d.x.push(x);
            d.transforms[0].groups.push(x);
            d.y.push(y);
          });
        });

        uniqueLabels = procData[0].x.filter((value, index, self) => self.indexOf(value) === index);
        for(let i=0 ; i<uniqueLabels.length ; i++) {
          let x = {
            target: uniqueLabels[i],
            value: { line: {color: newColorArr[i]}}
          }
          procData[0].transforms[0].styles.push(x)
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
            pts = xcoord+' : '+data.points[i].x+'\n'+ycoord+' : '+data.points[i].y;
          }
          alert('The values are:\n'+pts);
        }}
      />
    );
  }
}

ViolinChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  colorArray: PropTypes.string, 
  violinOpacity: PropTypes.number, 
  violinWidth: PropTypes.number, 
  hoverText: PropTypes.string, 
  hoverInfo: PropTypes.string,
  hoverTemplate: PropTypes.string, 
  violinOrientation: PropTypes.string, 
  markerSymbol: PropTypes.string, 
  markerSize: PropTypes.number, 
  Bandwidth: PropTypes.number,
  hoverOn: PropTypes.string, 
  violinJitter: PropTypes.number, 
  showLegend: PropTypes.bool
};

ViolinChart.defaultProps = {
  dataset: [],
  colorArray: '#800055,#cc0088,#ff00aa,#ff33bb,#ff66cc,#ff99dd,#ffccee,#4d0033,#000000', 
  violinOpacity: 1, 
  violinWidth: 0, 
  hoverText: '', 
  hoverInfo: 'all',
  hoverTemplate: '%{x}<br>%{y}', 
  violinOrientation: 'v', 
  markerSymbol: 'circle', 
  markerSize: 8, 
  Bandwidth: null,
  hoverOn: 'violins+points+kde', 
  violinJitter: 0, 
  showLegend: true,
};

//ViolinChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bubble+chart.svg';

export default ViolinChart;


// Scatter 
// Sankey
// mix and match
// cards
// circle timeline