import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

let xcoord, ycoord;

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, textInfo,textPosition, holeVal, colorArray,hoverInfo, insideTextOrientation,
       sliceDirection, pieOpacity, pieRotation, showLegend,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',')

      if (dataset && dataset.length > 0) {

        const keys = Object.keys(dataset[0]);
        xcoord = keys[0];
        ycoord = keys[1];
        console.log("keys", keys);
        procData = [{
          values: [],
          labels: [],
          type: 'pie',
          hole: holeVal,
          insidetextorientation: insideTextOrientation,
          hoverinfo: hoverInfo,
          textinfo: textInfo,
          opacity: pieOpacity,
          rotation : pieRotation,
          direction : sliceDirection,
          showlegend : showLegend,
          textposition: textPosition,
          marker: {
            colors: newColorArr
          }
        }];
        
        dataset.forEach((field) => {
            procData.forEach((d) => {
              d.labels.push(field[keys[0]]);
              d.values.push(field[keys[1]]);
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
      showLegend,
    } = this.props;

    return (
      <Plot
        data={procData}
        layout={{ 
          height: undefined,
          width: undefined,
          showlegend: showLegend,
          hovermode: 'closest',
        }}
        onClick = {(data) => {
          var pts;
          for(var i=0; i < data.points.length; i++){
              let x = data.points[i].pointNumber;
              pts = data.points[i].data.labels[x]+' : '+data.points[i].data.values[x];
          }
          alert('The values are:\n'+pts);
        }}
      />
    );
  }
}

PieChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  
};

PieChart.defaultProps = {
  dataset: [],
  textPosition: 'inside',
  textInfo: 'label+percent', 
  holeVal: 0, 
  colorArray: '', 
  hoverInfo: 'label+percent', 
  insideTextOrientation: 'horizontal',
  sliceDirection: 'counterclockwise', 
  pieOpacity: 0.9, 
  pieRotation: 0, 
  showLegend: 'true',
};


export default PieChart;





































































