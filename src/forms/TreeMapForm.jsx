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
import {treeDummydata as tdd} from '../compDummyData';
import TreeMap from '../components/TreeMap';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const TreeMapForm = () => {

    const handleInputChange = e => {  
        const {name, value} = e.target ;
        setConfig({...config, [name]: value})
    };

    const [config, setConfig] = useState({
        dataset: tdd, textTemplate: '', hoverTemplate: '', hoverInfo: 'label+value+name', traceName: 'Trace 0',
        colorArray: '', depthFade: false, treePacking: 'squarify', showLegend: true,
    });

    const classes = useStyles();

    return (
        <>
        <div className="container-fluid">
      <div className="row">
        <div className='col-md-1'></div>
        <div className="col-md-4">
        <h2 className="display-4">Tree Map </h2>

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
        label="List of colors"
        name="colorArray"
        variant="outlined"
        onChange={handleInputChange}
        value={config.colorArray}
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
        <InputLabel>Tiling Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.treePacking}
          name="treePacking"
          onChange={handleInputChange}
          label="Tiling Type"
        >
          <MenuItem value="squarify">Squarify</MenuItem>
          <MenuItem value="binary">Binary</MenuItem>
          <MenuItem value="dice">Dice</MenuItem>
          <MenuItem value="slice">Slice</MenuItem>
          <MenuItem value="dice-slice">Dice-Slice</MenuItem>
          <MenuItem value="slice-dice">Slice-Dice</MenuItem>
        </Select>
    </FormControl>

    <FormControl className={classes.root} fullWidth variant="outlined" size="small">
        <InputLabel>Depth Fade</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={config.depthFade}
          name="depthFade"
          onChange={handleInputChange}
          label="Depth Fade"
        >
          <MenuItem value={true}>Enable</MenuItem>
          <MenuItem value={false}>Disable</MenuItem>
          <MenuItem value="reversed">Reversed</MenuItem>
        </Select>
    </FormControl>


       <FormControlLabel
         control={<Checkbox checked={config.showLegend} onChange={handleInputChange} name="showLegend" />}
         label="Show Legend"
       />  
       </div>
       <div className="col-md-7">
       <div className="Graph">
       <TreeMap {...config} />
       </div>
       </div>
        </div>
        </div>
        </>
    );

}

TreeMapForm.propTypes = {
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
  };

TreeMapForm.defaultProps = { config: {} };

export default TreeMapForm;