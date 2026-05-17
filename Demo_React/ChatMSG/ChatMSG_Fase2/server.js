import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import Redis from 'ioredis';
import { createAdapter } from '@socket.io/redis-adapter';
import session from 'express-session';
import ChatManager from './ChatManager.js';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-change-in-prod';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.server = http.createServer(this.app);
    this.io = new SocketServer(this.server, {
      cors: {
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
        credentials: true
      }
    });

    this.chatManager = new ChatManager();

    const pub = new Redis(REDIS_URL);
    const sub = pub.duplicate();

    // El adaptador sincroniza io.emit() entre todos los servidores con el mismo Redis
    this.io.adapter(createAdapter(pub, sub));

    this.middlewares();
    this.routes();
    this.sockets();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      }
    }));
  }

  routes() {
    this.app.get('/api/me', (req, res) => {
      const { username } = req.session;
      if (username) {
        res.json({ username });
      } else {
        res.status(401).json({ username: null });
      }
    });

    this.app.post('/api/session', (req, res) => {
      const { username } = req.body;
      if (!username?.trim()) {
        return res.status(400).json({ error: 'El nombre de usuario es requerido' });
      }
      req.session.username = username.trim();
      res.json({ username: req.session.username });
    });

    this.app.delete('/api/session', (req, res) => {
      req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Error al cerrar sesión' });
        res.json({ ok: true });
      });
    });
  }

  sockets() {
    this.io.on('connection', (socket) => {
      console.log('Cliente conectado:', socket.id);

      socket.emit('history', this.chatManager.getHistory());

      socket.on('send_message', (data) => {
        const msg = this.chatManager.addMessage(data.user, data.text);
        this.io.emit('receive_message', msg);
      });

      socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
      console.log(`Redis URL: ${REDIS_URL}`);
    });
  }
}

export default Server;
