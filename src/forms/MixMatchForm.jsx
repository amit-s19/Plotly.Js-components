import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import MixMatch from '../components/MixMatch';
import { makeStyles } from '@material-ui/core/styles';
import { barDummydata as bgd } from '../compDummyData';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const MixMatchForm = () => {

  const [config, setConfig] = useState({
    dataset: bgd, chartArray: '', xAxisLabel:'', yAxisLabel:'', 
    xAxisTickAngle: 45, yAxisTickAngle: 0, textTemplate : '%{x}<br>%{y}', hoverTemplate :'%{x}<br>%{y}',
    barWidth : null, barOpacity : 0.8, barMode: 'group', barGap: 0.2, barColors: '',
    lineColors:'', lineWidth: 2, lineMarkerOpacity: 0.8, lineStyle: 'solid', lineShape: 'linear', 
    lineMarkerSize: 6, lineMode: 'lines+markers', areaMode: 'scatter', areaFill: 'tozeroy', areaColors: '',
    areaMarkerSize: 8, areaMarkerOpacity: 0.6, areaLineWidth: 2, areaLineShape: 'linear', areaLineStyle: 'solid',
    scatterColors: '', scatterMarkerSize: 14, scatterMarkerSymbol: 'circle', scatterMarkerOpacity: 1,
  });

  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  let bar = config.chartArray.includes('bar')
  let line = config.chartArray.includes('line')
  let area = config.chartArray.includes('area')
  let scatter = config.chartArray.includes('scatter')


  const renderTemplates = () => {
  if(bar || line || area || scatter) {
    return (
      <form>
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
      </form>
    );
  }
  }

  const renderBarForm = () => {
  if(bar) {  
    return (
      <form>
        <hr className='divider'/>
        <h3>Bar Properties</h3>
        <TextField
          fullWidth
          label="List of colors"
          name="barColors"
          variant="outlined"
          onChange={handleInputChange}
          value={config.barColors}
          size="small"
          className={classes.root}
        />
        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
          <InputLabel>Bar Mode</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={config.barMode}
            name="barMode"
            onChange={handleInputChange}
            label="Bar Mode"
          >
            <MenuItem value="group">Group</MenuItem>
            <MenuItem value="stack">Stack</MenuItem>
            <MenuItem value="relative">Relative</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label="Bar Width"
          name="barWidth"
          variant="outlined"
          onChange={handleInputChange}
          value={config.barWidth}
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
          className={classes.root}
        />
        <TextField
          fullWidth
          type="number"
          label="Bar Gap"
          name="barGap"
          variant="outlined"
          onChange={handleInputChange}
          value={config.barGap}
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
          className={classes.root}
        />
        <TextField
          fullWidth
          type="number"
          label="Bar Opacity"
          name="barOpacity"
          variant="outlined"
          onChange={handleInputChange}
          value={config.barOpacity}
          size="small"
          InputProps={{ inputProps: { min: 0, max: 1 } }}
          className={classes.root}
        />
      </form>
    );
  }
  }

  const renderLineForm = () => {
  if(line) {
    return (
      <form>
        <hr className="divider"></hr>
        <h3>Line Properties</h3>
        <TextField
          fullWidth
          label="Line Colors"
          name="lineColors"
          variant="outlined"
          onChange={handleInputChange}
          value={config.colorArray}
          size="small"
          className={classes.root}
        />
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
        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
          <InputLabel>Mode</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={config.lineMode}
            name="lineMode"
            onChange={handleInputChange}
            label="Mode"
          >
            <MenuItem value="lines+markers">Lines + Markers</MenuItem>
            <MenuItem value="lines">Lines</MenuItem>
            <MenuItem value="none">None</MenuItem>
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
            <MenuItem value="linear">Linear</MenuItem>
            <MenuItem value="spline">Spline</MenuItem>
            <MenuItem value="hv">hv</MenuItem>
            <MenuItem value="vh">vh</MenuItem>
            <MenuItem value="hvh">hvh</MenuItem>
            <MenuItem value="vhv">vhv</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
          <InputLabel>Line Style</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={config.lineStyle}
            name="lineStyle"
            onChange={handleInputChange}
            label="Line Style"
          >
            <MenuItem value="solid">Solid</MenuItem>
            <MenuItem value="dot">Dot</MenuItem>
            <MenuItem value="dash">Dash</MenuItem>
            <MenuItem value="longdash">Long Dash</MenuItem>
            <MenuItem value="dashdot">Dash Dot</MenuItem>
            <MenuItem value="longdashdot">Long Dash Dot</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label="Marker Size"
          name="lineMarkerSize"
          variant="outlined"
          onChange={handleInputChange}
          value={config.lineMarkerSize}
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
          className={classes.root}
        />
        <TextField
          fullWidth
          type="number"
          label="Marker Opacity"
          name="lineMarkerOpacity"
          variant="outlined"
          onChange={handleInputChange}
          value={config.markerOpacity}
          size="small"
          InputProps={{ inputProps: { min: 0, max: 1 } }}
          className={classes.root}
        />
      </form>
    );
  }
  }

  const renderAreaForm = () => {
  if(area) {
    return (
      <form>
        <hr className="divider"></hr>
        <h3>Area Properties</h3>
        <TextField
          fullWidth
          label="Area chart colors"
          name="areaColors"
          variant="outlined"
          onChange={handleInputChange}
          value={config.areaColors}
          size="small"
          className={classes.root}
        />
        <TextField
          fullWidth
          type="number"
          label="Area Line Width"
          name="areaLineWidth"
          variant="outlined"
          onChange={handleInputChange}
          value={config.areaLineWidth}
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
          className={classes.root}
        />
        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
          <InputLabel>Area line shape</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={config.areaLineShape}
            name="areaLineShape"
            onChange={handleInputChange}
            label="Area line shape"
          >
            <MenuItem value="linear">Linear</MenuItem>
            <MenuItem value="spline">Spline</MenuItem>
            <MenuItem value="hv">hv</MenuItem>
            <MenuItem value="vh">vh</MenuItem>
            <MenuItem value="hvh">hvh</MenuItem>
            <MenuItem value="vhv">vhv</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
          <InputLabel>Area line style</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={config.areaLineStyle}
            name="areaLineStyle"
            onChange={handleInputChange}
            label="Line Style"
          >
            <MenuItem value="solid">Solid</MenuItem>
            <MenuItem value="dot">Dot</MenuItem>
            <MenuItem value="dash">Dash</MenuItem>
            <MenuItem value="longdash">Long Dash</MenuItem>
            <MenuItem value="dashdot">Dash Dot</MenuItem>
            <MenuItem value="longdashdot">Long Dash Dot</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label="Area Marker Size"
          name="areaMarkerSize"
          variant="outlined"
          onChange={handleInputChange}
          value={config.areaMarkerSize}
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
          className={classes.root}
        />
        <TextField
          fullWidth
          type="number"
          label="Area Marker Opacity"
          name="areaMarkerOpacity"
          variant="outlined"
          onChange={handleInputChange}
          value={config.areaMarkerOpacity}
          size="small"
          InputProps={{ inputProps: { min: 0, max: 1 } }}
          className={classes.root}
        />
        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
          <InputLabel>Area Fill</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={config.areaFill}
            name="areaFill"
            onChange={handleInputChange}
            label="Area Fill"
          >
            <MenuItem value="toself">Toself</MenuItem>
            <MenuItem value="tonexty">Tonexty</MenuItem>
            <MenuItem value="tozeroy">Tozeroy</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
          <InputLabel>Area Mode</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={config.areaMode}
            name="areaMode"
            onChange={handleInputChange}
            label="Area Mode"
          >
            <MenuItem value="scatter">Scatter</MenuItem>
            <MenuItem value="lines">Lines</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
  }

  const renderScatterForm = () => {
  if(scatter) {
    return (
      <form>
        <hr className="divider"></hr>
        <h3>Scatter properties</h3>
          <TextField
          fullWidth
          label="Scatter colors"
          name="scatterColors"
          variant="outlined"
          onChange={handleInputChange}
          value={config.scatterColors}
          size="small"
          className={classes.root}
        /> 
        <TextField
          fullWidth
          type="number"
          label="Scatter Marker Size"
          name="scatterMarkerSize"
          variant="outlined"
          onChange={handleInputChange}
          value={config.scatterMarkerSize}
          size="small"
          InputProps={{inputProps : {min:10, max: 30 }}}
          className={classes.root}
        />
        <FormControl className={classes.root} fullWidth variant="outlined" size="small">
          <InputLabel>Scatter Marker Symbol</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={config.scatterMarkerSymbol}
            name="scatterMarkerSymbol"
            onChange={handleInputChange}
            label="Scatter Marker Symbol"
          >
            <MenuItem value="circle">Circle</MenuItem>
            <MenuItem value="square">Square</MenuItem>
            <MenuItem value="diamond">Diamond</MenuItem>
            <MenuItem value="hourglass">Hourglass</MenuItem>
            <MenuItem value="hexagon">Hexagon</MenuItem>
            <MenuItem value="triangle-up">Triangle</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label="Scatter Marker Opacity"
          name="scatterMarkerOpacity"
          variant="outlined"
          onChange={handleInputChange}
          value={config.scatterMarkerOpacity}
          size="small"
          InputProps={{inputProps : {min: 0, max: 1}}}
          className={classes.root}
        />
      </form> 
    );
  }
  }

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <h2 className="display-4">Mix n Match</h2>
            <hr className="divider"></hr>
            <TextField
              fullWidth
              label="List of charts"
              name="chartArray"
              variant="outlined"
              onChange={handleInputChange}
              value={config.chartArray}
              size="small"
              className={classes.root}
            />
            {renderTemplates()}
            {renderBarForm()}
            {renderLineForm()}
            {renderAreaForm()}
            {renderScatterForm()}
          </div> 
          <div className="col-md-7">
            <div className="Graph">
              <MixMatch  {...config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

MixMatchForm.propTypes = {
  config: PropTypes.shape({
  chartArray: PropTypes.string, 
  xAxisLabel: PropTypes.string, 
  yAxisLabel: PropTypes.string, 
  xAxisTickAngle: PropTypes.number, 
  yAxisTickAngle: PropTypes.number, 
  textTemplate : PropTypes.string, 
  hoverTemplate :PropTypes.string,
  barWidth : null, 
  barOpacity : PropTypes.number, 
  barMode: PropTypes.string, 
  barGap: PropTypes.number, 
  barColors: PropTypes.string,
  lineColors:PropTypes.string, 
  lineWidth: PropTypes.number, 
  lineMarkerOpacity: PropTypes.number, 
  lineStyle: PropTypes.string, 
  lineShape: PropTypes.string, 
  lineMarkerSize: PropTypes.number, 
  lineMode: PropTypes.string, 
  areaMode: PropTypes.string, 
  areaFill: PropTypes.string, 
  areaColors: PropTypes.string,
  areaMarkerSize: PropTypes.number, 
  areaMarkerOpacity: PropTypes.number, 
  areaLineWidth: PropTypes.number, 
  areaLineShape: PropTypes.string, 
  areaLineStyle: PropTypes.string,
  scatterColors: PropTypes.string, 
  scatterMarkerSize: PropTypes.number, 
  scatterMarkerSymbol: PropTypes.string, 
  scatterMarkerOpacity: PropTypes.number,
  }),
};

MixMatchForm.defaultProps = { config: {} };

export default MixMatchForm;

