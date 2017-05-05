const SocketServer = require('ws');
const uuidV4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create the WebSockets server
const wss = new SocketServer.Server({ port: PORT });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on("connection", function connection(ws) {
  console.log('Client connected');
  console.log("client count: ", wss.clients.length);

  const broadcast = (message) => {
    console.log("1");
    wss.clients.forEach((c) => {
      console.log("2");
      if (c !== ws) {
        console.log("3");
        c.send(JSON.stringify(message));
      }
    });
  }

  ws.on("message", (rawMessage) => {
    const message = JSON.parse(rawMessage);
    message.id = uuidV4();

    console.log("messageType: ", message.type);

    switch(message.type) {
      case "postMessage":
        message.type = "incomingMessage";
        break;
      case "postNotification":
        message.type = "incomingNotification";
        break;
      default:
        console.log("ERROR: Message type unknown");
    }

    console.log("received message: ", message);
    broadcast(message);
    });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

