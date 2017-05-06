import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Nav from "./Nav.jsx";


const appData = {
    currentUser: {name: "Jacques"}, // optional. if currentUser is not defined, it means the user is Anonymous
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
        console.log("newMessage", newMessage);
        console.log("newMessageColor: ", newMessage.color);
        console.log("newMessageType: ", newMessage.type);
        switch(newMessage.type) {
          case "incomingCounter":
            this.setState({connectionsCount: newMessage.count});
            break;
          // case "incomingColor":
          //   console.log("1", this.state.clientColor);
          //   this.setState({clientColor: newMessage.color});
          //   console.log("2", this.state.clientColor);
          //   break;
          default:
            const messages = this.state.messages.concat(newMessage);
            this.setState({messages: messages});
        }

        // if (newMessage.type === "incomingCounter") {
        //   // this.connectionsCount = newMessage.count;
        //   console.log("this connection count: ", this.connectionsCount);
        //   this.setState({connectionsCount: newMessage.count, clientColor: newMessage.color});
        //   console.log("clientColor: ", this.state.clientColor);
        // } else {
        //   const messages = this.state.messages.concat(newMessage);
        //   this.setState({messages: messages});
        // }

      };
    }
  }

  render() {
    // console.log("Rendering <App />");
    return (
      <div>
        <Nav counter={this.state.connectionsCount}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar username={this.state.currentUser.name} changeUsername={this.handleChangeUsername} addNewMessage={this.handleAddNewMessage}/>
      </div>
    );
  }
        // {console.log("Rendering <MessageList/>")}
        // {console.log("Rendering <ChatBar/>")}

}

export default App;
