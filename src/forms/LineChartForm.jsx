import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import LineChart from '../components/LineChart';
import {barDummydata as lcd} from '../compDummyData';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const LineChartForm = () => {

  const handleInputChange = e => {
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };
  
  const [config, setConfig] = useState({
    dataset:lcd, xAxisLabel: '', yAxisLabel: '', xAxisTickAngle: 45, yAxisTickAngle: 0,
    colorArray: 'cornflowerblue,orange,pink,yellow,seagreen', hoverTemplate: '%{x}<br>%{y}',
    showLegend: true, lineWidth: 2, markerOpacity: 0.8, lineStyle: 'solid',
    lineShape: 'linear', markerSize: 6, mode: 'lines+markers',
  });

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">Line Chart </h2>
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
              label="Line Width"
              name="lineWidth"
              variant="outlined"
              onChange={handleInputChange}
              value={config.lineWidth}
              size="small"
              InputProps={{ inputProps: { min: 0 } }}
              className={classes.root}
            />
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Mode</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.mode}
                name="mode"
                onChange={handleInputChange}
                label="Mode"
              >
                <MenuItem value="lines+markers">Lines + Markers</MenuItem>
                <MenuItem value="lines">Lines</MenuItem>
                <MenuItem value="none">None</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Line Shape</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.lineShape}
                name="lineShape"
                onChange={handleInputChange}
                label="Line Shape"
              >
                <MenuItem value="linear">Linear</MenuItem>
                <MenuItem value="spline">Spline</MenuItem>
                <MenuItem value="hv">hv</MenuItem>
                <MenuItem value="vh">vh</MenuItem>
                <MenuItem value="hvh">hvh</MenuItem>
                <MenuItem value="vhv">vhv</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Line Style</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.lineStyle}
                name="lineStyle"
                onChange={handleInputChange}
                label="Line Style"
              >
                <MenuItem value="solid">Solid</MenuItem>
                <MenuItem value="dot">Dot</MenuItem>
                <MenuItem value="dash">Dash</MenuItem>
                <MenuItem value="longdash">Long Dash</MenuItem>
                <MenuItem value="dashdot">Dash Dot</MenuItem>
                <MenuItem value="longdashdot">Long Dash Dot</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="number"
              label="Marker Size"
              name="markerSize"
              variant="outlined"
              onChange={handleInputChange}
              value={config.markerSize}
              size="small"
              InputProps={{ inputProps: { min: 0 } }}
              className={classes.root}
            />
            <TextField
              fullWidth
              type="number"
              label="Marker Opacity"
              name="markerOpacity"
              variant="outlined"
              onChange={handleInputChange}
              value={config.markerOpacity}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 1 } }}
              className={classes.root}
            />
            <FormControlLabel
              control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
              label="Show Legend"
            />
          </div>
          <div className="col-md-7">
            <div className="Graph">
              <LineChart {...config} /> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LineChartForm.propTypes = {
  config: PropTypes.shape({
    xAxisLabel: PropTypes.string,
    yAxisLabel: PropTypes.string,
    xAxisTickAngle: PropTypes.number,
    yAxisTickAngle: PropTypes.number,
    barGap: PropTypes.number,
    markerOpacity: PropTypes.number,
    markerSize: PropTypes.number,
    lineWidth: PropTypes.number,
    colorArray: PropTypes.string,
    showLegend: PropTypes.bool,
    hoverTemplate: PropTypes.string,
    textTemplate: PropTypes.string,
    mode: PropTypes.string,
    lineStyle: PropTypes.string,
    lineShape: PropTypes.string,
  }),
  // handleInputChange: PropTypes.func.isRequired,
  // classes: PropTypes.shape({ formControl: PropTypes.string }).isRequired,
};

LineChartForm.defaultProps = { config: {} };

export default LineChartForm;
