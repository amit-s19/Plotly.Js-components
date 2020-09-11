import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import BarGraph from '../components/BarGraph';
import { makeStyles } from '@material-ui/core/styles';
import {barDummydata as bgd} from '../compDummyData';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const BarGraphForm = () => {

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const [config, setConfig] = useState({
    dataset: bgd, xAxisLabel:'', yAxisLabel:'', xAxisTickAngle: 45, yAxisTickAngle: 0, orientation: 'v',
    barGap: 0.2, textPosition: 'inside', colorArray: 'cornflowerblue,orange,pink,seagreen,yellow', barMode: 'group',
    hoverTemplate :'%{x}<br>%{y}', showLegend : true, barWidth : null, barOpacity : 0.8, textTemplate : '%{x}<br>%{y}'
});

const classes = useStyles();

  return (
    <>
   <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Bar Graph </h2>
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
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Bar Mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.barMode}
          name="barMode"
          onChange={handleInputChange}
          label="Bar Mode"
        >
          <MenuItem value="group">Group</MenuItem>
          <MenuItem value="stack">Stack</MenuItem>
          <MenuItem value="relative">Relative</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Hover Template"
        name="hoverTemplate"
        variant="outlined"
        onChange={handleInputChange}
        value={config.hoverTemplate}
        size="small"
        className={classes.root}
      />
      <TextField
        fullWidth
        label="Text Template"
        name="textTemplate"
        variant="outlined"
        onChange={handleInputChange}
        value={config.textTemplate}
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
        <InputLabel>Orientation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.orientation}
          name="orientation"
          onChange={handleInputChange}
          label="Orientation"
        >
          <MenuItem value="v">Vertical</MenuItem>
          <MenuItem value="h">Horizontal</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Text Position</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.textPosition}
          name="textPosition"
          onChange={handleInputChange}
          label="Text Position"
        >
          <MenuItem value="inside">Inside</MenuItem>
          <MenuItem value="outside">Outside</MenuItem>
          <MenuItem value="auto">Auto</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        type="number"
        label="Bar Gap"
        name="barGap"
        variant="outlined"
        onChange={handleInputChange}
        value={config.barGap}
        size="small"
        InputProps={{ inputProps: { min: 0 } }}
        className={classes.root}
      />
      <TextField
        fullWidth
        type="number"
        label="Bar Opacity"
        name="barOpacity"
        variant="outlined"
        onChange={handleInputChange}
        value={config.barOpacity}
        size="small"
        InputProps={{ inputProps: { min: 0, max: 1 } }}
        className={classes.root}
      />
      <FormControlLabel
        control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
        label="Show Legend"
      />  
      </form>
      </div> 
      <div className="col-md-7">
    <div className="Graph">
    <BarGraph  {...config} />
      </div>
     </div>
      </div>
    </div>
    
    </>
    
  );
};

BarGraphForm.propTypes = {
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
  // handleInputChange: PropTypes.func.isRequired,
  // classes: PropTypes.shape({ formControl: PropTypes.string }).isRequired,
};

BarGraphForm.defaultProps = { config: {} };

export default BarGraphForm;

