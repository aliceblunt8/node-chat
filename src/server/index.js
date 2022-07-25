import express from 'express';
import cors from 'cors';
import { WebSocket, WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8080;

const messages = [];

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/messages', (_, res) => {
  res.send(messages);
});

app.post('/api/messages', (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.sendStatus(422);
    return;
  }

  const newMessage = {
    text,
    id: Date.now()
  };

  messages.push(newMessage);

  res.statusCode = 201;
  res.send(newMessage);
});

const server = app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server is running on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const parsedMessage = JSON.parse(data);

    const newMessage = {
      text: parsedMessage.text,
      id: Date.now()
    };

    messages.push(newMessage);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newMessage));
      }
    });
  });

  ws.on('close', () => {
    ws.close();
  });
});
