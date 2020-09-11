import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import HeatMap from '../components/HeatMap';
import { makeStyles } from '@material-ui/core/styles';
import {HeatDummydata as hdd} from '../compDummyData';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const HeatMapForm = () => {

  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  const [config, setConfig] = useState({
    dataset: hdd, traceName: 'Trace 0', showLegend: true, contOpacity: 0.9, hoverTemplate :'',
    contColor: 'Hot', contScale: false, 
  });

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">Heat Map </h2>
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
              type="number"
              label="Contour Opacity"
              name="contOpacity"
              variant="outlined"
              onChange={handleInputChange}
              value={config.contOpacity}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 1 } }}
              className={classes.root}
            />
            <TextField
              fullWidth
              type="number"
              label="Line Width"
              name="contWidth"
              variant="outlined"
              onChange={handleInputChange}
              value={config.contWidth}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 5} }}
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
              <InputLabel>Map Color</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.contColor}
                name="contColor"
                onChange={handleInputChange}
                label="Contour Color"
              >
                <MenuItem value="Hot">Hot</MenuItem>
                <MenuItem value="Jet">Jet</MenuItem>
                <MenuItem value="Cividis">Cividis</MenuItem>
                <MenuItem value="Picnic">Picnic</MenuItem>
                <MenuItem value="Earth">Earth</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Show Scale</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.contScale}
                name="contScale"
                onChange={handleInputChange}
                label="Display Scale"
              >
                <MenuItem value={true}>Enable</MenuItem>
                <MenuItem value={false}>Disable</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
              label="Show Legend"
            />  
          </div> 
          <div className="col-md-7">
            <div className="Graph">
              <HeatMap  {...config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HeatMapForm.propTypes = {
  config: PropTypes.shape({
    traceName: PropTypes.string, 
    showLegend: PropTypes.bool, 
    contOpacity: PropTypes.number, 
    hoverTemplate : PropTypes.string,
    contColor: PropTypes.string, 
    contScale: PropTypes.bool, 
  }),
  // handleInputChange: PropTypes.func.isRequired,
  // classes: PropTypes.shape({ formControl: PropTypes.string }).isRequired,
};

HeatMapForm.defaultProps = { config: {} };

export default HeatMapForm;

