import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ScatterPlot from '../components/ScatterPlot';
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

const ScatterPlotForm = () => {

  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  const [config, setConfig] = useState({
    dataset: bgd, colorArray: 'indigo,violet,pink', markerSize: 14, markerSymbol: 'circle', showLegend: true,
    markerOpacity: 1, xAxisLabel:'', yAxisLabel:'', xAxisTickAngle: 45, yAxisTickAngle: 0, hoverTemplate :'%{x}<br>%{y}',
    textTemplate : '%{x}<br>%{y}', textPosition: 'middle center', 
  });

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">Scatter Plot </h2>
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
              type="number"
              label="Marker Size"
              name="markerSize"
              variant="outlined"
              onChange={handleInputChange}
              value={config.markerSize}
              size="small"
              InputProps={{inputProps : {min:10, max: 30 }}}
              className={classes.root}
            />
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
                <MenuItem value="triangle-up">Triangle</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="number"
              label="Marker Opacity"
              name="markerOpacity"
              variant="outlined"
              onChange={handleInputChange}
              value={config.markerOpacity}
              size="small"
              InputProps={{inputProps : {min: 0, max: 1}}}
              className={classes.root}
            />
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Text Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.textPosition}
                name="textPosition"
                onChange={handleInputChange}
                label="Text Position"
              >
                <MenuItem value="top left">Top Left</MenuItem>
                <MenuItem value="top right">Top Right</MenuItem>
                <MenuItem value="top center">Top Center</MenuItem>
                <MenuItem value="middle left">Middle Left</MenuItem>
                <MenuItem value="middle right">Middle Right</MenuItem>
                <MenuItem value="middle center">Middle Center</MenuItem>
                <MenuItem value="bottom left">Bottom Left</MenuItem>
                <MenuItem value="bottom right">Bottom Right</MenuItem>
                <MenuItem value="bottom center">Bottom Center</MenuItem>
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
            <FormControlLabel
              control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
              label="Show Legend"
            />  
          </div> 
          <div className="col-md-7">
            <div className="Graph">
              <ScatterPlot  {...config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ScatterPlotForm.propTypes = {
  config: PropTypes.shape({
    colorArray: PropTypes.string, 
    markerSize: PropTypes.number, 
    markerSymbol: PropTypes.string, 
    showLegend: true,
    markerOpacity: PropTypes.number, 
    xAxisLabel: PropTypes.string, 
    yAxisLabel: PropTypes.string, 
    xAxisTickAngle: PropTypes.number, 
    yAxisTickAngle: PropTypes.number, 
    hoverTemplate :PropTypes.string,
    textTemplate : PropTypes.string, 
    textPosition: PropTypes.string
  }),
};

ScatterPlotForm.defaultProps = { config: {} };

export default ScatterPlotForm;

