import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import CandleChart from '../components/CandleChart';
import { makeStyles } from '@material-ui/core/styles';
import { candleDummydata as cdd} from '../compDummyData';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      //width: '50ch',
    },
  },
}));


const CandleChartForm = () => {

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const [config, setConfig] = useState({
    dataset: cdd, colorArray:'seagreen,seagreen,crimson,crimson', xAxisLabel:'', yAxisLabel:'', xAxisTickAngle: 0, 
    yAxisTickAngle: 0, calType: 'gregorian', showLegend: true,
});

const classes = useStyles();

  return (
    <>
    <div className="CandleChartForm">
      <div className="Form">
      <h1>Candlestick Chart </h1>
      <form >
      <TextField
        fullWidth
        label="List of colors"
        name="colorArray"
        variant="outlined"
        onChange={handleInputChange}
        value={config.colorArray}
        size="small"
        className={classes.root}
      />
      <TextField
        fullWidth
        label="X-axis Label"
        name="xAxisLabel"
        variant="outlined"
        onChange={handleInputChange}
        value={config.xAxisLabel}
        size="small"
        className={classes.root}
      />
      <TextField
        fullWidth
        label="Y-axis Label"
        name="yAxisLabel"
        variant="outlined"
        onChange={handleInputChange}
        value={config.yAxisLabel}
        size="small"
        className={classes.root}
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
        className={classes.root}
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
        className={classes.root}
      />
    
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Calendar Format</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.calType}
          name="calType"
          onChange={handleInputChange}
          label="Calendar format"
        >
          <MenuItem value="gregorian">Gregorian</MenuItem>
          <MenuItem value="chinese">Chinese</MenuItem>
          <MenuItem value="hebrew">Hebrew</MenuItem>
          <MenuItem value="mayan">Mayan</MenuItem>
          <MenuItem value="islamic">Islamic</MenuItem>
        </Select>
      </FormControl>
      
      <FormControlLabel
        control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
        label="Show Legend"
      />  
      </form>
      </div> 
    <div className="Graph">
    <CandleChart  {...config} />
     
      </div>
    </div>
    
    </>
    
  );
};



CandleChartForm.propTypes = {
  config: PropTypes.shape({
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
  }),
};

//CandleChartForm.defaultProps = { config: {} };

export default CandleChartForm;

