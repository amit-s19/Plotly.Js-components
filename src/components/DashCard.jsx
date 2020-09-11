import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaUsers } from "react-icons/fa";
import { IconContext } from "react-icons";

class DashCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        procData: {
            card1 : {},
            h2style : {},
            head1: {},
            hrstyle: {},
            pstyle: {},
            button1: {},
            titletext : '',
            cardval: [],
        }
    };
  }

  processData = () => {
    const {
      dataset, cardWidth, cardHeight, cardBackground, cardFamily1, cardSize1, cardWeight1, cardColor1, cardAlign1,
      cardFamily2, cardSize2, cardWeight2, cardColor2, titleText, 
    } = this.props;

    try {
        let keys = Object.keys(dataset[0]);
        let procData = {
            card1: {
                width: undefined,
                minHeight: undefined,           
                margin: "5px",
                boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.3)",      
                borderRadius: "10px",
                textAlign:"center"
            },    
            h2style: {
                margin: "0px",
                padding:"10px",
                fontFamily: undefined,
                fontSize: undefined,
                fontWeight: undefined,
                color: undefined,
                textAlign: undefined
            },
            head1: {
                backgroundColor: undefined,
                width:"100%",
                height:"150px"
            },
            hrstyle: {
                display:"block",
                border: "none",
                height: "3px",
                backgroundColor: "black",
                margin: "0px"
            },    
            pstyle: {
                margin:"15px 0px 0px 0px",
                fontFamily: undefined,
                color: undefined,
                paddingLeft:"10px",
                fontWeight: undefined,
                letterSpacing: "0.10px",
                lineHeight: "1rem",
                fontSize: undefined,
                wordBreak: "break-all",
                wordWrap: "pre-wrap",
                textAlign: undefined
            },    
            titletext : '',
            cardval : []
        }
        
      if (dataset && dataset.length > 0) {
        procData.card1.width = `${cardWidth}px`;
        procData.card1.minHeight = `${cardHeight}px`;
        procData.h2style.fontFamily = cardFamily1;
        procData.h2style.fontSize = `${cardSize1}px`;
        procData.h2style.fontWeight = cardWeight1;
        procData.h2style.color = cardColor1;
        procData.h2style.textAlign = cardAlign1;
        procData.head1.backgroundColor = cardBackground;
        procData.pstyle.fontFamily = cardFamily2;
        procData.pstyle.fontSize = cardSize2;
        procData.pstyle.fontWeight = cardWeight2;
        procData.pstyle.textAlign = cardAlign1;
        procData.pstyle.color = cardColor2;
        procData.titletext = titleText;
        
        dataset.forEach((field) => {
            procData.cardval.push(field[keys[0]])
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
    const { head1 } = this.state.procData;
    const { hrstyle } = this.state.procData;
    const { pstyle } = this.state.procData;
    const { titletext } = this.state.procData;
    const { cardval } = this.state.procData;

    return ( 
        <div class="card" style={card1}>
            <div style={head1}>
            <IconContext.Provider value={{ color: "black", size:"8rem",margin:"40px auto 40px auto " }}>
                <div>
                    <FaUsers />
                </div>
            </IconContext.Provider>
            </div>
            <hr  style={hrstyle}></hr>
            <h2  style={h2style}>{titletext}</h2>
            { cardval.map(val => (<p style={pstyle}>{val}</p>))}
            <div style={{marginTop: 40}}></div>
        </div>
        );
    }
}

DashCard.propTypes = {
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
  titleText: PropTypes.string,
  cardVal: PropTypes.string,    
};

DashCard.defaultProps = {
  dataset: [],
  cardWidth: 300, 
  cardHeight: 150, 
  cardBackground: '#202A3B', 
  cardFamily1: 'Arial',
  cardSize1: 14, 
  cardWeight1: 'normal', 
  cardColor1:' orange', 
  cardAlign1:'center', 
  cardFamily2: 'Arial', 
  cardSize2: 26, 
  cardWeight2: 'normal', 
  cardColor2: 'white',
};

export default DashCard;























