import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import {indicatorTracedata as itd} from '../compDummyData';
const Plot = createPlotlyComponent(Plotly);


class IndicatorTrace extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, colorArray, traceType, traceMode, 
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');

      if (dataset && dataset.length > 0) {

        for(let element in dataset) {

        }
        let keys = [...Array(dataset.length).keys()];
        procData = keys.map((d, i) => ({
          type: "indicator",
          mode: traceMode,
          value: undefined,
          delta: {reference : 200},
          domain: undefined,
          title: {text : ''},
          gauge: {
            shape: traceType,
            axis: { range: undefined},
            threshold: {
              line: { color: newColorArr[0], width: 4 },
              thickness: 0.75,
              value: undefined
            },
            steps: [
              { range: undefined, color: newColorArr[1] },
              {
                range: undefined,
                color: newColorArr[2]
              }
            ],
            bar: { color: newColorArr[3] }
          }  
        }));
        
        let i = 0;
        
        procData.forEach((d) => {
          let elem = dataset[i];
          d.value = elem.value;
          d.domain = elem.domain;
          d.title.text = elem.title;
          d.gauge.axis.range = elem.axis;
          d.gauge.threshold.value = elem.threshold;
          d.gauge.steps[0].range = elem.range1;
          d.gauge.steps[1].range = elem.range2;
          i += 1;
          console.log(d);
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
          height: 250,
          width: 600,
          margin: { t: 10, r: 25, l: 25, b: 10 }
        }}
      />
    );
  }
}

IndicatorTrace.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  
};

IndicatorTrace.defaultProps = {
  dataset: itd,
  colorArray: 'green,lightgray,gray,gold',
};


export default IndicatorTrace;





































































