import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {pieDummydata as pcd} from '../compDummyData';
import PieChart from '../components/PieChart';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const PieChartForm = () => {

  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };
  const [config, setConfig] = useState({
    dataset: pcd, textPosition: 'inside', textInfo: 'label+percent', holeVal: 0, 
    colorArray: '', hoverInfo: 'label+percent', insideTextOrientation: 'horizontal',
    sliceDirection: 'counterclockwise', pieOpacity: 0.9, pieRotation: 0, showLegend: true,
  });
  const classes = useStyles();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">Pie Chart </h2>
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
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
            <InputLabel>Text Info</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={config.textInfo}
              name="textInfo"
              onChange={handleInputChange}
              label="Text Info"
            >
              <MenuItem value="label">Label</MenuItem>
              <MenuItem value="label+percent">Label+Percent</MenuItem>
              <MenuItem value="label+percent+value">Label+Percent+Value</MenuItem>
              <MenuItem value="auto">Auto</MenuItem>
              <MenuItem value="none">None</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
            <InputLabel>Inside text orientation</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={config.insideTextOrientation}
              name="insideTextOrientation"
              onChange={handleInputChange}
              label="Inside text orientation"
            >
              <MenuItem value="horizontal">Horizontal</MenuItem>
              <MenuItem value="radial">Radial</MenuItem>
              <MenuItem value="tangential">Tangential</MenuItem>
              <MenuItem value="auto">Auto</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="number"
              label="Pie Hole"
              name="holeVal"
              variant="outlined"
              onChange={handleInputChange}
              value={config.holeVal}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 1 } }}
              className={classes.root}
            />
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
            <InputLabel>Direction</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={config.sliceDirection}
              name="sliceDirection"
              onChange={handleInputChange}
              label="Direction of chart"
            >
              <MenuItem value="clockwise">Clockwise</MenuItem>
              <MenuItem value="counterclockwise">Counterclockwise</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="number"
              label="Chart Opacity"
              name="pieOpacity"
              variant="outlined"
              onChange={handleInputChange}
              value={config.pieOpacity}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 1 } }}
              className={classes.root}
            />
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
            <InputLabel>Hover Info</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={config.hoverInfo}
              name="hoverInfo"
              onChange={handleInputChange}
              label="Hover Info"
            >
              <MenuItem value="label">Label</MenuItem>
              <MenuItem value="label+percent">Label+Percent</MenuItem>
              <MenuItem value="label+percent+value">Label+Percent+Value</MenuItem>
              <MenuItem value="auto">Auto</MenuItem>
              <MenuItem value="none">None</MenuItem>
              </Select>
            </FormControl>
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
              label="Chart Rotation"
              name="pieRotation"
              variant="outlined"
              onChange={handleInputChange}
              value={config.pieRotation}
              size="small"
              InputProps={{ inputProps: { min: -360, max: 360 } }}
              className={classes.root}
            />
            <FormControlLabel
              control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
              label="Show Legend"
            />  
          </div>
          <div className="col-md-7">
            <div className="Graph">
              <PieChart {...config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PieChartForm.propTypes = {
  config: PropTypes.shape({
    textInfo: PropTypes.string,
    textPosition: PropTypes.string,
    holeVal: PropTypes.number, 
    colorArray: PropTypes.string, 
    hoverInfo: PropTypes.string, 
    insideTextOrientation: PropTypes.string,
    sliceDirection: PropTypes.string,
    pieOpacity: PropTypes.number,
    pieRotation: PropTypes.number,
  }),
};

export default PieChartForm ;