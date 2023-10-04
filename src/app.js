import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
app.use("/", viewsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});

const socketServer = new Server(httpServer);
const products = [];

socketServer.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
  
    socket.on("message", (newProduct) => {
      products.push(newProduct);
      socketServer.emit("updateProducts", products);
    });
  
    socket.on("deleteProduct", (productId) => {
      const index = products.findIndex((product) => product.id === productId);
      if (index !== -1) {
        products.splice(index, 1);
        socketServer.emit("updateProducts", products);
      }
    });
  });