import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props)

    // this.handleSubmit = this.props.handleSubmit.bind(this);
  }

  // handles key press events on the chat bar's message input field
  handleMessageKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let newMessageObj = {};
      newMessageObj.content = e.target.value;
      e.target.value = "";
      this.props.addNewMessage(newMessageObj);
    }
  }

  // handles key press events on the chat bar's username input field
  handleUsernameKeyPress = (e) => {
    if (e.target.value !== this.props.username && e.target.value !== "") {
      if (e.key === "Enter") {
      e.preventDefault();
      this.props.changeUsername(e.target.value);
      }
    }
  }

  // updates username after user clicks away from the username input field
  handleUsernameOnblur = (e) => {
    if (e.target.value !== this.props.username && e.target.value !== "") {
      this.props.changeUsername(e.target.value);
    }
  }

  render() {
    let chatbarUsername = "";

    this.props.username === "" ? chatbarUsername = "Anonymous" : chatbarUsername = this.props.username;

    return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder={chatbarUsername} onKeyPress={this.handleUsernameKeyPress} onBlur={this.handleUsernameOnblur}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleMessageKeyPress}/>
        </footer>
    );
  }
}

export default ChatBar;