require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");
const app = express();

const cors = require("cors");
const session = require("express-session");
const methodOverride = require("method-override");
const { default: mongoose } = require("mongoose");
const userProductsService = require("./services/userProducts");
const productService = require("./services/products");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const server = app.listen(process.env.PORT);
const wss = new WebSocket.Server({ server });

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "mysecrctekey",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
mongoose
  .connect(process.env.CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log("no connection start");
  });

app.use("/", require("./routes/homePage"));
app.use("/shoppingBag", require("./routes/shoppingBag"));
app.use("/wishList", require("./routes/wishList"));
app.use("/productsPage", require("./routes/productsPage"));
app.use("/usersPage", require("./routes/usersPage"));
app.use("/storesPage", require("./routes/storesPage"));
app.use("/ordersPage", require("./routes/ordersPage"));
var usersAmount = 0;
const clients = new Set();
wss.on("connection", (socket) => {
  usersAmount += 1;
  clients.add(socket);
  for (const client of clients) {
    client.send(usersAmount);
  }

  socket.on("close", () => {
    usersAmount -= 1;
    clients.delete(wss);
    for (const client of clients) {
      client.send(usersAmount);
    }
  });
});
// app.listen(process.env.PORT);
