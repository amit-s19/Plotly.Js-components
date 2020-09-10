import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

class ParallelCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, categoryOrder, hoverInfo, colorArray, lineShape, chartArrangement, sortPath,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');

      if (dataset && dataset.length > 0) {
        const keys = Object.keys(dataset[0]);
        let n = keys.length-1;
        procData = keys.slice(0,1 ).map((d, i) => ({
          type: 'parcats',
          dimensions: [],
          counts: [],
          hoverinfo: hoverInfo,
          line: {
            color: newColorArr[i], 
            shape: lineShape,
          },
          arrangement: chartArrangement,
          sortpaths: sortPath,
        }));

        procData.forEach((d) => {
          for(let key in keys.slice(0, n)) {
            let x = { 
              label: undefined, 
              values: [], 
              categoryorder: categoryOrder, 
            };
            x.label = keys[key];
            d.dimensions.push(x);
          }
          dataset.forEach((field) => {
            for(let key in keys.slice(0, n)) {
              d.dimensions[key].values.push(field[keys[key]]);
            }
            d.counts.push(field[keys[n]]);
          });
        });
        console.log(procData);
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

    return (
      <Plot
        data={procData}
        layout={{
          hovermode: 'closest',
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

ParallelCategory.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  categoryOrder: PropTypes.string, 
  hoverInfo: PropTypes.string, 
  colorArray: PropTypes.string, 
  lineShape: PropTypes.string,
  chartArrangement: PropTypes.string, 
  sortPath: PropTypes.string
};

ParallelCategory.defaultProps = {
  dataset: [],
  categoryOrder: 'trace', 
  hoverInfo: 'count', 
  colorArray: 'orange', 
  lineShape: 'linear',
  chartArrangement: 'perpendicular', 
  sortPath: 'forward'
};

// ParallelCategory.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/line+chart.svg';

export default ParallelCategory;
