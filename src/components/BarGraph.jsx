import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

let xcoord;

class BarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, barOpacity, barWidth, hoverTemplate, textPosition, orientation, colorArray,
      textTemplate,
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
          marker: { color: newColorArr[i], opacity: barOpacity },
          type: 'bar',  
          width: barWidth === 0 || !barWidth ? null : barWidth,
          name: d,
          texttemplate: textTemplate,
          textposition: textPosition,
          hovertemplate: hoverTemplate,
          orientation,
        }));

        
        dataset.forEach((field) => {
          procData.forEach((d) => {
            let x = field[keys[0]];
            let y = field[d.name];
            if(orientation === 'h')
              [x, y] = [y, x];
            d.x.push(x);
            d.y.push(y);
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
      xAxisLabel, yAxisLabel, xAxisTickAngle, yAxisTickAngle, barGap, showLegend, barMode, orientation
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
          hovermode: orientation === 'h'? 'v' : 'x',
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        onClick = {(data) => {
          var pts = {};
          data.points.forEach((elem, i) => {
            let index = data.points[i];
            if(orientation === "h") {
              pts[xcoord] = index.y;
              pts[index.data.name] = index.x;
            } else {
              pts[xcoord] = index.x;
              pts[index.data.name] = index.y;
            }
          })
          console.log(pts);
        }}
      />
    );
  }
}

BarGraph.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  orientation: PropTypes.string,
  textPosition: PropTypes.string,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  xAxisTickAngle: PropTypes.number,
  yAxisTickAngle: PropTypes.number,
  barGap: PropTypes.number,
  barOpacity: PropTypes.number,
  barWidth: PropTypes.number,
  colorArray: PropTypes.string,
  showLegend: PropTypes.bool,
  hoverTemplate: PropTypes.string,
  textTemplate: PropTypes.string,
  barMode: PropTypes.string,
};

BarGraph.defaultProps = {
  dataset: [],
  xAxisLabel: '',
  yAxisLabel: '',
  xAxisTickAngle: 45,
  yAxisTickAngle: 0,
  orientation: 'v',
  barGap: 0.2,
  textPosition: 'inside',
  colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
  hoverTemplate: '%{x}<br>%{y}',
  textTemplate: '%{x}<br>%{y}',
  showLegend: true,
  barWidth: null,
  barOpacity: 0.8,
  barMode: 'group',
};



BarGraph.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default BarGraph;








































































/*
Problem Statement: 
Attendance Management System is software developed for daily
student attendance in schools, colleges and institutes. 
It facilitates to access the attendance information of a 
particular student in a particular class. This system will 
also help in evaluating attendance eligibility criteria of a student. 
By just a click on the mouse, the system will be able to produce the students' 
attendance report thus reducing the need for manual labour which is prone to 
human errors and time consuming. The student can only view the 
attendance record on weekly, monthly, and whole semester basis. 
The staff can view as well as modify the attendance record.
*/