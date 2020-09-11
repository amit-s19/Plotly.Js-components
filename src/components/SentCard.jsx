import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";

class SentCard extends Component {
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
        details: ''
      }
    };
  }

  processData = () => {
    const {
      dataset, cardWidth, cardHeight, cardBackground, cardFamily1, cardSize1, cardWeight1, cardColor1, cardAlign1,
      cardFamily2, cardSize2, cardWeight2, cardColor2, cardColor3, cardWeight3, cardSize3,  
    } = this.props;

    try {
      let keys = Object.keys(dataset[0]);
      let procData = {
        card1: {
          width: undefined,
          minHeight: undefined,           
          marginTop:"40px",        
          padding:"30px",
          boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.3)",      
          borderRadius: "10px",
          backgroundColor: undefined,
        },    
        h2style:  {
          color: undefined,
          overflow: "hidden" ,
          margin:"15px auto 30px auto",
          fontFamily: undefined,
          fontSize: undefined,
          fontWeight: undefined,
          textAlign: undefined,
          letterSpacing: "0.20px",
        }, 
        flex1: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        },    
        meta1: {  
          fontWeight: undefined,
          fontSize: undefined,
          overflow: "hidden" ,
          color: undefined,
          fontFamily: undefined,
          letterSpacing: "0.3px",
          marginBottom:"0"
        },
        meta2: {
          fontSize: undefined,
          fontWeight: undefined,
          overflow: "hidden" ,
          color: undefined,
          fontFamily: undefined,
          letterSpacing: "0.20px",
          marginTop:"8px"
        },
        titletext : '',
        cardval : '' ,
        details: '' ,
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
        procData.meta2.fontFamily = cardFamily2;
        procData.meta2.color = cardColor3;
        procData.meta2.fontWeight = cardWeight3;
        procData.meta2.fontSize = cardSize3;
        
        dataset.forEach((field) => {
          procData.titletext = field[keys[0]]
          procData.cardval = field[keys[1]]
          procData.details = field[keys[2]]
        });
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
    const { details } = this.state.procData;
    const { sizeicon } = this.props;

    return (        
      <div style={flex1}>
        <div class="card" style={card1}>
          <IconContext.Provider value={{ color: "#f4f6ff",textAlign:"left", size:`${sizeicon}rem` }}>
            <div>
              <FaUserCircle />
            </div>
          </IconContext.Provider>
          <h2 style={h2style}> {titletext} </h2> 
          <p style={meta1}> {cardval} </p>
          <p style={meta2}> {details} </p>
        </div>
      </div>
    );
  }
}

SentCard.propTypes = {
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
  cardColor3: PropTypes.string, 
  cardSize3: PropTypes.number, 
  cardWeight3: PropTypes.string, 
  sizeicon: PropTypes.number,
};

SentCard.defaultProps = {
  dataset: [],
  cardWidth: 200, 
  cardHeight: 180, 
  cardBackground: '#222831', 
  cardFamily1: 'Arial',
  cardSize1: 20, 
  cardWeight1: 'bold', 
  cardColor1:'#fff', 
  cardAlign1:'left', 
  cardFamily2: 'Arial', 
  cardSize2: 30, 
  cardWeight2: 'bold', 
  cardColor2: '#fff',
  cardColor3: '#a6a6a6', 
  cardSize3: 14, 
  cardWeight3: 'normal', 
  sizeicon: 3.5, 
};

export default SentCard;

