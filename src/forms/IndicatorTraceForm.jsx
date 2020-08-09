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
import {indicatorTracedata as itd} from '../compDummyData';
import './Styles.css';
import IndicatorTrace from '../components/IndicatorTrace';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      //width: '50ch',
    },
  },
}));


const IndicatorTraceForm = () => {

    const handleInputChange = e => {  
        const {name, value} = e.target ;
        setConfig({...config, [name]: value})
    };

    const [config, setConfig] = useState({
        dataset: itd, colorArray: 'green,lightgray,gray,gold', traceMode: 'number+delta+gauge', traceType: 'bullet',
        showLegend: 'true',
    });

    const classes = useStyles();

    return (
        <>
        <div className="IndicatorTraceForm">
            <div className="Form">
              <h1>Indicator Traces</h1>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
            <InputLabel>Mode</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={config.traceMode}
              name="traceMode"
              onChange={handleInputChange}
              label="Trace Mode"
            >
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="delta">Delta</MenuItem>
              <MenuItem value="number+delta">Number+Delta</MenuItem>
              <MenuItem value="number+delta+gauge">Number+Delta+Gauge</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
            <InputLabel>Trace Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={config.traceType}
              name="traceType"
              onChange={handleInputChange}
              label="Trace Type"
            >
              <MenuItem value="angular">Angular</MenuItem>
              <MenuItem value="bullet">Bullet</MenuItem>
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
            
            <FormControlLabel
              control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
              label="Show Legend"
            />  

            </div>
            <div className="Graph">
            <IndicatorTrace {...config} />
            </div>
        </div>
        </>
    );

}

IndicatorTraceForm.propTypes = {
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

export default IndicatorTraceForm ;