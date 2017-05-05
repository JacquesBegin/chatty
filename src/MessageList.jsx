import React, {Component} from 'react';
import Message from "./Message.jsx";
import SystemMessage from "./SystemMessage.jsx";


class MessageList extends Component {


  render() {

    var outputMessages;
    var outputNotifications = [];
    console.log("in message list");
    console.log(this.props.messages);
    if (this.props.messages.length != 0) {
      outputMessages = this.props.messages.map( message => {
        console.log("in switch: ", message.type);
        switch(message.type) {
          case "incomingMessage":
            return <Message key={message.id} {...message}/>
            break;
          case "incomingNotification":
            return <SystemMessage key={message.id} {...message}/>
            break;
          default:
            console.log("ERROR message type unknown");
        }
      })
    } else {
      outputMessages = <div className="messsage"><span>No messages</span></div>
    }
    return (
        <main className="messages">
          {console.log("Rendering <Message/>")}
          {console.log("output messages: ", outputMessages)}
          {outputMessages}
        </main>
    );
  }
}

export default MessageList;