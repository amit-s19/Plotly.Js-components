import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import OhlcChart from '../components/OhlcChart';
import { makeStyles } from '@material-ui/core/styles';
import { candleDummydata as cdd} from '../compDummyData';
import './Styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const OhlcChartForm = () => {

  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  const [config, setConfig] = useState({
    dataset: cdd, colorArray:'black,orange', xAxisLabel:'', yAxisLabel:'', xAxisTickAngle: 0, 
    yAxisTickAngle: 0, calType: 'gregorian', showLegend: true, calName: 'Trace 0',
  });

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">OHLC Chart </h2>
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
              label="Trace Name"
              name="calName"
              variant="outlined"
              onChange={handleInputChange}
              value={config.calName}
              size="small"
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
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Calendar Format</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.calType}
                name="calType"
                onChange={handleInputChange}
                label="Calendar format"
              >
                <MenuItem value="gregorian">Gregorian</MenuItem>
                <MenuItem value="chinese">Chinese</MenuItem>
                <MenuItem value="hebrew">Hebrew</MenuItem>
                <MenuItem value="mayan">Mayan</MenuItem>
                <MenuItem value="islamic">Islamic</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
              label="Show Legend"
            />  
          </div>
          <div className="col-md-7">
            <div className="Graph">
              <OhlcChart  {...config} />
            </div>
          </div>
        </div> 
      </div>
    </>
  );
};

OhlcChartForm.propTypes = {
  config: PropTypes.shape({
    colorArray: PropTypes.string, 
    xAxisLabel: PropTypes.string, 
    yAxisLabel: PropTypes.string, 
    xAxisTickAngle: PropTypes.number, 
    yAxisTickAngle: PropTypes.number, 
    calType: PropTypes.string, 
    showLegend: PropTypes.number, 
    calName: PropTypes.string,
  }),
  // handleInputChange: PropTypes.func.isRequired,
  // classes: PropTypes.shape({ formControl: PropTypes.string }).isRequired,
};

OhlcChartForm.defaultProps = { config: {} };

export default OhlcChartForm;

