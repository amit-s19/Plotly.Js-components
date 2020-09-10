import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

let xcoord;

class MixMatch extends Component {
  constructor(props) {
    super(props);

    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, chartArray, 
      textTemplate, hoverTemplate, barWidth, barOpacity, barColors, lineColors, 
      lineWidth, lineMarkerOpacity, lineStyle, lineShape, lineMarkerSize, lineMode, areaMode, areaFill, 
      areaMarkerSize, areaMarkerOpacity, areaLineWidth, areaLineShape, areaLineStyle, areaColors,
      scatterColors, scatterMarkerSize, scatterMarkerSymbol, scatterMarkerOpacity,
    } = this.props;

    try {
      let procData = [];
      let obj = {};

      const barColorsArr = barColors.split(',');
      const lineColorsArr = lineColors.split(',');
      const areaColorsArr = areaColors.split(',');
      const scatterColorsArr = scatterColors.split(',');
      const newChartArr = chartArray.split(',');
      
      let noCharts = {
        'bar' : 0,
        'line' : 0,
        'area': 0,
        'scatter': 0,
      };

      const countCharts = () => {
        let count = 0;
        for(let key in noCharts) {
          count += noCharts[key];
        }
        return count;
      }
      
      if (dataset && dataset.length > 0) {

        const keys = Object.keys(dataset[0]);

        xcoord = keys[0];
        newChartArr.forEach( (d, i) => {
          switch(d) {

            case 'bar':
              obj = {
                x: [],
                y: [],
                marker: { color: barColorsArr[noCharts[d]], opacity: barOpacity },
                type: 'bar',  
                width: barWidth === 0 || !barWidth ? null : barWidth,
                name: keys[i+1],
                texttemplate: textTemplate,
                hovertemplate: hoverTemplate,
              }
              noCharts = {...noCharts, 'bar': noCharts['bar']+1}
              procData.push(obj);
              break;

            case 'line':
              obj = {
                x: [],
                y: [],
                name: keys[i+1],
                type: 'line',
                mode: lineMode,
                line: {
                  color: lineColorsArr[noCharts[d]], shape: lineShape, dash: lineStyle, width: lineWidth,
                },
                marker: { color: lineColorsArr[noCharts[d]], opacity: lineMarkerOpacity, size: lineMarkerSize },
                width: lineWidth,
                hovertemplate: hoverTemplate,
              }
              noCharts = {...noCharts, 'line': noCharts['line']+1}
              procData.push(obj);
              break;
            
            case 'area':
              obj = {
                x: [],
                y: [],
                marker: { color: areaColorsArr[noCharts[d]], opacity: areaMarkerOpacity, size: areaMarkerSize },
                line: {
                  color: areaColorsArr[noCharts[d]], width: areaLineWidth, shape: areaLineShape, dash: areaLineStyle,
                },
                fill: areaFill,
                mode: areaMode,
                name: keys[i+1],
                hovertemplate: hoverTemplate,
              }
              noCharts = {...noCharts, 'area': noCharts['area']+1}
              procData.push(obj);
              break;
            
            case 'scatter':
              obj = {
                x: [],
                y: [],
                mode: 'markers',
                opacity: scatterMarkerOpacity,
                type: 'scatter',
                name: keys[i+1],
                texttemplate: textTemplate,
                hovertemplate: hoverTemplate,
                textfont: {
                  family:  'Raleway, sans-serif'
                },
                marker: { 
                      size: scatterMarkerSize,
                      symbol: scatterMarkerSymbol,
                      color: scatterColorsArr[noCharts[d]]
                  }
              }
              noCharts = {...noCharts, 'scatter': noCharts['scatter']+1}
              procData.push(obj);
              break;
            
            default:
              break;
          }
        });
        
        dataset.forEach((field) => {
          procData.forEach((d) => {
            d.x.push(field[keys[0]]);
            d.y.push(field[d.name]);
          });
        });

        if(countCharts() < keys.length) {
          let n = countCharts();
          let m = keys.length;
          for(let i=n ; i<m-1 ; i++) {
            let dummyObj = {
              x: [],
              y: [],
              marker: { color: barColorsArr[i], opacity: barOpacity },
              type: 'bar',  
              width: barWidth === 0 || !barWidth ? null : barWidth,
              name: keys[i+1],
              texttemplate: textTemplate,
              hovertemplate: hoverTemplate,
            }
            dataset.forEach((field) => {
              dummyObj.x.push(field[keys[0]])
              dummyObj.y.push(field[dummyObj.name])
            });
            procData.push(dummyObj);
          }
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
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, showLegend, barGap, barMode,
    } = this.props;

    return (
      <Plot
        data={procData}
        layout={{
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
          hovermode: 'closest',
        }}
        onClick = {(data) => {
          var pts = '';
          for(var i=0; i < data.points.length; i++){
            pts = xcoord+' : '+data.points[i].x +'\n'+data.points[i].data.name+' : '+
            data.points[i].y + '\n\n';
          }
          alert('The values are:\n'+pts);
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}

      />
    );
  }
}

MixMatch.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  chartArray: PropTypes.string, 
  xAxisLabel: PropTypes.string, 
  yAxisLabel: PropTypes.string, 
  xAxisTickAngle: PropTypes.number, 
  yAxisTickAngle: PropTypes.number, 
  textTemplate : PropTypes.string, 
  hoverTemplate :PropTypes.string,
  barWidth : null, 
  barOpacity : PropTypes.number, 
  barMode: PropTypes.string, 
  barGap: PropTypes.number, 
  barColors: PropTypes.string,
  lineColors:PropTypes.string, 
  lineWidth: PropTypes.number, 
  lineMarkerOpacity: PropTypes.number, 
  lineStyle: PropTypes.string, 
  lineShape: PropTypes.string, 
  lineMarkerSize: PropTypes.number, 
  lineMode: PropTypes.string, 
  areaMode: PropTypes.string, 
  areaFill: PropTypes.string, 
  areaColors: PropTypes.string,
  areaMarkerSize: PropTypes.number, 
  areaMarkerOpacity: PropTypes.number, 
  areaLineWidth: PropTypes.number, 
  areaLineShape: PropTypes.string, 
  areaLineStyle: PropTypes.string,
  scatterColors: PropTypes.string, 
  scatterMarkerSize: PropTypes.number, 
  scatterMarkerSymbol: PropTypes.string, 
  scatterMarkerOpacity: PropTypes.number,
};

MixMatch.defaultProps = {
  dataset: [],
  chartArray: '', 
  xAxisLabel:'', 
  yAxisLabel:'', 
  xAxisTickAngle: 45, 
  yAxisTickAngle: 0, 
  textTemplate : PropTypes.string, 
  hoverTemplate :PropTypes.string,
  barWidth : null, 
  barOpacity : 0.8, 
  barMode: 'group', 
  barGap: 0.2, 
  barColors: '',
  lineColors:'', 
  lineWidth: 2, 
  lineMarkerOpacity: 0.8, 
  lineStyle: 'solid', 
  lineShape: 'linear', 
  lineMarkerSize: 6, 
  lineMode: 'lines+markers', 
  areaMode: 'scatter', 
  areaFill: 'tozeroy', 
  areaColors: '',
  areaMarkerSize: 8, 
  areaMarkerOpacity: 0.6, 
  areaLineWidth: 2, 
  areaLineShape: 'linear', 
  areaLineStyle: 'solid',
  scatterColors: '', 
  scatterMarkerSize: 14, 
  scatterMarkerSymbol: 'circle', 
  scatterMarkerOpacity: 1,
};

// MixMatch.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/area+chart.svg';

export default MixMatch;


