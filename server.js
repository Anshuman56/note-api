const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let todos = [{ id: 1, complited: true, todo: "dosomething" }];
let nextId = 2;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.post("/todos", (req, res) => {
  req.body.id = nextId;
  req.body.complited = false;
  todos.push(req.body);
  nextId++;
  res.redirect("/todos");
});

app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  for (let i = 0; i < todos.length; i++) {
    if (id === todos[i].id) todos[i].complited = !todos[i].complited;
  }
  res.send(todos);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter((item) => item.id !== id);
  res.send(todos);
});

app.listen(port, () => {
  console.log("server run on " + port);
});
