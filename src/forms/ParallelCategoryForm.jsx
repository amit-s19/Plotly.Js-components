import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ParallelCategory from '../components/ParallelCategory';
import { makeStyles } from '@material-ui/core/styles';
import { ParallelDummydata as pdd} from '../compDummyData';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const ParallelCategoryForm = () => {

const handleInputChange = e => {  
  const {name, value} = e.target ;
  setConfig({...config, [name]: value})
};

const [config, setConfig] = useState({
    dataset: pdd, categoryOrder: 'trace', hoverInfo: 'count', colorArray: 'orange', lineShape: 'linear',
    chartArrangement: 'perpendicular', sortPath: 'forward',
});

const classes = useStyles();

  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Parallel Category Chart </h2>

            <TextField
            fullWidth
            label="Color of Chart"
            name="colorArray"
            variant="outlined"
            onChange={handleInputChange}
            value={config.colorArray}
            size="small"
            className={classes.root}
          />

          <FormControl className={classes.root} fullWidth variant="outlined" size="small">
          <InputLabel>Category Order</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={config.categoryOrder}
            name="categoryOrder"
            onChange={handleInputChange}
            label="Category Order"
          >
            <MenuItem value="trace">Trace</MenuItem>
            <MenuItem value="category ascending">Category Ascending</MenuItem>
            <MenuItem value="category descending">Category Descending</MenuItem>
            <MenuItem value="array">Array</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Hover Info</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.hoverInfo}
          name="hoverInfo"
          onChange={handleInputChange}
          label="Hover Info"
        >
          <MenuItem value='count'>Count</MenuItem>
          <MenuItem value='probability'>Probability</MenuItem>
          <MenuItem value='count+probability'>Count+Probability</MenuItem>
          <MenuItem value='all'>All</MenuItem>
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
          <MenuItem value='linear'>Linear</MenuItem>
          <MenuItem value='hspline'>Spline</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Chart Arrangement</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.chartArrangement}
          name="chartArrangement"
          onChange={handleInputChange}
          label="Chart Arrangement"
        >
          <MenuItem value='perpendicular'>Perpendicular</MenuItem>
          <MenuItem value='freeform'>Freeform</MenuItem>
          <MenuItem value='fixed'>Fixed</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Sort Paths</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.sortPath}
          name="sortPath"
          onChange={handleInputChange}
          label="Sort Paths"
        >
          <MenuItem value='forward'>Left to right</MenuItem>
          <MenuItem value='backward'>Right to left</MenuItem>
        </Select>
      </FormControl>
      
        </div>
      <div className="col-md-7">
      <div className="Graph">
      <ParallelCategory  {...config} />
      </div>
      </div>
      </div> 
    </div>
    
  
    
    </>
    
  );
};



ParallelCategoryForm.propTypes = {
  config: PropTypes.shape({
    categoryOrder: PropTypes.string, 
    hoverInfo: PropTypes.string, 
    colorArray: PropTypes.string, 
    lineShape: PropTypes.string,
    chartArrangement: PropTypes.string, 
    sortPath: PropTypes.string,
  }),
};

ParallelCategoryForm.defaultProps = { config: {} };

export default ParallelCategoryForm;

