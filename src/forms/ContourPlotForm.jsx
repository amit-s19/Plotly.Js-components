import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ContourPlot from '../components/ContourPlot';
import { makeStyles } from '@material-ui/core/styles';
import {ContourDummydata as cdd} from '../compDummyData';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const ContourPlotForm = () => {

  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  const [config, setConfig] = useState({
    dataset: cdd, traceName: '', showLegend: true, contOpacity: 0.9, hoverTemplate :'', contSmoothing: 0.7,
    contDash: 'solid', contWidth: 0.8, contColor: 'Jet', contScale: true, contType: 'fill', showLabels: false,
  });

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">Contour Plot </h2>
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
            <TextField
              fullWidth
              type="number"
              label="Contour Smoothing"
              name="contSmoothing"
              variant="outlined"
              onChange={handleInputChange}
              value={config.contSmoothing}
              size="small"
              InputProps={{ inputProps: { min: 0, max: 1.3 } }}
              className={classes.root}
            />
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Line type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.contDash}
                name="contDash"
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
              <InputLabel>Contour Color</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.contColor}
                name="contColor"
                onChange={handleInputChange}
                label="Contour Color"
              >
                <MenuItem value="Jet">Jet</MenuItem>
                <MenuItem value="Hot">Hot</MenuItem>
                <MenuItem value="Cividis">Cividis</MenuItem>
                <MenuItem value="Picnic">Picnic</MenuItem>
                <MenuItem value="Earth">Earth</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Display Scale</InputLabel>
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
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Contour Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.contType}
                name="contType"
                onChange={handleInputChange}
                label="Contour Type"
              >
                <MenuItem value="fill">Fill</MenuItem>
                <MenuItem value="heatmap">Heatmap</MenuItem>
                <MenuItem value="lines">Lines</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Show Labels</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.showLabels}
                name="showLabels"
                onChange={handleInputChange}
                label="Show Labels"
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
              <ContourPlot  {...config} />
            </div>
          </div>
        </div>
      </div> 
    </>
  );
};

ContourPlotForm.propTypes = {
  config: PropTypes.shape({
    traceName: PropTypes.string, 
    contOpacity: PropTypes.number, 
    hoverTemplate : PropTypes.string, 
    contSmoothing: PropTypes.number,
    contDash: PropTypes.string, 
    contWidth: PropTypes.number, 
    contColor: PropTypes.string, 
    contScale: PropTypes.bool, 
    contType: PropTypes.string, 
    showLabels: PropTypes.bool,
    showLegend: PropTypes.bool
  }),
  // handleInputChange: PropTypes.func.isRequired,
  // classes: PropTypes.shape({ formControl: PropTypes.string }).isRequired,
};

ContourPlotForm.defaultProps = { config: {} };

export default ContourPlotForm;

