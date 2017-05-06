const SocketServer = require('ws');
const uuidV4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create the WebSockets server
const wss = new SocketServer.Server({ port: PORT });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by


// Hold client startup data
const clientStartupParameters = {};


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


// send message to each user
const broadcastAll = () => {
  wss.clients.forEach((c) => {
    c.send(JSON.stringify(clientStartupParameters));
  })
}


// send messages to each user except the one who initiated the message
const broadcast = (message) => {
  wss.clients.forEach((c) => {
      c.send(JSON.stringify(message));
  });
}


// get count of total chatty users
const clientCounter = () => {
  let myCount = 0;
  wss.clients.forEach((c) => {
    myCount++;
  })
  clientStartupParameters.count = myCount;
  clientStartupParameters.type = "incomingCounter";
  broadcastAll();
}


function handleMessage(message_data) {
  console.log(`Received: ${message_data}`)
  var message = JSON.parse(message_data);
  message.id = uuid.v4();

  if (matches = message.content.match(/^\/giphy (.+)$/)) {
    let qs = querystring.stringify({
      api_key: 'dc6zaTOxFJmzC',
      tag: matches[1]
    });
    fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
      .then( resp => {return resp.json() } )
      .then( json => {
        message.content = `<img src="${json.data.image_url}" alt=""/>`
        return message;
      })
  } else {
    return message;
  }
}



wss.on("connection", function connection(ws) {
  console.log('Client connected');

  // Select a random color from the colors list
  const clientColor = () => {
    let colorNumber = Math.floor((Math.random() * 4) + 1);

    switch(colorNumber) {
      case 1:
        ws.color = "#1a9dbe";
        break;
      case 2:
        ws.color = "#ac8620";
        break;
      case 3:
        ws.color = "#35c030";
        break;
      case 4:
        ws.color = "#6a1cfc";
        break;
      default:
        ws.color = "#000000";
    }
  }

  const clientStartup = () => {
    clientCounter();
    clientColor();
  }

  clientStartup();


  ws.on("message", (rawMessage) => {
    const message = JSON.parse(rawMessage);
    message.id = uuidV4();
    message.color = ws.color;


    let messageToSend = handleMessage(message);

    switch(messageToSend.type) {
      case "postMessage":
        messageToSend.type = "incomingMessage";
        break;
      case "postNotification":
        messageToSend.type = "incomingNotification";
        break;
      default:
        console.log("ERROR: Message type unknown");
    }

    broadcast(messageToSend);
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clientCounter();
    console.log('Client disconnected')
  });

});

