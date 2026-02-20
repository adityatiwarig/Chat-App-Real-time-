import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;
const userSocketMap = {};

const extractTokenFromCookie = (cookieHeader = "") => {
  const cookies = cookieHeader.split(";").map((item) => item.trim());
  const tokenCookie = cookies.find((item) => item.startsWith("token="));

  if (!tokenCookie) return null;

  const [, rawToken] = tokenCookie.split("=");
  return decodeURIComponent(rawToken || "");
};

const getOnlineUserIds = () => Object.keys(userSocketMap);

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const token = extractTokenFromCookie(socket.handshake.headers.cookie);

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.userId = decoded.userId;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId.toString();

    if (!userSocketMap[userId]) {
      userSocketMap[userId] = new Set();
    }

    userSocketMap[userId].add(socket.id);
    io.emit("getOnlineUsers", getOnlineUserIds());

    socket.on("disconnect", () => {
      const sockets = userSocketMap[userId];

      if (!sockets) return;

      sockets.delete(socket.id);

      if (!sockets.size) {
        delete userSocketMap[userId];
      }

      io.emit("getOnlineUsers", getOnlineUserIds());
    });
  });

  return io;
};

export const getReceiverSocketId = (receiverId) => {
  if (!receiverId) return null;

  const sockets = userSocketMap[receiverId.toString()];
  if (!sockets || !sockets.size) return null;

  return [...sockets][0];
};

export const getIO = () => io;
