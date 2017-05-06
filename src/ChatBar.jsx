import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props)

    // this.handleSubmit = this.props.handleSubmit.bind(this);
  }

  handleMessageKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let newMessageObj = {};
      newMessageObj.content = e.target.value;
      e.target.value = "";
      this.props.addNewMessage(newMessageObj);
    }
  }

  handleUsernameKeyPress = (e) => {
    if (e.target.value !== this.props.username) {
      if (e.key === "Enter") {
      e.preventDefault();
      this.props.changeUsername(e.target.value);
      }
    }
  }

  handleUsernameOnblur = (e) => {
    if (e.target.value !== this.props.username) {
      this.props.changeUsername(e.target.value);
    }
  }

  render() {
    return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder={this.props.username} onKeyPress={this.handleUsernameKeyPress} onBlur={this.handleUsernameOnblur}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleMessageKeyPress}/>
        </footer>
    );
  }
}

export default ChatBar;