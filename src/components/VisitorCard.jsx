import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import { IconContext } from "react-icons";

class VisitorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      procData: {
        card1 : {},
        h2style : {},
        hrstyle: {},
        flex1: {},
        meta1: {},
        icons: {},
        social: {},
        titletext : [],
        cardval: [],
      }
    };
  }

  processData = () => {
    const {
      dataset, cardWidth, cardHeight, cardBackground, cardFamily1, cardSize1, cardWeight1, cardColor1, cardAlign1,
      cardFamily2, cardSize2, cardWeight2, cardColor2, cardHrHeight,
    } = this.props;

    try {
      let keys = Object.keys(dataset[0]);
      let procData = {
          card1: {
            width: undefined,
            minHeight: undefined,                
            margin: "50px",
            boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.3)",      
            borderRadius: "10px",
            backgroundColor: undefined,
          },               
          h2style: {
            marginTop: "0",
            marginRight:" 15px",
            color: undefined,
            fontWeight: undefined,
            overflow: "hidden" ,
            fontFamily: undefined,
            fontSize: undefined,
            textAlign: undefined,
            letterSpacing: ".05rem"
          },
          hrstyle: {
            display:"block",
            border: "none",
            padding:"auto 10px auto 10px",
            height: undefined,
            backgroundColor: "#8091ab",
            margin: "0px",
            textAlign:"center"
          },               
          flex1: {
            padding: "20px 60px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          },    
          meta1: {
            marginTop: "0",
            marginRight:" 14px",
            fontWeight: undefined,
            overflow: "hidden" ,
            color: undefined,
            fontFamily: undefined,
            fontSize: undefined
          },  
          icons: {
            float: "right"
          },  
          social: {
            display:"inline-block",
            padding: "5px 0"
          },     
          titletext : [],
          cardval : []
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
        procData.hrstyle.height = `${cardHrHeight}px`;
        procData.meta1.fontWeight = cardWeight2;
        procData.meta1.fontFamily = cardFamily2;
        procData.meta1.fontSize = `${cardSize2}px`;
        procData.meta1.color = cardColor2;
        
        dataset.forEach((field) => {
          procData.titletext.push(field[keys[0]])
          procData.cardval.push(field[keys[1]])
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
    const { hrstyle } = this.state.procData;
    const { flex1 } = this.state.procData;
    const { meta1 } = this.state.procData;
    const { icons } = this.state.procData;
    const { social } = this.state.procData;
    const { titletext } = this.state.procData;
    const { cardval } = this.state.procData;
    const { sizeicon } = this.props;

    return ( 
      <div class="card" style={card1}>
        <div style={flex1}>
          <ul  style={icons}>
            <li style={social}>
              <IconContext.Provider value={{ color: "#d32626",textAlign:"left", size:`${sizeicon}rem`,margin:"40px 10px 40px auto " }}>
              <div>
                <FaArrowUp />
              </div>
              </IconContext.Provider>
            </li>
          </ul>
          <div> 
            <ul style={{listStyleType: "none"}}>
              <li> <h2 style={h2style}>{cardval[0]}</h2></li>
              <li> <p style={meta1}>{titletext[0]}</p></li>
            </ul>
          </div>
        </div>
        <hr  style={hrstyle}></hr>
        <div style={flex1}>
          <ul  style={icons}>
            <li style={social}>
              <IconContext.Provider value={{ color: "#f5a31a",textAlign:"left", size:`${sizeicon}rem`,margin:"40px 10px 40px auto " }}>
              <div>
                <FaArrowDown />
              </div>
              </IconContext.Provider>
            </li>
          </ul>
          <div> 
            <ul style={{listStyleType: "none"}}>
              <li> <h2 style={h2style}>{cardval[1]}</h2></li>
              <li> <p style={meta1}>{titletext[1]}</p></li>
            </ul>
          </div> 
        </div>
      </div>
    );
  }
}

VisitorCard.propTypes = {
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
  sizeicon: PropTypes.number, 
  cardHrHeight: PropTypes.number,
};

VisitorCard.defaultProps = {
  dataset: [],
  cardWidth: 314, 
  cardHeight: 130, 
  cardBackground: '#202A3B', 
  cardFamily1: 'Arial',
  cardSize1: 22, 
  cardWeight1: 'bold', 
  cardColor1:'#eeeeee', 
  cardAlign1:'left', 
  cardFamily2: 'Arial', 
  cardSize2: 16, 
  cardWeight2: 'bold', 
  cardColor2: '#8091ab', 
  cardAlign2: 'left', 
  sizeicon: 3, 
  cardHrHeight: 1,
};

export default VisitorCard;























