import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);


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
        console.log("keys", keys);
        procData = keys.slice(0, keys.length).map((d, i) => ({
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
            },
        }));

        
        dataset.forEach((field) => {
          for(let key in field) {
            procData.forEach((d) => {
              d.labels.push(key);
              d.values.push(field[key]);
            });            
          }
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
      h, w,
    } = this.props;

    return (
      <Plot
        data={procData}
        layout={{ 
          height: undefined,
          width: undefined
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





































































