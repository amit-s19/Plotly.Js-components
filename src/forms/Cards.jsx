import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import SingleValueCardForm from '../forms/SingleValueCardForm';
import LastCardForm from '../forms/LastCardForm';
import BankAccountCardForm from '../forms/BankAccountCardForm';
import BalanceCardForm from '../forms/BalanceCardForm';
import VisitorCardForm from '../forms/VisitorCardForm';
import IncomeCardForm from '../forms/IncomeCardForm';
import OutcomeCardForm from '../forms/OutcomeCardForm';
import SentCardForm from '../forms/SentCardForm';
import ReceivedCardForm from '../forms/ReceivedCardForm';
import DashCardForm from '../forms/DashCardForm';
import './Styles.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));


const Cards = () => {

    const handleInputChange = e => {  
        const {name, value} = e.target ;
        setConfig({...config, [name]: value})
    };

    const [config, setConfig] = useState({
        cardType: '',
    });

    const renderCard = () => {
      switch(config.cardType) {
        case 'singleValue' : 
          return <SingleValueCardForm />
        case 'last' : 
          return <LastCardForm />
        case 'bankAccount' : 
          return <BankAccountCardForm />
        case 'balance' : 
          return <BalanceCardForm />
        case 'visitor' : 
          return <VisitorCardForm />
        case 'income' : 
          return <IncomeCardForm />
        case 'outcome' : 
          return <OutcomeCardForm />
        case 'sent' : 
          return <SentCardForm />
        case 'received' : 
          return <ReceivedCardForm />
        case 'dashboard' : 
          return <DashCardForm />
        default:
          break;
      }
    }

    const classes = useStyles();

    return (
        <>
        <div className="container-fluid">
        <div className="row">
        <div className='col-md-1'></div>
            <div className="col-md-4">
            <h2 className="display-4">Cards</h2>
           
            <FormControl className={classes.root} fullWidth variant="outlined" size="small">
                    <InputLabel>Select Card</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={config.cardType}
                      name="cardType"
                      onChange={handleInputChange}
                      label="Select Card"
                    >
                      <MenuItem value='singleValue'>Single Value Card</MenuItem>
                      <MenuItem value='last'>Last Card</MenuItem>
                      <MenuItem value='bankAccount'>Bank Account Card</MenuItem>
                      <MenuItem value='balance'>Balance Card</MenuItem>
                      <MenuItem value='visitor'>Visitor Card</MenuItem>
                      <MenuItem value='income'>Income Card</MenuItem>
                      <MenuItem value='outcome'>Outcome Card</MenuItem>
                      <MenuItem value='sent'>Sent Card</MenuItem>
                      <MenuItem value='received'>Received Card</MenuItem>
                      <MenuItem value='dashboard'>Dashboard Card</MenuItem>
                    </Select>
            </FormControl>
            </div>            
            
        </div>
        {renderCard()}
        </div>
        </>
    );

}


export default Cards;