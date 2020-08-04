import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import BoxPlot from '../components/BoxPlot';
import {tableDummydata as bpd} from '../compDummyData';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      //width: '50ch',
    },
  },
}));

const BoxPlotForm = () => {

  const handleInputChange = e => {
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  const [config, setConfig] = useState({
    dataset: bpd, xAxisLabel: '', yAxisLabel: '', xAxisTickAngle: 45, yAxisTickAngle: 0, boxMean: false,
    colorArray: 'cornflowerblue,orange,pink,yellow,seagreen', showLegend: true, boxMode: '',
    orientation: 'h', boxWidth: null, lineWidth: 2, quartileMethod: 'linear', opacity: 0.8,
    boxPoints: ''
  });

  const classes = useStyles();    
  

  return (
    <>
    <div>
    <div classname="Form">
    <h1>Box Plot</h1>
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
        <InputLabel>Box Mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.boxMode}
          name="boxMode"
          onChange={handleInputChange}
          label="Box Mode"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="group">Group</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Box Mean</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.boxMean}
          name="boxMean"
          onChange={handleInputChange}
          label="Box Mean"
        >
          <MenuItem value="">False</MenuItem>
          <MenuItem value="true">Only Mean</MenuItem>
          <MenuItem value="sd">Standard Deviation</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Box Points</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.boxPoints}
          name="boxPoints"
          onChange={handleInputChange}
          label="Box Points"
        >
          <MenuItem value="">False</MenuItem>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Outliers">Outliers</MenuItem>
          <MenuItem value="suspectedoutliers">Suspected Outliers</MenuItem>
        </Select>
      </FormControl>
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
        <InputLabel>Quartile Method</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.quartileMethod}
          name="quartileMethod"
          onChange={handleInputChange}
          label="Quartile Method"
        >
          <MenuItem value="linear">Linear</MenuItem>
          <MenuItem value="exclusive">Exclusive</MenuItem>
          <MenuItem value="inclusive">Inclusive</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        type="number"
        label="Line Width"
        name="lineWidth"
        variant="outlined"
        onChange={handleInputChange}
        value={config.lineWidth}
        size="small"
        InputProps={{ inputProps: { min: 0 } }}
        className={classes.root}
      />
      <TextField
        fullWidth
        type="number"
        label="Box Width"
        name="boxWidth"
        variant="outlined"
        onChange={handleInputChange}
        value={config.boxWidth}
        size="small"
        InputProps={{ inputProps: { min: 0, max: 1 } }}
        className={classes.root}
      />
      <TextField
        fullWidth
        type="number"
        label="Opacity"
        name="opacity"
        variant="outlined"
        onChange={handleInputChange}
        value={config.opacity}
        size="small"
        InputProps={{ inputProps: { min: 0, max: 1 } }}
        className={classes.root}
      />
      <FormControlLabel
        control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
        label="Show Legend"
      />
      </div>

      <div className="Graph">
          <BoxPlot {...config} />
      </div>
    </div>
    </>
  );
};

BoxPlotForm.propTypes = {
  config: PropTypes.shape({
    xAxisLabel: PropTypes.string,
    yAxisLabel: PropTypes.string,
    xAxisTickAngle: PropTypes.number,
    yAxisTickAngle: PropTypes.number,
    colorArray: PropTypes.string,
    showLegend: PropTypes.bool,
    orientation: PropTypes.string,
    quartileMethod: PropTypes.string,
    lineWidth: PropTypes.number,
    boxWidth: PropTypes.number,
    opacity: PropTypes.number,
    boxMode: PropTypes.string,
    boxMean: PropTypes.string,
    boxPoints: PropTypes.string,
  }),
 // handleInputChange: PropTypes.func.isRequired,
 // classes: PropTypes.shape({ formControl: PropTypes.string }).isRequired,
};

BoxPlotForm.defaultProps = { config: {} };

export default BoxPlotForm;
