import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import SankeyChart from '../components/SankeyChart';
import { makeStyles } from '@material-ui/core/styles';
import {sanDummydata as sdd } from '../compDummyData';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const SankeyChartForm = () => {

  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  const [config, setConfig] = useState({
    dataset: sdd, showLegend: true, chartOpacity: 1, hoverTemplate :'%{x}<br>%{y}', 
    textTemplate : '%{x}<br>%{y}', textPosition: 'middle center', Orientation: 'h', 
    nodeThickness: 20, nodePad: 10, Arrangement: 'snap', 
    colorArray: 'orange,green,blue,red,pink,indigo,violet,purple,brown,lightblue',
  });

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
          <h2 className="display-4">Sankey Chart </h2>
            <TextField
              fullWidth
              label="Node Colors"
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
              label="Chart Opacity"
              name="chartOpacity"
              variant="outlined"
              onChange={handleInputChange}
              value={config.chartOpacity}
              size="small"
              InputProps={{inputProps : {min: 0, max: 1}}}
              className={classes.root}
            />
            <TextField
              fullWidth
              type="number"
              label="Node Thickness"
              name="nodeThickness"
              variant="outlined"
              onChange={handleInputChange}
              value={config.nodeThickness}
              size="small"
              InputProps={{inputProps : {min: 10, max: 100}}}
              className={classes.root}
            />
            <TextField
              fullWidth
              type="number"
              label="Node Padding"
              name="nodePad"
              variant="outlined"
              onChange={handleInputChange}
              value={config.nodePad}
              size="small"
              InputProps={{inputProps : {min: 0, max: 100}}}
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
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Arrangement</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.Arrangement}
                name="Arrangement"
                onChange={handleInputChange}
                label="Arrangement"
              >
                <MenuItem value="snap">Snap</MenuItem>
                <MenuItem value="perpendicular">Perpendicular</MenuItem>
                <MenuItem value="freeform">Freeform</MenuItem>
                <MenuItem value="fixed">Fixed</MenuItem>
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
            <FormControlLabel
              control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
              label="Show Legend"
            />  
          </div> 
          <div className="col-md-7">
            <div className="Graph">
              <SankeyChart {...config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SankeyChartForm.propTypes = {
  config: PropTypes.shape({
    showLegend: PropTypes.bool, 
    chartOpacity: PropTypes.number, 
    hoverTemplate : PropTypes.string, 
    textTemplate : PropTypes.string, 
    textPosition: PropTypes.string, 
    Orientation: PropTypes.string, 
    nodeThickness: PropTypes.number, 
    nodePad: PropTypes.number, 
    Arrangement: PropTypes.string, 
    colorArray: PropTypes.string
  }),
};

SankeyChartForm.defaultProps = { config: {} };

export default SankeyChartForm;

