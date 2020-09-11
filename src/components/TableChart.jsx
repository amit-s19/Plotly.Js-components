import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

class TableChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }
  processData = () => {
    const {
      dataset, tableAlign, colorArray,
    } = this.props;

    try {
      let procData = [];
      const newColorArr = colorArray.split(',');

      if (dataset && dataset.length > 0) {
        
        const keys = Object.keys(dataset[0]);

        var headerColor = newColorArr[0];
        var rowEvenColor = newColorArr[1];
        var rowOddColor = newColorArr[2];

        procData = [{
          type: 'table',
          header: {
            values: [],
            align: tableAlign,
            line: {width: 1, color: 'black'},
            fill: {color: headerColor},
            font: {family: "Arial", size: 14, color: "white"}
          },
          cells: {
            values: [],
            align: tableAlign,
            line: {color: "black", width: 1},
            fill: {color: []},
            font: {family: "Arial", size: 12, color: ["black"]}
          }
        }];
        
          procData.forEach((d) => {
            let x = [];
            for(let key in keys) {
              d.header.values.push(keys[key]);
              let y = []
              let i = parseInt(key);
              console.log(key);
              if(i%2 === 0 )
                d.cells.fill.color.push(rowEvenColor);
              else
                d.cells.fill.color.push(rowOddColor);
              dataset.forEach((field, i) => {
                y.push(field[keys[key]]);
              });
              x.push(y);
            }
            d.cells.values = x ; 
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
        layout= {{
          showlegend: showLegend,
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

TableChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  colorArray: PropTypes.string, 
  tableAlign: PropTypes.string, 
  showLegend: PropTypes.bool,
};

TableChart.defaultProps = {
  dataset: [],
  colorArray:'grey,lightgrey,white', 
  tableAlign: 'center', 
  showLegend: true,
};

// TableChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default TableChart;




