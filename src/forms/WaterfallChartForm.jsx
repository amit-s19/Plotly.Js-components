import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import WaterfallChart from '../components/WaterfallChart';
import { waterDummydata as wdd } from '../compDummyData';
import { makeStyles } from '@material-ui/core/styles';

import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const WaterfallChartForm = () => {

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const [config, setConfig] = useState({
    dataset: wdd, showLegend: true, traceName: 'Trace 0', Orientation: 'v', Opacity: 1, barWidth: 0.7,
    Measure: 'relative', barText: '',
});

const classes = useStyles();

  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Waterfall Chart </h2>
      
      <TextField
        fullWidth
        label="Trace Name"
        name="traceName"
        variant="outlined"
        onChange={handleInputChange}
        value={config.traceName}
        size="small"
        className={classes.root}
      />

 <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Orientation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.Orientation}
          name="Orientation"
          onChange={handleInputChange}
          label="Orientation"
        >
          <MenuItem value="v">Vertical</MenuItem>
          <MenuItem value="h">Horizontal</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        type="number"
        label="Chart Opacity"
        name="Opacity"
        variant="outlined"
        onChange={handleInputChange}
        value={config.Opacity}
        size="small"
        InputProps={{ inputProps: { min: 0, max: 1 } }}
        className={classes.root}
      />

    <TextField
        fullWidth
        type="number"
        label="Bar Width"
        name="barWidth"
        variant="outlined"
        onChange={handleInputChange}
        value={config.barWidth}
        size="small"
        InputProps={{ inputProps: { min: 0 } }}
        className={classes.root}
      />
     
     <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Measure</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.Measure}
          name="Measure"
          onChange={handleInputChange}
          label="Measure"
        >
          <MenuItem value="relative">Relative</MenuItem>
          <MenuItem value="absolute">Absolute</MenuItem>
          <MenuItem value="total">Total</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Text"
        name="barText"
        variant="outlined"
        onChange={handleInputChange}
        value={config.barText}
        size="small"
        className={classes.root}
      />
      

      <FormControlLabel
        control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
        label="Show Legend"
      />  
      
      </div> 
      <div className="col-md-7">
    <div className="Graph">
    <WaterfallChart  {...config} />
      </div>
      </div>
    </div>
    </div>
    </>
    
  );
};



// WaterfallChartForm.propTypes = {
//   config: PropTypes.shape({
//     colorArray: PropTypes.string,  
//     dotTitle:  PropTypes.string,
//     dotSize: PropTypes.number,  
//     xAxisLabel: PropTypes.string, 
//     yAxisLabel: PropTypes.string, 
//     xAxisTickAngle: PropTypes.number,  
//     yAxisTickAngle: PropTypes.number, 
//     showLegend: PropTypes.bool,  
    
//   }),
// };

WaterfallChartForm.defaultProps = { config: {} };

export default WaterfallChartForm;



