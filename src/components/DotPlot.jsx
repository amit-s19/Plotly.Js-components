import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

let label;

class DotPlot extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, colorArray, dotSize,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');

      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);
        label = keys[0];
        
        procData = keys.slice(1, keys.length).map((d, i) => ({
          type: 'scatter',
          x: [],
          y: [],
          mode: 'markers',
          text: keys[i],
          name: keys[i+1],
          marker: {
            color: newColorArr[i],
            symbol: 'circle',
            size: dotSize
          },
        }));
        dataset.forEach((field) => {
          procData.forEach((d, i) => {
            d.x.push(field[keys[i+1]]);
            d.y.push(field[keys[0]]);
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
      dotTitle, xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle,
    } = this.props;
  
    return (
      <>
        <Plot
          data={procData}
          layout={{
            title: dotTitle,
            xaxis: {
              title: xAxisLabel,
              tickangle: xAxisTickAngle,
              showgrid: false,
              showline: true,
              linecolor: 'rgb(102, 102, 102)',
              titlefont: {
                font: {
                  color: 'rgb(204, 204, 204)'
                }
              },
              tickfont: {
                font: {
                  color: 'rgb(102, 102, 102)'
                }
              },
              autotick: false,
              dtick: 10,
              ticks: 'outside',
              tickcolor: 'rgb(102, 102, 102)'
            },
            yaxis: {
              title: yAxisLabel,
              tickangle: yAxisTickAngle,
            },
            margin: {
              l: 140,
              r: 40,
              b: 50,
              t: 80
            },
            legend: {
              font: {
                size: 10,
              },
              yanchor: 'middle',
              xanchor: 'right'
            },
            width: 600,
            height: 600,
            paper_bgcolor: 'rgb(254, 247, 234)',
            plot_bgcolor: 'rgb(254, 247, 234)',
            hovermode: 'closest'
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
          onClick = {(data) => {
            var pts = {};
            data.points.forEach((elem, i) => {
              let index = data.points[i];
              pts[label] = index.y;
              pts[index.data.name] = index.x;
            })
            console.log(pts);
          }}
        />
      </>
    );  
  }
}

DotPlot.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  colorArray: PropTypes.string,  
  dotTitle:  PropTypes.string,  
  dotSize: PropTypes.number,  
  xAxisLabel: PropTypes.string, 
  yAxisLabel: PropTypes.string, 
  xAxisTickAngle: PropTypes.number,  
  yAxisTickAngle: PropTypes.number, 
  showLegend: PropTypes.bool,   
};

DotPlot.defaultProps = {
  dataset: [],
  colorArray: '', 
  showLegend: 'true', 
  dotTitle: '', 
  dotSize: 18, 
  xAxisLabel:'', 
  yAxisLabel:'', 
  xAxisTickAngle: 45, 
  yAxisTickAngle: 0,
};

export default DotPlot;























