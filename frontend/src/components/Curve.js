import React from 'react';

class Curve extends React.Component {

    constructor(props) {
        super(props); 

        this.state = { plotData: {} };

        fetch('http://localhost:3001/chat/nlp/getAllVerdicts', {
            method: 'GET',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }
          }).then(resp => {
            resp.json().then(data => {
              var plotData = data;
              this.setState({plotData});
              console.log("state of plotdata: " + this.state.plotData);
              }
            )
          })
    
    }

  

render() {

    console.log(this.props.plotdata);
    var data = [this.state.plotData];
    var Plotly = window.Plotly;
    Plotly.newPlot('image', data);


    return (
        <h1>Weighted Depression Trend</h1>
    
       );

}


    


}


Curve.defaultProps = {
};

export default Curve;
