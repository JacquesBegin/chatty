import React, {Component} from 'react';


class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-counter">Current Chatters Count: {this.props.counter}</span>
      </nav>
    )
  }
}




export default Nav;