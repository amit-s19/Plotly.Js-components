import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {treeDummydata as tdd} from '../compDummyData';
import SunburstChart from '../components/SunburstChart';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const SunburstChartForm = () => {

  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };
  const [config, setConfig] = useState({
    dataset: tdd, textTemplate: '', hoverTemplate: '', hoverInfo: 'label+value+name', traceName: 'Trace 0',
    colorArray: '', setValue: 'disabled', textOrientation: 'auto', leafOpacity: 0.7,
  });
  const classes = useStyles();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">Sunburst Chart</h2>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Include Values</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.setValue}
                name="setValue"
                onChange={handleInputChange}
                label="Enable Values"
              >
              <MenuItem value="enabled">Enabled</MenuItem>
              <MenuItem value="disabled">Disabled</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Trace Name"
              name="traceName"
              variant="outlined"
              onChange={handleInputChange}
              value={config.traceName}
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
              type="number"
              label="List of colors"
              name="colorArray"
              variant="outlined"
              onChange={handleInputChange}
              value={config.colorArray}
              InputProps={{ inputProps: { min: 0, max: 1 } }}
              size="small"
              className={classes.root}
            />
            <TextField
              fullWidth
              label="Leaf Opacity"
              name="leafOpacity"
              variant="outlined"
              onChange={handleInputChange}
              value={config.leafOpacity}
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
                <MenuItem value="label">Label</MenuItem>
                <MenuItem value="value">Value</MenuItem>
                <MenuItem value="label+value">Label+Value</MenuItem>
                <MenuItem value="label+name">Label+Name</MenuItem>
                <MenuItem value="label+value+name">Label+Value+Name</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Inside text orientation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.textOrientation}
                name="textOrientation"
                onChange={handleInputChange}
                label="Inside text orientation"
              >
                <MenuItem value="horizontal">Horizontal</MenuItem>
                <MenuItem value="radial">Radial</MenuItem>
                <MenuItem value="tangential">Tangential</MenuItem>
                <MenuItem value="auto">Auto</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-7">
            <SunburstChart {...config} />
          </div>
        </div>
      </div>
    </>
  );
}

SunburstChartForm.propTypes = {
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
  // handleInputChange: PropTypes.func.isRequired,
  // classes: PropTypes.shape({ formControl: PropTypes.string }).isRequired,
};

SunburstChartForm.defaultProps = { config: {} };

export default SunburstChartForm;
