import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LastCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      procData: {
        card1 : {},
        h2style : {},    
        vstyle : {},
        titleText : {},
        cardVal : {},
      }
    };
  }

  processData = () => {
    const {
      dataset, cardWidth, cardHeight, cardBackground, cardFamily1, cardSize1, cardWeight1, cardColor1, cardAlign1,
      cardFamily2, cardSize2, cardWeight2, cardColor2, cardAlign2,
    } = this.props;

    try {
      let keys = Object.keys(dataset[0]);
      let procData = {
        card1: {
          width: cardWidth,
          minHeight: cardHeight,                           
          margin: "50px",
          boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.3)",      
          borderRadius: "5px",
          textAlign:"center",
          backgroundColor: cardBackground,
        },
        h2style: {
          color: cardColor1,
          padding:"30px 20px 0px 30px",
          marginBottom:"5px",
          fontFamily: cardFamily1,
          fontSize: cardSize1,
          fontWeight: cardWeight1,
          textAlign: cardAlign1,
          letterSpacing: ".05rem"
        },                
        vstyle: {
          fontFamily: cardFamily2,  
          fontSize: cardSize2,
          fontWeight: cardWeight2,
          color: cardColor2,
          lineHeight: "1rem",                
          wordBreak: "break-all",
          wordWrap: "pre-wrap",
          letterSpacing: ".1rem",                
          textAlign:cardAlign2
        },
        titletext : undefined,
        cardval : undefined,
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
        procData.vstyle.fontFamily = cardFamily2;
        procData.vstyle.fontSize = `${cardSize2}px`;
        procData.vstyle.fontWeight = cardWeight2;
        procData.vstyle.color = cardColor2;
        procData.vstyle.textAlign = cardAlign2;
        
        dataset.forEach((field) => {
          procData.titletext = field[keys[0]];
          procData.cardval = field[keys[1]];
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
    const { vstyle } = this.state.procData;
    const { titletext } = this.state.procData;
    const { cardval } = this.state.procData;

    return ( 
      <div class="card" style={card1}>
        <div>
          <h2  style={h2style}>{titletext}</h2>
        </div>
        <div className="card-value" style={vstyle} >
          {cardval}
        </div>
      </div>
    );
  }
}

LastCard.propTypes = {
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
  cardAlign2: PropTypes.string     
};

LastCard.defaultProps = {
  dataset: [],
  cardWidth: 315, 
  cardHeight: 100, 
  cardBackground: '#202A3B', 
  cardFamily1: 'Arial',
  cardSize1: 18, 
  cardWeight1: 'bold', 
  cardColor1:'white', 
  cardAlign1:'center', 
  cardFamily2: 'Arial', 
  cardSize2: 12, 
  cardWeight2: 'normal', 
  cardColor2: '#bbceec', 
  cardAlign2: 'center' 
};

export default LastCard;























