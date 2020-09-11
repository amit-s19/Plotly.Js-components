import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

let xcoord;

class FunnelChart extends Component {
  constructor(props) {
    super(props);
    this.state = { procData: [] };
  }

  processData = () => {
    const {
      dataset, barOpacity, barWidth, hoverTemplate, textPosition, orientation, colorArray,
      textInfo, textAngle, textTemplate,
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
          type: 'funnel',  
          name: d,
          width: barWidth,
          hovertemplate: hoverTemplate,
          textposition: textPosition,
          textinfo: textInfo,
          textTemplate: textTemplate,
          orientation: orientation,
          opacity: barOpacity,
          marker: { color: newColorArr[i] },
          textangle: textAngle,
        }));

        // procData.forEach((d, i) => {
        //   let field = dataset[i];
        //   d.name = field[keys[0]];
        //   keys.slice(1,keys.length).forEach((key, i) => {
        //     d.y.push(keys[i]);
        //     d.x.push(field[keys[i]]);
        //   })
        // });
        dataset.forEach((field) => {
          procData.forEach((d, i) => {
            d.y.push(field[keys[0]]);
            d.x.push(field[keys[i+1]]);
          })
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
      showLegend, yAxisLabel,
    } = this.props;

    return (
      <Plot
        data={procData}
        layout={{
          funnelmode: "stack", 
          showlegend: showLegend,
          yaxis: {
            title: yAxisLabel,
          },
          hovermode: 'closest',
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        onClick = {(data) => {
          var pts = '';
          for(var i=0; i < data.points.length; i++){
            pts = xcoord+' : ' +data.points[i].data.name+'\n'+
            data.points[i].y+' : '+data.points[i].x+ '\n\n';
          }
          alert('The values are:\n'+pts);
        }}
      />
    );
  }
}

FunnelChart.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
  yAxisLabel: PropTypes.string, 
  orientation: PropTypes.string,  
  textPosition: PropTypes.string, 
  colorArray: PropTypes.string, 
  hoverTemplate :PropTypes.string, 
  showLegend : PropTypes.bool, 
  barWidth : PropTypes.number, 
  barOpacity : PropTypes.number, 
  textTemplate : PropTypes.string,
  textInfo: PropTypes.string, 
  textAngle: PropTypes.number,
};

FunnelChart.defaultProps = {
  dataset: [],
  yAxisLabel:'', 
  orientation: 'h', 
  textPosition: 'inside', 
  colorArray: 'cornflowerblue,orange,pink,seagreen,yellow', 
  hoverTemplate :'%{x}<br>%{y}', 
  showLegend : true, 
  barWidth : 0.7, 
  barOpacity : 0.8, 
  textTemplate : '%{x}<br>%{y}',
  textInfo: 'label+value+text+percent initial', 
  textAngle: 0,
};

// FunnelChart.url = 'https://public-assets-ct.s3.us-east-2.amazonaws.com/website/svgs/bar+graph.svg';

export default FunnelChart;