import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Map(); 
let messages = [];

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (data) => {
    const parsed = JSON.parse(data);

    switch (parsed.type) {
      case "join":
        clients.set(ws, parsed.username);

        ws.send(JSON.stringify({
            type: "history",
            payload: messages,
        }));    

        break;

      case "message":
        const message = {
          user: clients.get(ws),
          text: parsed.text,
          time: new Date().toISOString(),
        };

        messages.push(message);

        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify({
              type: "message",
              payload: message,
            }));
          }
        });
        break;
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Cliente desconectado");
  });
});

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});