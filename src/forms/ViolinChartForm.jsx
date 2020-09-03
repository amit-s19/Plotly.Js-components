import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ViolinChart from '../components/ViolinChart';
import { makeStyles } from '@material-ui/core/styles';
import {violinDummydata as vdd} from '../compDummyData';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const ViolinChartForm = () => {

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const [config, setConfig] = useState({
    dataset: vdd, colorArray: '#800055,#cc0088,#ff00aa,#ff33bb,#ff66cc,#ff99dd,#ffccee,#4d0033,#000000', violinOpacity: 1, violinWidth: 0, hoverText: '', hoverInfo: 'all',
    hoverTemplate: '%{x}<br>%{y}', violinOrientation: 'v', markerSymbol: 'circle', markerSize: 8, Bandwidth: null,
    hoverOn: 'violins+points+kde', violinJitter: 0, showLegend: true,
});

const classes = useStyles();

  return (
    <>
   <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Violin Chart </h2>

        <TextField
        fullWidth
        label="Chart Color"
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
        name="violinOpacity"
        variant="outlined"
        onChange={handleInputChange}
        value={config.violinOpacity}
        size="small"
        InputProps={{ inputProps: { min: 0, max: 1 } }}
        className={classes.root}
      />

        <TextField
        fullWidth
        type="number"
        label="Violin Width"
        name="violinWidth"
        variant="outlined"
        onChange={handleInputChange}
        value={config.violinWidth}
        size="small"
        InputProps={{ inputProps: { min: 0, max: 10 } }}
        className={classes.root}
      />

        <TextField
        fullWidth
        type="number"
        label="Violin jitter"
        name="violinJitter"
        variant="outlined"
        onChange={handleInputChange}
        value={config.violinJitter}
        size="small"
        InputProps={{ inputProps: { min: 0, max: 1 } }}
        className={classes.root}
      />

    <TextField
        fullWidth
        type="number"
        label="Bandwidth value"
        name="Bandwidth"
        variant="outlined"
        onChange={handleInputChange}
        value={config.Bandwidth}
        size="small"
        InputProps={{ inputProps: { min: 0, } }}
        className={classes.root}
      />
        <TextField
        fullWidth
        label="Hover Text"
        name="hoverText"
        variant="outlined"
        onChange={handleInputChange}
        value={config.hoverText}
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

    <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Hover Info</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.hoverInfo}
          name="hoverInfo"
          onChange={handleInputChange}
          label="Hover Info"
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="x">x</MenuItem>
          <MenuItem value="y">y</MenuItem>
          <MenuItem value="x+y">x+y</MenuItem>
          <MenuItem value="x+y+z">x+y+z</MenuItem>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>
      </FormControl>

    <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Violin orientation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.violinOrientation}
          name="violinOrientation"
          onChange={handleInputChange}
          label="Violin orientation"
        >
          <MenuItem value="v">Vertical</MenuItem>
          <MenuItem value="h">Horizontal</MenuItem>
        </Select>
      </FormControl>

    <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Outlier Symbol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.markerSymbol}
          name="markerSymbol"
          onChange={handleInputChange}
          label="Outlier Symbol"
        >
          <MenuItem value="circle">Circle</MenuItem>
          <MenuItem value="square">Square</MenuItem>
          <MenuItem value="diamond">Diamond</MenuItem>
          <MenuItem value="hexagon">Hexagon</MenuItem>
          <MenuItem value="triangle-up">Triangle</MenuItem>
          <MenuItem value="pentagon">Pentagon</MenuItem>
          <MenuItem value="star">Star</MenuItem>
          <MenuItem value="asterisk">Asterisk</MenuItem>
        </Select>
      </FormControl>


    <TextField
        fullWidth
        type="number"
        label="Outlier Size"
        name="markerSize"
        variant="outlined"
        onChange={handleInputChange}
        value={config.markerSize}
        size="small"
        InputProps={{ inputProps: { min: 5, max: 20 } }}
        className={classes.root}
      />

    <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Hover Effect</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.hoverOn}
          name="hoverOn"
          onChange={handleInputChange}
          label="Hover Effect"
        >
          <MenuItem value="violins">Violins</MenuItem>
          <MenuItem value="points">Points</MenuItem>
          <MenuItem value="kde">KDE</MenuItem>
          <MenuItem value="violins+points">Violins+Points</MenuItem>
          <MenuItem value="violins+points+kde">Violins+Points+KDE</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
        label="Show Legend"
      />

      </div> 
    <div className="col-md-7">
    
    <div className="Graph">
    <ViolinChart  {...config} />
  </div>   
      </div>
      </div>
    </div>
    
    </>
    
  );
};



ViolinChartForm.propTypes = {
  config: PropTypes.shape({
    tableAlign: PropTypes.string,
    showLegend: PropTypes.bool,
    colorArray: PropTypes.string,
  }),
};

ViolinChartForm.defaultProps = { config: {} };

export default ViolinChartForm;



