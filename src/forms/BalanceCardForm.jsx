import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {balanceCarddata as bcd} from '../compDummyData';
import BalanceCard from '../components/BalanceCard';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const BalanceCardForm = () => {
  const handleInputChange = e => {  
    const {name, value} = e.target ;
    setConfig({...config, [name]: value})
  };

  const [config, setConfig] = useState({
    dataset: bcd, cardWidth: 314, cardHeight: 130, cardBackground: '#202A3B', cardFamily1: 'Arial',
    cardSize1: 22, cardWeight1: 'bold', cardColor1:'#eeeeee', cardAlign1:'left', cardFamily2: 'Arial', 
    cardSize2: 16, cardWeight2: 'bold', cardColor2: '#8091ab', cardAlign2: 'left', sizeicon: 3, cardHrHeight: 1,  
  });

  const classes = useStyles();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-md-1'></div>
          <div className="col-md-4">
            <TextField
              fullWidth
              type='number'
              label="Card Width"
              name="cardWidth"
              variant="outlined"
              onChange={handleInputChange}
              value={config.cardWidth}
              InputProps= {{inputProps: {min: 1, max: 1000}}}
              size="small"
              className={classes.root}
            />              
            <TextField
              fullWidth
              type='number'
              label="Card Height"
              name="cardHeight"
              variant="outlined"
              onChange={handleInputChange}
              value={config.cardHeight}
              InputProps= {{inputProps: {min: 1, max: 1000}}}
              size="small"
              className={classes.root}
            />
            <TextField
              fullWidth
              type='number'
              label="Icon size"
              name="sizeicon"
              variant="outlined"
              onChange={handleInputChange}
              value={config.sizeicon}
              InputProps= {{inputProps: {min: 1, max: 100}}}
              size="small"
              className={classes.root}
            />
            <TextField
              fullWidth
              type='number'
              label="Divider thickness"
              name="cardHrHeight"
              variant="outlined"
              onChange={handleInputChange}
              value={config.cardHrHeight}
              InputProps= {{inputProps: {min: 1, max: 100}}}
              size="small"
              className={classes.root}
            />
            <TextField
              fullWidth
              label="Card Background"
              name="cardBackground"
              variant="outlined"
              onChange={handleInputChange}
              value={config.cardBackground}
              size="small"
              className={classes.root}
            />
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Title text alignment</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.cardAlign1}
                name="cardAlign1"
                onChange={handleInputChange}
                label="Title text alignment"
              >
                <MenuItem value='left'>Left</MenuItem>
                <MenuItem value='right'>Right</MenuItem>
                <MenuItem value='center'>Center</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type='number'
              label="Title font size"
              name="cardSize1"
              variant="outlined"
              onChange={handleInputChange}
              value={config.cardSize1}
              InputProps= {{inputProps: {min: 1, max: 100}}}
              size="small"
              className={classes.root}
            />
            <TextField
              fullWidth
              label="Title font color"
              name="cardColor1"
              variant="outlined"
              onChange={handleInputChange}
              value={config.cardColor1}
              size="small"
              className={classes.root}
            />
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Title font weight</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.cardWeight1}
                name="cardWeight1"
                onChange={handleInputChange}
                label="Title font weight"
              >
                <MenuItem value='normal'>Normal</MenuItem>
                <MenuItem value='bold'>Bold</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Title font family</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.cardFamily1}
                name="cardFamily1"
                onChange={handleInputChange}
                label="Title font family"
              >
                <MenuItem value='Arial'>Arial</MenuItem>
                <MenuItem value='Times New Roman'>Times new roman</MenuItem>
                <MenuItem value='cursive'>Cursive</MenuItem>
                <MenuItem value='sans-serif'>Sans-Serif</MenuItem>
                <MenuItem value='fantasy'>Fantasy</MenuItem>
                <MenuItem value='monospace'>Monospace</MenuItem>
                <MenuItem value='lato'>Lato</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Text alignment</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.cardAlign2}
                name="cardAlign2"
                onChange={handleInputChange}
                label="Text alignment"
              >
                <MenuItem value='left'>Left</MenuItem>
                <MenuItem value='right'>Right</MenuItem>
                <MenuItem value='center'>Center</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type='number'
              label="Text size"
              name="cardSize2"
              variant="outlined"
              onChange={handleInputChange}
              value={config.cardSize2}
              InputProps= {{inputProps: {min: 1, max: 100}}}
              size="small"
              className={classes.root}
            />
            <TextField
              fullWidth
              label="Text color"
              name="cardColor2"
              variant="outlined"
              onChange={handleInputChange}
              value={config.cardColor2}
              size="small"
              className={classes.root}
            />
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Text font weight</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.cardWeight2}
                name="cardWeight2"
                onChange={handleInputChange}
                label="Text font weight"
              >
                <MenuItem value='normal'>Normal</MenuItem>
                <MenuItem value='bold'>Bold</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
              <InputLabel>Text font family</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={config.cardFamily2}
                name="cardFamily2"
                onChange={handleInputChange}
                label="Text font family"
              >
                <MenuItem value='Arial'>Arial</MenuItem>
                <MenuItem value='Times New Roman'>Times new roman</MenuItem>
                <MenuItem value='cursive'>Cursive</MenuItem>
                <MenuItem value='sans-serif'>Sans-Serif</MenuItem>
                <MenuItem value='fantasy'>Fantasy</MenuItem>
                <MenuItem value='monospace'>Monospace</MenuItem>
                <MenuItem value='lato'>Lato</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-7">
            <div className="Graph" style={{margin: 200  }}>
              <BalanceCard {...config} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

BalanceCardForm.propTypes = {
  config: PropTypes.shape({
  cardWidth: PropTypes.number, 
  cardHeight: PropTypes.number, 
  cardBackground: PropTypes.string, 
  cardFamily1: PropTypes.string,
  cardSize1: PropTypes.number, 
  cardWeight1: PropTypes.string, 
  cardColor1: PropTypes.string, 
  cardAlign1: PropTypes.string, 
  cardFamily2: PropTypes.string, 
  cardSize2: PropTypes.number, 
  cardWeight2: PropTypes.string, 
  cardColor2: PropTypes.string, 
  cardAlign2: PropTypes.string, 
  sizeicon: PropTypes.number, 
  cardHrHeight: PropTypes.number,  
  }),
};

BalanceCardForm.defaultProps = { config: {} };

export default BalanceCardForm ;