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
import {barDummydata as rdd} from '../compDummyData';
import RadarChart from '../components/RadarChart';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const RadarChartForm = () => {

    const handleInputChange = e => {  
        const {name, value} = e.target ;
        setConfig({...config, [name]: value})
    };

    const [config, setConfig] = useState({
        dataset: rdd, radarOpacity: 0.8, radarMode: 'lines+markers', textTemplate : '', 
        hoverTemplate :'', markerSize: 10, markerType: 'circle', radarDash: 'solid',
        radarShape: 'linear', radarFill: 'toself', showLegend: true,
    });

    const classes = useStyles();

    return (
        <>
        <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Radar Chart </h2>
        
        <TextField
              fullWidth
              type="number"
              label="Chart Opacity"
              name="radarOpacity"
              variant="outlined"
              onChange={handleInputChange}
              value={config.radarOpacity}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 1 } }}
              className={classes.root}
        />
        
        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Radar Mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.radarMode}
          name="radarMode"
          onChange={handleInputChange}
          label="Radar Mode"
        >
          <MenuItem value="lines">Lines</MenuItem>
          <MenuItem value="markers">Markers</MenuItem>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="lines+markers">Lines+Markers</MenuItem>
          <MenuItem value="lines+markers+text">Lines+Markers+Text</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Line Fill</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.radarFill}
          name="radarFill"
          onChange={handleInputChange}
          label="Line Fill"
        >
          <MenuItem value="toself">Self</MenuItem>
          <MenuItem value="tonext">Next</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>
      </FormControl>

        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Marker Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.markerType}
          name="markerType"
          onChange={handleInputChange}
          label="Marker Type"
        >
          <MenuItem value="circle">Circle</MenuItem>
          <MenuItem value="square">Square</MenuItem>
          <MenuItem value="diamond">Diamond</MenuItem>
          <MenuItem value="star">Star</MenuItem>
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
        InputProps={{ inputProps: { min: 6, max: 15 } }}
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
        <InputLabel>Line type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.radarDash}
          name="radarDash"
          onChange={handleInputChange}
          label="Line Type"
        >
          <MenuItem value="solid">Solid</MenuItem>
          <MenuItem value="dot">Dot</MenuItem>
          <MenuItem value="dash">Dash</MenuItem>
          <MenuItem value="longdash">Long-Dash</MenuItem>
          <MenuItem value="dashdot">Dash-Dot</MenuItem>
          <MenuItem value="longdashdot">Long-Dash-Dot</MenuItem>
        </Select>
      </FormControl>

        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Line Shape</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.radarShape}
          name="radarShape"
          onChange={handleInputChange}
          label="Line Shape"
        >
          <MenuItem value="linear">Linear</MenuItem>
          <MenuItem value="spline">Spline</MenuItem>
        </Select>
      </FormControl>

       <FormControlLabel
         control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
         label="Show Legend"
       />  
       </div>
       <div className="col-md-7">
       <div className="Graph">
       <RadarChart {...config} />
       </div>
       </div>
        </div>
        </div>
        </>
    );

}

RadarChartForm.propTypes = {
    config: PropTypes.shape({
      radarOpacity: PropTypes.number, 
      radarMode: PropTypes.string, 
      textTemplate : PropTypes.string, 
      hoverTemplate :PropTypes.string, 
      markerSize: PropTypes.number, 
      markerType: PropTypes.string, 
      radarDash: PropTypes.string,
      radarShape: PropTypes.string, 
      radarFill: PropTypes.string, 
      showLegend: PropTypes.bool,
    }),
  };

RadarChartForm.defaultProps = { config: {} };

export default RadarChartForm;