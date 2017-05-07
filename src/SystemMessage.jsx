import React, {Component} from 'react';


class SystemMessage extends Component {
  render() {
    return (
      <div className="message system">
        <span className="message notification">{this.props.content}</span>
      </div>
    );
  }
}

export default SystemMessage;