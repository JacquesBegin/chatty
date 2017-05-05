import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";


const appData = {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  }

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: appData.currentUser,
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001/');
  }

  handleAddNewMessage = (message) => {
    console.log("current user: ", this.state.currentUser);
    message.username = this.state.currentUser.name;
    message.type = "postMessage";
    console.log("messages: ", message);
    const newMessages = this.state.messages.concat(message);
    this.socket.send(JSON.stringify(message));
  }

  handleChangeUsername = (username) => {
    console.log(this.state.currentUser);
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
        console.log("newMessage: ", newMessage);
        const messages = this.state.messages.concat(newMessage)
        console.log("ALLMESSAGES: ", messages);
        this.setState({messages: messages});

      };
    }
  }

  render() {
    console.log("Rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        {console.log("Rendering <MessageList/>")}
        <MessageList messages={this.state.messages}/>
        {console.log("Rendering <ChatBar/>")}
        <ChatBar username={this.state.currentUser.name} changeUsername={this.handleChangeUsername} addNewMessage={this.handleAddNewMessage}/>
      </div>
    );
  }
}

export default App;
