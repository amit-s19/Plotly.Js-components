import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FunnelChart from '../components/FunnelChart';
import { makeStyles } from '@material-ui/core/styles';
import {barDummydata as bgd} from '../compDummyData';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      //width: '50ch',
    },
  },
}));


const FunnelChartForm = () => {

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const [config, setConfig] = useState({
    dataset: bgd, yAxisLabel:'', orientation: 'h', textPosition: 'inside', textAngle: 0, 
    colorArray: 'cornflowerblue,orange,pink,seagreen,yellow', hoverTemplate :'%{x}<br>%{y}', 
    showLegend : true, barWidth : 0.7, barOpacity : 0.8,textInfo: 'label+value+text+percent initial', 
});

const classes = useStyles();

  return (
    <>
    <div className="FunnelChartForm">
      <div className="Form">
      <h1>Funnel Chart </h1>
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
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Text Info</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.textInfo}
          name="textInfo"
          onChange={handleInputChange}
          label="Text Info"
      >
          <MenuItem value="label+value+text+percent initial">Label + Value + Text + Percent Initial</MenuItem>
          <MenuItem value="label+text+percent initial">Label + Text + Percent Initial</MenuItem>
          <MenuItem value="label+value+percent initial">Label + Value + Percent Initial</MenuItem>
          <MenuItem value="label+value">Label + Value</MenuItem>
          <MenuItem value="label+text">Label + Text</MenuItem>
        </Select>
      </FormControl>
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
        label="Text Angle"
        name="textAngle"
        variant="outlined"
        onChange={handleInputChange}
        value={config.textAngle}
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
    <div className="Graph">
    <FunnelChart  {...config} />
     
      </div>
    </div>
    
    </>
    
  );
};



FunnelChartForm.propTypes = {
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
};

//FunnelChartForm.defaultProps = { config: {} };

export default FunnelChartForm;

