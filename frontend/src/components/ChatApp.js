require('../styles/ChatApp.css');

import React from 'react';
import io from 'socket.io-client';
import config from '../config';

import Messages from './Messages';
import ChatInput from './ChatInput';
import Curve from './Curve';

class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [], verdict: '', depressionScore: '', submitted: false, plotData: {} };
    this.sendHandler = this.sendHandler.bind(this);
    
    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });


    setInterval(() => {

      fetch('http://localhost:3001/chat/nlp/submit', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: this.props.username
      }).then(resp => {
        resp.json().then(data => {
          console.log(data);

          var verdict = data.verdict;
          var depressionScore = data.depScore;

          if(verdict!=this.state.verdict && verdict!=''){
            this.setState({verdict});
          }

          if(depressionScore != this.state.depressionScore && depressionScore!=''){
            this.setState({depressionScore});
          }

          console.log(this.state.verdict + " " + this.state.depressionScore);
          
          }
        )
      })
    }, 2000);

  }

  buttonClickHandler = ()=>{
    var submitted = true;
    this.setState({submitted});
    console.log("click the close session");


  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }


  render() {

    if(this.state.submitted){
      return (<Curve plotdata={this.state.plotData}  />);
    }


    return (
      <div className="container">
      <div>
      <h3>React Chat App</h3>
      <h4>Instant emotional state: {this.state.verdict}</h4>
      <h4>Instant depression score : {this.state.depressionScore}</h4>
      <button
        className="btn btn-default"
        onClick={this.buttonClickHandler}>Close this session</button>
      </div>
       

        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
