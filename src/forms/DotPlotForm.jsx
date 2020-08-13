import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import DotPlot from '../components/DotPlot';
import { dotDummydata as ddd } from '../compDummyData';
import { makeStyles } from '@material-ui/core/styles';

import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      //width: '50ch',
    },
  },
}));


const DotPlotForm = () => {

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const [config, setConfig] = useState({
    dataset: ddd, colorArray: '', showLegend: 'true', dotTitle: '', dotSize: 18, 
    xAxisLabel:'', yAxisLabel:'', xAxisTickAngle: 45, yAxisTickAngle: 0,
});

const classes = useStyles();

  return (
    <>
    <div className="DotPlotForm">
      <div className="Form">
      <h1>Dot Plot </h1>
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
        label="Title"
        name="dotTitle"
        variant="outlined"
        onChange={handleInputChange}
        value={config.dotTitle}
        size="small"
        className={classes.root}
      />

    <TextField
        fullWidth
        type="number"
        label="Dot Size"
        name="dotSize"
        variant="outlined"
        onChange={handleInputChange}
        value={config.dotSize}
        size="small"
        InputProps={{ inputProps: { min: 10, max: 30 } }}
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

     
      <FormControlLabel
        control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
        label="Show Legend"
      />  
      </form>
      </div> 
    <div className="Graph">
    <DotPlot  {...config} />
     
      </div>
    </div>
    
    </>
    
  );
};



DotPlotForm.propTypes = {
  config: PropTypes.shape({
    colorArray: PropTypes.string,  
    dotTitle:  PropTypes.string,
    dotSize: PropTypes.number,  
    xAxisLabel: PropTypes.string, 
    yAxisLabel: PropTypes.string, 
    xAxisTickAngle: PropTypes.number,  
    yAxisTickAngle: PropTypes.number, 
    showLegend: PropTypes.bool,  
    
  }),
};

DotPlotForm.defaultProps = { config: {} };

export default DotPlotForm;



