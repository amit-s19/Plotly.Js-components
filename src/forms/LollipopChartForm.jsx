import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import LollipopChart from '../components/LollipopChart';
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


const LollipopChartForm = () => {

  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  const [config, setConfig] = useState({
    dataset: bgd, xAxisLabel:'', yAxisLabel:'', xAxisTickAngle: 45, yAxisTickAngle: 0, orientation: 'v',
    colorArray: 'purple,pink', markerSize: 30, hoverTemplate :'%{x}<br>%{y}', showLegend : true, 
    barWidth : 0.08, barOpacity : 0.8, textTemplate : '%{x}<br>%{y}', markerMode: 'markers',
    markerSymbol: 'circle',
  });

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">Lollipop Chart </h2>
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
              <InputLabel>Marker Mode</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.markerMode}
                name="markerMode"
                onChange={handleInputChange}
                label="Marker Mode"
              >
                <MenuItem value="markers">Markers</MenuItem>
                <MenuItem value="lines">Lines</MenuItem>
                <MenuItem value="lines+markers">Lines+Markers</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Marker Symbol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.markerSymbol}
                name="markerSymbol"
                onChange={handleInputChange}
                label="Marker Symbol"
              >
                <MenuItem value="circle">Circle</MenuItem>
                <MenuItem value="square">Square</MenuItem>
                <MenuItem value="diamond">Diamond</MenuItem>
                <MenuItem value="hourglass">Hourglass</MenuItem>
                <MenuItem value="hexagon">Hexagon</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="number"
              label="Chart Opacity"
              name="barOpacity"
              variant="outlined"
              onChange={handleInputChange}
              value={config.barOpacity}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 1 } }}
              className={classes.root}
            />
            <TextField
              fullWidth
              type="number"
              label="Marker Size"
              name="markerSize"
              variant="outlined"
              onChange={handleInputChange}
              value={config.markerSize}
              size="small"
              InputProps={{ inputProps: { min: 15, max: 50 } }}
              className={classes.root}
            />
            <TextField
              fullWidth
              type="number"
              label="Line Width"
              name="barWidth"
              variant="outlined"
              onChange={handleInputChange}
              value={config.barWidth}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 0.3 } }}
              className={classes.root}
            />
            <FormControlLabel
              control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
              label="Show Legend"
            />  
          </div> 
          <div className="col-md-7">
            <div className="Graph">
              <LollipopChart  {...config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LollipopChartForm.propTypes = {
  config: PropTypes.shape({
    xAxisLabel: PropTypes.string, 
    yAxisLabel: PropTypes.string, 
    xAxisTickAngle: PropTypes.number, 
    yAxisTickAngle: PropTypes.number, 
    orientation: PropTypes.string,
    colorArray: PropTypes.string, 
    markerSize: PropTypes.number, 
    hoverTemplate : PropTypes.string, 
    showLegend : PropTypes.bool, 
    barWidth : PropTypes.number, 
    barOpacity : PropTypes.number, 
    textTemplate : PropTypes.string, 
    markerMode: PropTypes.string,
    markerSymbol: PropTypes.string
  }),
};

LollipopChartForm.defaultProps = { config: {} };

export default LollipopChartForm;

