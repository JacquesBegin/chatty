import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Nav from "./Nav.jsx";


const appData = {
    currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
  }

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentUser: appData.currentUser,
      messages: [],
      connectionsCount: 0
    }
    this.socket = new WebSocket('ws://localhost:3001/');
  }


  handleAddNewMessage = (message) => {
    message.username = this.state.currentUser.name;
    message.type = "postMessage";
    const newMessages = this.state.messages.concat(message);
    this.socket.send(JSON.stringify(message));
  }


  handleChangeUsername = (username) => {
    let message = {};
    message.content = `${this.state.currentUser.name} changed their name to ${username}`;
    this.state.currentUser.name = username;
    message.username = this.state.currentUser.name;
    message.type = "postNotification";
    this.socket.send(JSON.stringify(message));
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = () => {

      this.socket.onmessage = (rawMessage) => {
        let newMessage = JSON.parse(rawMessage.data);
        switch(newMessage.type) {
          case "incomingCounter":
            this.setState({connectionsCount: newMessage.count});
            break;
          default:
            const messages = this.state.messages.concat(newMessage);
            this.setState({messages: messages});
        }
      };
    }
  }

  render() {
    console.log("Rendering <App />");
    return (
      <div>
        <Nav counter={this.state.connectionsCount}/>
        {console.log("Rendering <MessageList/>")}
        <MessageList messages={this.state.messages}/>
        {console.log("Rendering <ChatBar/>")}
        <ChatBar username={this.state.currentUser.name} changeUsername={this.handleChangeUsername} addNewMessage={this.handleAddNewMessage}/>
      </div>
    );
  }
}

export default App;
