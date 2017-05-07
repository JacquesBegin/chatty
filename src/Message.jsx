import React, {Component} from 'react';


class Message extends Component {

  constructor(props) {
    super(props)

  }

  render() {

    let messageUsername = "";

    this.props.username === "" ? messageUsername = "Anonymous" : messageUsername = this.props.username;

    return (
      <div className="message">
        <span style={{color: this.props.color}} className="message-username">{messageUsername}</span>
        <span className="message-content" dangerouslySetInnerHTML={{__html: this.props.content}}></span>
      </div>
    );
  }
}

export default Message;