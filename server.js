require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
    const noteSchema = new mongoose.Schema({
      todo: String,
      complited: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    });

    const Note = new mongoose.model("Note", noteSchema);

    app.get("/todos", async (req, res) => {
      try {
        const notes = await Note.find();
        res.send(notes);
      } catch (err) {
        console.error(err.message);
      }
    });

    app.post("/todos", async (req, res) => {
      try {
        await Note.create(req.body);
        res.redirect("/todos");
      } catch (err) {
        console.error(err.message);
      }
    });

    app.put("/todos/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const update = await Note.findById(id);
        update.complited = !update.complited;
        await update.save();
        res.send(update);
      } catch (err) {
        console.error(err.message);
      }
    });

    app.delete("/todos/:id", async (req, res) => {
      try {
        const id = req.params.id;
        await Note.findByIdAndDelete(id);
        const todos = await Note.find();
        res.send(todos);
      } catch (err) {
        console.error(err.message);
      }
    });
  } catch (err) {
    console.error(err.message);
  }
}
main();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("server run on " + port);
});
