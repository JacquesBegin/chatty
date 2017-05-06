import React, {Component} from 'react';
import Message from "./Message.jsx";
import SystemMessage from "./SystemMessage.jsx";


class MessageList extends Component {

  constructor(props) {
    super(props)

  }


  render() {

    var outputMessages;
    var outputNotifications = [];
    if (this.props.messages.length != 0) {
      outputMessages = this.props.messages.map( message => {
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
          {outputMessages}
        </main>
    );
          // {console.log("Rendering <Message/>")}
  }
}

export default MessageList;