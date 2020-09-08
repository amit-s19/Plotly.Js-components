import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FaArrowAltCircleDown } from "react-icons/fa";
import { IconContext } from "react-icons";

class OutcomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        procData: {
            card1: {},
            h2style: {},
            flex1: {},
            meta1: {},
            meta2: {},
            titletext: '',
            cardval: '',
            date: ''
        }
    };
  }

  processData = () => {
    const {
      dataset, cardWidth, cardHeight, cardBackground, cardFamily1, cardSize1, cardWeight1, cardColor1, cardAlign1,
      cardFamily2, cardSize2, cardWeight2, cardColor2, cardColor3, 
    } = this.props;

    try {
        let keys = Object.keys(dataset[0]);

        let procData = {
            card1: {
                width: undefined,
                minHeight: undefined,           
                marginTop:"40px",        
                padding:"20px",
                boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.3)",      
                borderRadius: "10px",
                backgroundColor: undefined,
              },
            h2style: {
                color: undefined,
                overflow: "hidden" ,
                margin:"20px auto 10px 0",
                padding:"40px auto 30px auto",
                fontFamily: undefined,
                fontSize: undefined,
                fontWeight: undefined,
                textAlign: undefined,
                letterSpacing: "0.20px",
              },
            flex1: {
                padding: "20px 60px 0 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            },
            meta1: {
                paddingBottom:"15px",
                fontWeight: undefined,
                overflow: "hidden" ,
                color: undefined,
                fontFamily: undefined,
                letterSpacing: "0.20px",
                fontSize: undefined
            },
            meta2: {  
                fontWeight: undefined,
                overflow: "hidden" ,
                color: undefined,
                fontFamily: undefined,
                letterSpacing: "0.20px",
                fontSize: undefined
            },
            titletext : '',
            cardval : '' ,
            date: '' ,
        }
        
      if (dataset && dataset.length > 0) {
        procData.card1.width = `${cardWidth}px`;
        procData.card1.minHeight = `${cardHeight}px`;
        procData.card1.backgroundColor = cardBackground;
        procData.h2style.fontFamily = cardFamily1;
        procData.h2style.fontSize = `${cardSize1}px`;
        procData.h2style.fontWeight = cardWeight1;
        procData.h2style.color = cardColor1;
        procData.h2style.textAlign = cardAlign1;
        procData.meta1.color = cardColor2;
        procData.meta1.fontFamily = cardFamily2;
        procData.meta1.fontWeight = cardWeight2;
        procData.meta1.fontSize = cardSize2;
        procData.meta2.color = cardColor3;
        procData.meta2.fontFamily = cardFamily2;
        procData.meta2.fontWeight = cardWeight2;
        procData.meta2.fontSize = cardSize2;
        
        dataset.forEach((field) => {
            procData.titletext = field[keys[0]]
            procData.cardval = field[keys[1]]
            procData.date = field[keys[2]]
        });

        console.log(procData);
      }

      this.setState({ procData });
    } catch (error) {
      console.log(error);
      this.setState({ procData: undefined });
    }
  }

  componentDidMount = () => {
    const { dataset } = this.props;

    if (dataset && dataset.length) this.processData();
  }

  componentDidUpdate = (prevProps) => {
    const { dataset } = this.props;
    const { procData } = this.state;
    
    
    if ((Object.is(this.props, prevProps))) {
      return;
    }

    if (dataset && dataset.length) this.processData();
    else if (!dataset && prevProps.dataset && procData) this.processData();
  }

  render() {
    const { card1 } = this.state.procData;
    const { h2style } = this.state.procData;
    const { flex1 } = this.state.procData;
    const { meta1 } = this.state.procData;
    const { meta2 } = this.state.procData;
    const { titletext } = this.state.procData;
    const { cardval } = this.state.procData;
    const { date } = this.state.procData;
    const { sizeicon } = this.props;
    return (        
            <div style={flex1}>
            <div class="card" style={card1}>
               <IconContext.Provider value={{ color: "#F37121",textAlign:"left", size:`${sizeicon}rem`,marginBottom:"20px", }}>
                 <div>
                   <FaArrowAltCircleDown />
                 </div>
               </IconContext.Provider>
               <h2 style={h2style}>{cardval}</h2> 
               <p style={meta1}>{titletext}</p>
               <p style={meta2}>{date}</p>
               </div>
            </div> 
        );
    }
}

OutcomeCard.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({})),
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
  cardColor3: PropTypes.string,
  sizeicon: PropTypes.number,
};

OutcomeCard.defaultProps = {
    dataset: [],
    cardWidth: 160, 
    cardHeight: 100, 
    cardBackground: '#fff', 
    cardFamily1: 'Arial',
    cardSize1: 30, 
    cardWeight1: 'bold', 
    cardColor1:'#000000', 
    cardAlign1:'left', 
    cardFamily2: 'Arial', 
    cardSize2: 16, 
    cardWeight2: 'bold', 
    cardColor2: '#7E0CF5', 
    cardAlign2: 'left', 
    cardColor3: '#5f6769',
    sizeicon: 2.5, 
 
};

export default OutcomeCard;























