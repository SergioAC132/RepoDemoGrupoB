import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import cors from "cors";
import Redis from "ioredis";

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// 🔴 Redis (remoto)
const pub = new Redis("redis://TU_URL_REDIS");
const sub = new Redis("redis://TU_URL_REDIS");

const CHANNEL = "chat";

// 🧠 Memoria local
const clients = new Map();
let messages = [];

// 📡 Escuchar Redis
sub.subscribe(CHANNEL);

sub.on("message", (channel, message) => {
  const data = JSON.parse(message);

  // evitar re-procesar mensajes propios (opcional pero recomendable)
  broadcast(data);
});

// 📢 Broadcast local
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on("connection", (ws) => {
  ws.on("message", async (msg) => {
    const parsed = JSON.parse(msg);

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

        const payload = {
          type: "message",
          payload: message,
        };

        // 📡 enviar a Redis
        await pub.publish(CHANNEL, JSON.stringify(payload));

        // 📢 enviar local también (opcional porque Redis lo regresará)
        broadcast(payload);

        break;
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en 3000");
});