import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import TableChart from '../components/TableChart';
import { makeStyles } from '@material-ui/core/styles';
import {barDummydata as bgd} from '../compDummyData';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const TableChartForm = () => {

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const [config, setConfig] = useState({
    dataset: bgd, colorArray:'grey,lightgrey,white', tableAlign: 'center', showLegend: true, 
});

const classes = useStyles();

  return (
    <>
   <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Table Chart </h2>
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
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Alignment</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.tableAlign}
          name="tableAlign"
          onChange={handleInputChange}
          label="Text Alignment"
        >
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="right">Right</MenuItem>
        </Select>
      </FormControl>
      
      <FormControlLabel
        control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
        label="Show Legend"
      />  
      </form>
      </div> 
      <div className="col-md-7">

    <div className="Graph">
    <TableChart  {...config} />
  </div>   
      </div>
      </div>
    </div>
    
    </>
    
  );
};



TableChartForm.propTypes = {
  config: PropTypes.shape({
    tableAlign: PropTypes.string,
    showLegend: PropTypes.bool,
    colorArray: PropTypes.string,
  }),
};

TableChartForm.defaultProps = { config: {} };

export default TableChartForm;



