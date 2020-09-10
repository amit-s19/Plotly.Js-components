import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import BubbleChart from '../components/BubbleChart';
import {bubbleChartData as bcd} from '../compDummyData';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const BubbleChartForm = () => {

  const handleInputChange = e => {
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  const [config, setConfig] = useState({
      dataset:bcd, xAxisLabel:'', yAxisLabel:'', xAxisTickAngle: 45, yAxisTickAngle: 0, opacity: 0.9,
      colorArray: 'cornflowerblue,orange,pink,yellow,seagreen', showLegend: true,
  });

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Bubble Chart </h2>
      <TextField
        fullWidth
        label="List of colors"
        name="colorArray"
        variant="outlined"
        onChange={handleInputChange}
        value={config.colorArray}
        size="small"
        className = {classes.root}
      />
      <TextField
        fullWidth
        label="X-axis Label"
        name="xAxisLabel"
        variant="outlined"
        onChange={handleInputChange}
        value={config.xAxisLabel}
        size="small"
        className = {classes.root}
      />
      <TextField
        fullWidth
        label="Y-axis Label"
        name="yAxisLabel"
        variant="outlined"
        onChange={handleInputChange}
        value={config.yAxisLabel}
        size="small"
        className = {classes.root}
      />
      <TextField
        fullWidth
        type="number"
        label="X-axis Tick Angle"
        name="xAxisTickAngle"
        variant="outlined"
        onChange={handleInputChange}
        value={config.xAxisTickAngle}
        size="small"
        InputProps={{ inputProps: { min: -180, max: 180 } }}
        className = {classes.root}
      />
      <TextField
        fullWidth
        type="number"
        label="Y-axis Tick Angle"
        name="yAxisTickAngle"
        variant="outlined"
        onChange={handleInputChange}
        value={config.yAxisTickAngle}
        size="small"
        InputProps={{ inputProps: { min: -180, max: 180 } }}
        className = {classes.root}
      />
      <TextField
        fullWidth
        type="number"
        label="Opacity"
        name="opacity"
        variant="outlined"
        onChange={handleInputChange}
        value={config.opacity}
        size="small"
        InputProps={{ inputProps: { min: 0, max: 1 } }}
        className = {classes.root}
      />
      <FormControlLabel
        control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
        label="Show Legend"
      />
        </div>
        <div className="col-md-7">
        <div className="Graph">
        <BubbleChart {...config} />
        </div>
        </div>
        </div>
      </div>
      
  
    </>
  );
};

BubbleChartForm.propTypes = {
  config: PropTypes.shape({
    xAxisLabel: PropTypes.string,
    yAxisLabel: PropTypes.string,
    xAxisTickAngle: PropTypes.number,
    yAxisTickAngle: PropTypes.number,
    colorArray: PropTypes.string,
    showLegend: PropTypes.bool,
    orientation: PropTypes.string,
    quartileMethod: PropTypes.string,
    lineWidth: PropTypes.number,
    boxWidth: PropTypes.number,
    opacity: PropTypes.number,
    boxMode: PropTypes.string,
    boxMean: PropTypes.string,
    boxPoints: PropTypes.string,
  }),
};

BubbleChartForm.defaultProps = { config: {} };

export default BubbleChartForm;
