import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import MixMatch from '../components/MixMatch';
import { makeStyles } from '@material-ui/core/styles';
import { barDummydata as bgd } from '../compDummyData';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const MixMatchForm = () => {


const [config, setConfig] = useState({
    dataset: bgd, bar: false, line: false, area: false, scatter: false, xAxisLabel:'', yAxisLabel:'', 
    xAxisTickAngle: 45, yAxisTickAngle: 0, textTemplate : '%{x}<br>%{y}', hoverTemplate :'%{x}<br>%{y}',
    barWidth : null, barOpacity : 0.8, barMode: 'group', barGap: 0.2, barColors: 'black,crimson,orange',
    lineColors:'', lineWidth: 2, lineMarkerOpacity: 0.8, lineStyle: 'solid', lineShape: 'linear', 
    lineMarkerSize: 6, lineMode: 'lines+markers',
});

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const handleCheckChange = (event) => {
  setConfig({ ...config, [event.target.name]: event.target.checked });
};

const renderTemplates = () => {
  if(config.bar || config.area || config.line || config.scatter)
  return (
    <form>
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
  </form>
  );
}

const renderBarForm = () => {
  if(config.bar)
  return (
    <form>
    <hr className='divider'/>
    <h3>Bar Properties</h3>
    <TextField
        fullWidth
        label="List of colors"
        name="barColors"
        variant="outlined"
        onChange={handleInputChange}
        value={config.barColors}
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
      </form>
  );
}

const renderLineForm = () => {
  if(config.line)
  return (
    <form>
      <hr className="divider"></hr>
      <h3>Line Properties</h3>
      <TextField
        fullWidth
        label="Line Colors"
        name="lineColors"
        variant="outlined"
        onChange={handleInputChange}
        value={config.colorArray}
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
        <InputLabel>Mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.lineMode}
          name="lineMode"
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
        name="lineMarkerSize"
        variant="outlined"
        onChange={handleInputChange}
        value={config.lineMarkerSize}
        size="small"
        InputProps={{ inputProps: { min: 0 } }}
        className={classes.root}
      />
      <TextField
        fullWidth
        type="number"
        label="Marker Opacity"
        name="lineMarkerOpacity"
        variant="outlined"
        onChange={handleInputChange}
        value={config.markerOpacity}
        size="small"
        InputProps={{ inputProps: { min: 0, max: 1 } }}
        className={classes.root}
      />
    </form>
  );
}

const classes = useStyles();

  return (
    <>
   <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Mix n Match</h2>
        
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select Charts</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={config.bar} onChange={handleCheckChange} name="bar" />}
            label="Bar Graph"
          />
          <FormControlLabel
            control={<Checkbox checked={config.line} onChange={handleCheckChange} name="line" />}
            label="Line Chart"
          />
          <FormControlLabel
            control={<Checkbox checked={config.area} onChange={handleCheckChange} name="area" />}
            label="Area Chart"
          />
          <FormControlLabel
            control={<Checkbox checked={config.scatter} onChange={handleCheckChange} name="scatter" />}
            label="Scatter Plot"
          />
        </FormGroup>
      </FormControl>
      {renderTemplates()}
      {renderBarForm()}
      {renderLineForm()}
      </div> 
      <div className="col-md-7">
    <div className="Graph">
    <MixMatch  {...config} />
      </div>
     </div>
      </div>
    </div>
    
    </>
    
  );
};



// MixMatchForm.propTypes = {
//   config: PropTypes.shape({
//     orientation: PropTypes.string,
//     textPosition: PropTypes.string,
//     xAxisLabel: PropTypes.string,
//     yAxisLabel: PropTypes.string,
//     xAxisTickAngle: PropTypes.number,
//     yAxisTickAngle: PropTypes.number,
//     barGap: PropTypes.number,
//     barOpacity: PropTypes.number,
//     barWidth: PropTypes.number,
//     colorArray: PropTypes.string,
//     showLegend: PropTypes.bool,
//     hoverTemplate: PropTypes.string,
//     textTemplate: PropTypes.string,
//     barMode: PropTypes.string,
//   }),
// };

//MixMatchForm.defaultProps = { config: {} };

export default MixMatchForm;

