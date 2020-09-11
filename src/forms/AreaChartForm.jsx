import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {barDummydata as acd} from '../compDummyData';
import AreaChart from '../components/AreaChart';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const AreaChartForm = () => {
  const handleInputChange = e => {
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };
  const [config, setConfig] = useState({
    dataset: acd, areaMode: 'scatter', areaFill: 'tozeroy', xAxisLabel: '', yAxisLabel: '', xAxisTickAngle: 45, yAxisTickAngle: 0,
    markerSize: 8, markerOpacity: 0.6, lineWidth: 2, lineShape: 'linear', lineStyle: 'solid', colorArray: 'cornflowerblue,orange,pink,yellow,seagreen',
    hoverTemplate: '%{x}<br>%{y}', showLegend: true, xAxisRange: '', yAxisRange: '', 
  });
  const classes = useStyles();
  

  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
          <h2 className="display-4">Area Chart </h2>
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
              label="X-axis range [n, m]"
              name="xAxisRange"
              variant="outlined"
              onChange={handleInputChange}
              value={config.xAxisRange}
              size="small"
              className={classes.root}
            />
              <TextField
              fullWidth
              label="Y-axis range [n, m]"
              name="yAxisRange"
              variant="outlined"
              onChange={handleInputChange}
              value={config.yAxisRange}
              size="small"
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
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Area Fill</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.areaFill}
                name="areaFill"
                onChange={handleInputChange}
                label="Area Fill"
              >
                <MenuItem value="toself">Toself</MenuItem>
                <MenuItem value="tonexty">Tonexty</MenuItem>
                <MenuItem value="tozeroy">Tozeroy</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Area Mode</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.areaMode}
                name="areaMode"
                onChange={handleInputChange}
                label="Area Mode"
              >
                <MenuItem value="scatter">Scatter</MenuItem>
                <MenuItem value="lines">Lines</MenuItem>
                <MenuItem value="none">None</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
              label="Show Legend"
            />
          </div>
        <div className="col-md-7">
          <div className="Graph">
            <AreaChart {...config} />
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

AreaChartForm.propTypes = {
  config: PropTypes.shape({
    areaMode: PropTypes.string,
    areaFill: PropTypes.string,
    xAxisLabel: PropTypes.string,
    yAxisLabel: PropTypes.string,
    xAxisTickAngle: PropTypes.number,
    yAxisTickAngle: PropTypes.number,
    markerSize: PropTypes.number,
    markerOpacity: PropTypes.number,
    lineWidth: PropTypes.number,
    lineShape: PropTypes.string,
    lineStyle: PropTypes.string,
    colorArray: PropTypes.string,
    showLegend: PropTypes.bool,
    hoverTemplate: PropTypes.string,
  }),
  // handleInputChange: PropTypes.func.isRequired,
  // classes: PropTypes.shape({ formControl: PropTypes.string }).isRequired,
};

AreaChartForm.defaultProps = { config: {} };

export default AreaChartForm;
