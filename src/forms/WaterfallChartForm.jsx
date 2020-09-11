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
    Measure: 'relative', barText: '', customOptions: '', hoverTemplate: '', textTemplate: '', 
    xAxisLabel: 'X-Axis Label', yAxisLabel: 'Y-Axis Label', xAxisTickAngle: 0, yAxisTickAngle: 0,  
    textPosition: 'inside', colorArray: '', lineWidth: 0, 
  });

  const classes = useStyles();

  const checkCustom = () => {
    if(config.Measure == 'custom')
      return (
        <TextField
        fullWidth
        label="Enter options separated by commas."
        name="customOptions"
        variant="outlined"
        onChange={handleInputChange}
        value={config.customOptions}
        size="small"
        className={classes.root}
        />
      );
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">Waterfall Chart </h2>
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
              label="Line Width"
              name="lineWidth"
              variant="outlined"
              onChange={handleInputChange}
              value={config.lineWidth}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
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
              InputProps={{ inputProps: { min: 0, max: 1 } }}
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
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
            {checkCustom()}
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
              label="Hover Text"
              name="barText"
              variant="outlined"
              onChange={handleInputChange}
              value={config.barText}
              size="small"
              className={classes.root}
            />
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



WaterfallChartForm.propTypes = {
  config: PropTypes.shape({
    showLegend: PropTypes.bool, 
    traceName: PropTypes.string, 
    Orientation: PropTypes.string, 
    Opacity: PropTypes.number, 
    barWidth: PropTypes.number,
    Measure: PropTypes.string, 
    barText: PropTypes.string, 
    customOptions: PropTypes.string, 
    hoverTemplate: PropTypes.string, 
    textTemplate: PropTypes.string, 
    xAxisLabel: PropTypes.string, 
    yAxisLabel: PropTypes.string, 
    xAxisTickAngle: PropTypes.number, 
    yAxisTickAngle: PropTypes.number,  
    textPosition: PropTypes.string, 
    colorArray: PropTypes.string, 
    lineWidth: PropTypes.number,    
  }),
  // handleInputChange: PropTypes.func.isRequired,
  // classes: PropTypes.shape({ formControl: PropTypes.string }).isRequired,
};

WaterfallChartForm.defaultProps = { config: {} };

export default WaterfallChartForm;



