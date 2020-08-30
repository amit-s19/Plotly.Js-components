import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Histogram from '../components/Histogram';
import { makeStyles } from '@material-ui/core/styles';
import {histDummydata as hdd} from '../compDummyData';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1), 
      width: '100%',
    },
  },
}));


const HistogramForm = () => {

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const [config, setConfig] = useState({
    dataset: hdd,   histNames: 'Trace 0,Trace 1,Trace 2,Trace 3', xAxisLabel:'', yAxisLabel:'', xAxisTickAngle: 45, yAxisTickAngle: 0,
    orientation: 'v', barGap: 0, colorArray: 'black,orange', barMode: 'group', hoverTemplate :'%{x}<br>%{y}',
    showLegend : true, barOpacity : 0.8, histCumulative: false,histFunc: 'count', histNorm: 'percent',
});

const classes = useStyles();

  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Histogram </h2>
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
        label="Trace Names"
        name="histNames"
        variant="outlined"
        onChange={handleInputChange}
        value={config.histNames}
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
          <MenuItem value="overlay">Overlay</MenuItem>
          <MenuItem value="stack">Stack</MenuItem>
          <MenuItem value="relative">Relative</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Binning Function</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.histFunc}
          name="histFunc"
          onChange={handleInputChange}
          label="Binning Function"
        >
          <MenuItem value="count">Count</MenuItem>
          <MenuItem value="sum">Sum</MenuItem>
          <MenuItem value="avg">Average</MenuItem>
          <MenuItem value="min">Minimum</MenuItem>
          <MenuItem value="max">Maximum</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Normalization Function</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.histNorm}
          name="histNorm"
          onChange={handleInputChange}
          label="Normalization Function"
        >
          <MenuItem value="percent">Percent</MenuItem>
          <MenuItem value="probability">Probability</MenuItem>
          <MenuItem value="density">Density</MenuItem>
          <MenuItem value="probabilitydensity">Probability Density</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Cumulative</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.histCumulative}
          name="histCumulative"
          onChange={handleInputChange}
          label="Cumulative"
        >
          <MenuItem value={true}>Enable</MenuItem>
          <MenuItem value={false}>Disable</MenuItem>
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
    <Histogram  {...config} />
      </div>
      </div>
      </div> 
    </div>
    
    </>
    
  );
};



HistogramForm.propTypes = {
  config: PropTypes.shape({
    histNames: PropTypes.string, 
    xAxisLabel: PropTypes.string, 
    yAxisLabel: PropTypes.string, 
    xAxisTickAngle: PropTypes.number, 
    yAxisTickAngle: PropTypes.number,
    orientation: PropTypes.string, 
    barGap: PropTypes.number, 
    colorArray: PropTypes.string, 
    barMode: PropTypes.string, 
    hoverTemplate: PropTypes.string,
    showLegend : PropTypes.bool, 
    barOpacity : PropTypes.number, 
    histCumulative: PropTypes.bool,
    histFunc: PropTypes.string, 
    histNorm: PropTypes.string,
  }),
};

HistogramForm.defaultProps = { config: {} };

export default HistogramForm;

