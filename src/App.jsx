import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx"
import Message from "./Message.jsx"
import MessageList from "./MessageList.jsx"

class App extends Component {
  render() {
    console.log("Rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main className="messages">
          {console.log("Rendering <MessageList/>")}
          <MessageList/>
          {console.log("Rendering <Message/>")}
          <Message/>
        </main>
        {console.log("Rendering <ChatBar/>")}
        <ChatBar/>
      </div>
    );
  }
}
export default App;
